import { BasePlatformAdapter, PlatformConfig, PlatformPost, PlatformResult, AuthResult } from './base';

export class InstagramAdapter extends BasePlatformAdapter {
  constructor(config: PlatformConfig) {
    super({
      baseUrl: 'https://www.instagram.com',
      apiUrl: 'https://graph.instagram.com',
      scopes: ['instagram_content', 'instagram_basic'],
      ...config
    });
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId || '',
      redirect_uri: this.config.redirectUri || '',
      scope: this.config.scopes?.join(',') || '',
      response_type: 'code',
      state: Math.random().toString(36).substring(7)
    });

    return `${this.config.baseUrl}/oauth/authorize?${params.toString()}`;
  }

  async authenticate(authCode: string): Promise<AuthResult> {
    try {
      const tokenUrl = `${this.config.apiUrl}/oauth/access_token`;
      const params = new URLSearchParams({
        client_id: this.config.clientId || '',
        client_secret: this.config.clientSecret || '',
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri || '',
        code: authCode
      });

      const response = await fetch(`${tokenUrl}?${params.toString()}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error.message
        };
      }

      this.setTokens(data.access_token);

      // Get user info
      const userResponse = await fetch(`${this.config.apiUrl}/me?access_token=${data.access_token}&fields=id,username,account_type,media_count`);
      const userData = await userResponse.json();

      return {
        success: true,
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        userData
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }

  async refreshAccessToken(): Promise<AuthResult> {
    if (!this.accessToken) {
      return {
        success: false,
        error: 'No access token available'
      };
    }

    try {
      const tokenUrl = `${this.config.apiUrl}/refresh_access_token`;
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        access_token: this.accessToken
      });

      const response = await fetch(`${tokenUrl}?${params.toString()}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error.message
        };
      }

      this.setTokens(data.access_token);

      return {
        success: true,
        accessToken: data.access_token,
        expiresIn: data.expires_in
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Token refresh failed'
      };
    }
  }

  async postListing(post: PlatformPost): Promise<PlatformResult> {
    try {
      if (!this.accessToken) {
        return {
          success: false,
          error: 'Not authenticated'
        };
      }

      // Get user's Instagram business account
      const userResponse = await fetch(`${this.config.apiUrl}/me?access_token=${this.accessToken}&fields=business_discovery.username(${this.config.username}){id,username,media_count,followers_count}`);
      const userData = await userResponse.json();

      if (userData.error || !userData.business_discovery) {
        return {
          success: false,
          error: 'Instagram business account not found'
        };
      }

      const businessAccount = userData.business_discovery;

      // Instagram requires media to be uploaded first, then used in a post
      let mediaId: string | null = null;

      if (post.images && post.images.length > 0) {
        // Upload the first image as media
        const mediaResponse = await fetch(`${this.config.apiUrl}/${businessAccount.id}/media`, {
          method: 'POST',
          body: new URLSearchParams({
            image_url: post.images[0],
            access_token: this.accessToken,
            caption: `${post.title}\n\n${post.description}${post.price ? `\n\nPrice: ₹${post.price}` : ''}${post.location ? `\n\nLocation: ${post.location}` : ''}`
          })
        });

        const mediaData = await mediaResponse.json();

        if (mediaData.error) {
          return {
            success: false,
            error: mediaData.error.message
          };
        }

        mediaId = mediaData.id;

        // Wait for media to be processed (Instagram requires this)
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Check media status
        const statusResponse = await fetch(`${this.config.apiUrl}/${mediaId}?access_token=${this.accessToken}&fields=status_code`);
        const statusData = await statusResponse.json();

        if (statusData.status_code !== 'FINISHED') {
          return {
            success: false,
            error: 'Media processing failed or timed out'
          };
        }
      }

      if (!mediaId) {
        return {
          success: false,
          error: 'No media uploaded'
        };
      }

      // Create the post using the media
      const postResponse = await fetch(`${this.config.apiUrl}/${businessAccount.id}/media_publish`, {
        method: 'POST',
        body: new URLSearchParams({
          creation_id: mediaId,
          access_token: this.accessToken
        })
      });

      const postData = await postResponse.json();

      if (postData.error) {
        return {
          success: false,
          error: postData.error.message
        };
      }

      return {
        success: true,
        postId: postData.id,
        url: `${this.config.baseUrl}/p/${postData.id}`,
        platformData: {
          mediaId,
          businessAccountId: businessAccount.id,
          postType: 'media_publish',
          createdAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePost(postId: string, updates: Partial<PlatformPost>): Promise<PlatformResult> {
    try {
      if (!this.accessToken) {
        return {
          success: false,
          error: 'Not authenticated'
        };
      }

      // Instagram doesn't allow updating posts after publishing
      // You can only delete and repost
      return {
        success: false,
        error: 'Instagram does not allow updating posts. Please delete and repost.'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePost(postId: string): Promise<PlatformResult> {
    try {
      if (!this.accessToken) {
        return {
          success: false,
          error: 'Not authenticated'
        };
      }

      // Instagram doesn't provide a direct API to delete posts
      // This would need to be done through the Instagram app or website
      return {
        success: false,
        error: 'Instagram posts must be deleted through the Instagram app or website'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPostStats(postId: string): Promise<any> {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated');
      }

      // Get media insights
      const response = await fetch(`${this.config.apiUrl}/${postId}/insights?metric=engagement,impressions,reach,saved&access_token=${this.accessToken}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        postId,
        insights: data.data,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get post stats:', error);
      return null;
    }
  }
}
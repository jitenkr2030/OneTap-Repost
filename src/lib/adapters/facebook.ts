import { BasePlatformAdapter, PlatformConfig, PlatformPost, PlatformResult, AuthResult } from './base';

export class FacebookAdapter extends BasePlatformAdapter {
  constructor(config: PlatformConfig) {
    super({
      baseUrl: 'https://www.facebook.com',
      apiUrl: 'https://graph.facebook.com/v18.0',
      scopes: ['pages_manage_posts', 'pages_read_engagement', 'pages_manage_metadata'],
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

    return `${this.config.baseUrl}/dialog/oauth?${params.toString()}`;
  }

  async authenticate(authCode: string): Promise<AuthResult> {
    try {
      const tokenUrl = `${this.config.apiUrl}/oauth/access_token`;
      const params = new URLSearchParams({
        client_id: this.config.clientId || '',
        client_secret: this.config.clientSecret || '',
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

      this.setTokens(data.access_token, data.refresh_token);

      // Get user info
      const userResponse = await fetch(`${this.config.apiUrl}/me?access_token=${data.access_token}`);
      const userData = await userResponse.json();

      return {
        success: true,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
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
    if (!this.refreshToken) {
      return {
        success: false,
        error: 'No refresh token available'
      };
    }

    try {
      const tokenUrl = `${this.config.apiUrl}/oauth/access_token`;
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.config.clientId || '',
        client_secret: this.config.clientSecret || '',
        refresh_token: this.refreshToken
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

      this.setTokens(data.access_token, data.refresh_token);

      return {
        success: true,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
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

      // Get user's pages
      const pagesResponse = await fetch(`${this.config.apiUrl}/me/accounts?access_token=${this.accessToken}`);
      const pagesData = await pagesResponse.json();

      if (pagesData.error || !pagesData.data || pagesData.data.length === 0) {
        return {
          success: false,
          error: 'No Facebook pages found'
        };
      }

      // Use the first page (in real implementation, user would select which page)
      const page = pagesData.data[0];
      const pageAccessToken = page.access_token;

      // Create post data
      const postData: any = {
        message: `${post.title}\n\n${post.description}`,
        access_token: pageAccessToken
      };

      // Add price if available
      if (post.price) {
        postData.price = post.price.toString();
        postData.currency = 'INR';
      }

      // Add location if available
      if (post.location) {
        postData.place = post.location;
      }

      // Upload images if available
      if (post.images && post.images.length > 0) {
        const uploadedPhotos = [];
        
        for (const imageUrl of post.images.slice(0, 10)) { // Facebook allows up to 10 photos
          try {
            // In real implementation, you would upload the image file
            // For now, we'll simulate it
            const photoResponse = await fetch(`${this.config.apiUrl}/${page.id}/photos`, {
              method: 'POST',
              body: new URLSearchParams({
                url: imageUrl,
                access_token: pageAccessToken,
                published: 'false'
              })
            });

            const photoData = await photoResponse.json();
            if (photoData.id) {
              uploadedPhotos.push(photoData.id);
            }
          } catch (error) {
            console.error('Failed to upload photo:', error);
          }
        }

        if (uploadedPhotos.length > 0) {
          postData.attached_media = uploadedPhotos.map((photo_id: string) => ({
            media_fbid: photo_id
          }));
        }
      }

      // Create the post
      const postResponse = await fetch(`${this.config.apiUrl}/${page.id}/feed`, {
        method: 'POST',
        body: new URLSearchParams(postData)
      });

      const postDataResult = await postResponse.json();

      if (postDataResult.error) {
        return {
          success: false,
          error: postDataResult.error.message
        };
      }

      return {
        success: true,
        postId: postDataResult.id,
        url: `${this.config.baseUrl}/${page.id}/posts/${postDataResult.id}`,
        platformData: {
          pageId: page.id,
          postType: 'feed',
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

      // Facebook doesn't allow updating post content after posting
      // We can only update the privacy or delete and repost
      return {
        success: false,
        error: 'Facebook does not allow updating post content. Please delete and repost.'
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

      const response = await fetch(`${this.config.apiUrl}/${postId}`, {
        method: 'DELETE',
        body: new URLSearchParams({
          access_token: this.accessToken
        })
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error.message
        };
      }

      return {
        success: true
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

      const response = await fetch(`${this.config.apiUrl}/${postId}/insights?metric=post_engaged_users,post_impressions,post_reactions_by_type_total&access_token=${this.accessToken}`);
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
import { BasePlatformAdapter, PlatformConfig, PlatformPost, PlatformResult, AuthResult } from './base';

export class WhatsAppAdapter extends BasePlatformAdapter {
  private phoneNumberId?: string;

  constructor(config: PlatformConfig) {
    super({
      baseUrl: 'https://wa.me',
      apiUrl: 'https://graph.facebook.com/v15.0/whatsapp',
      scopes: ['whatsapp_business_messaging'],
      ...config
    });
    
    this.phoneNumberId = config.phoneNumberId;
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
      const tokenUrl = 'https://graph.facebook.com/v15.0/oauth/access_token';
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

      // Get business phone number info
      if (this.phoneNumberId) {
        const phoneResponse = await fetch(`${this.config.apiUrl}/${this.phoneNumberId}?access_token=${data.access_token}`);
        const phoneData = await phoneResponse.json();

        if (phoneData.error) {
          console.warn('Could not fetch phone number info:', phoneData.error.message);
        }
      }

      return {
        success: true,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        userData: {
          phoneNumberId: this.phoneNumberId
        }
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
      const tokenUrl = 'https://graph.facebook.com/v15.0/oauth/access_token';
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
      if (!this.accessToken || !this.phoneNumberId) {
        return {
          success: false,
          error: 'Not authenticated or phone number ID not provided'
        };
      }

      // Create message content
      let messageText = `*${post.title}*\n\n`;
      messageText += `${post.description}\n\n`;
      
      if (post.price) {
        messageText += `💰 *Price:* ₹${post.price.toLocaleString()}\n`;
      }
      
      if (post.location) {
        messageText += `📍 *Location:* ${post.location}\n`;
      }
      
      messageText += `📂 *Category:* ${post.category}\n`;
      messageText += `\n*Posted via OneTap Repost Engine*`;

      const messageData: any = {
        messaging_product: 'whatsapp',
        to: this.phoneNumberId, // In real implementation, this would be the recipient's phone number
        text: {
          body: messageText
        }
      };

      // Send text message
      const response = await fetch(`${this.config.apiUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error.message
        };
      }

      let mediaIds: string[] = [];

      // Send images if available
      if (post.images && post.images.length > 0) {
        for (const imageUrl of post.images.slice(0, 1)) { // WhatsApp typically sends one media at a time
          try {
            const mediaMessage = {
              messaging_product: 'whatsapp',
              to: this.phoneNumberId,
              type: 'image',
              image: {
                link: imageUrl,
                caption: post.title
              }
            };

            const mediaResponse = await fetch(`${this.config.apiUrl}/${this.phoneNumberId}/messages`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(mediaMessage)
            });

            const mediaData = await mediaResponse.json();

            if (!mediaData.error) {
              mediaIds.push(mediaData.messages[0].id);
            }
          } catch (error) {
            console.error('Failed to send image:', error);
          }
        }
      }

      // Send videos if available
      if (post.videos && post.videos.length > 0) {
        for (const videoUrl of post.videos.slice(0, 1)) {
          try {
            const videoMessage = {
              messaging_product: 'whatsapp',
              to: this.phoneNumberId,
              type: 'video',
              video: {
                link: videoUrl,
                caption: post.title
              }
            };

            const videoResponse = await fetch(`${this.config.apiUrl}/${this.phoneNumberId}/messages`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(videoMessage)
            });

            const videoData = await videoResponse.json();

            if (!videoData.error) {
              mediaIds.push(videoData.messages[0].id);
            }
          } catch (error) {
            console.error('Failed to send video:', error);
          }
        }
      }

      return {
        success: true,
        postId: data.messages[0].id,
        url: `https://wa.me/${this.phoneNumberId}`,
        platformData: {
          messageId: data.messages[0].id,
          mediaIds: mediaIds,
          phoneNumberId: this.phoneNumberId,
          postType: 'whatsapp_message',
          createdAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePost(postId: string, updates: Partial<PlatformPost>): Promise<PlatformResult> {
    try {
      if (!this.accessToken || !this.phoneNumberId) {
        return {
          success: false,
          error: 'Not authenticated or phone number ID not provided'
        };
      }

      // WhatsApp doesn't allow updating messages after they're sent
      // You can only delete and resend
      return {
        success: false,
        error: 'WhatsApp does not allow updating messages. Please delete and resend.'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePost(postId: string): Promise<PlatformResult> {
    try {
      if (!this.accessToken || !this.phoneNumberId) {
        return {
          success: false,
          error: 'Not authenticated or phone number ID not provided'
        };
      }

      // WhatsApp Business API doesn't provide a direct way to delete messages
      // Messages can only be deleted within a certain time frame by the sender
      return {
        success: false,
        error: 'WhatsApp messages can only be deleted within a limited time window through the WhatsApp app'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPostStats(postId: string): Promise<any> {
    try {
      if (!this.accessToken || !this.phoneNumberId) {
        throw new Error('Not authenticated or phone number ID not provided');
      }

      // WhatsApp Business API provides limited message status information
      const response = await fetch(`${this.config.apiUrl}/${this.phoneNumberId}/messages/${postId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        postId,
        messageStatus: data,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get post stats:', error);
      return null;
    }
  }
}
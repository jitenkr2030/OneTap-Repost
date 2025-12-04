import { BasePlatformAdapter, PlatformConfig, PlatformPost, PlatformResult, AuthResult } from './base';

export class TelegramAdapter extends BasePlatformAdapter {
  private botToken?: string;
  private chatId?: string;

  constructor(config: PlatformConfig) {
    super({
      baseUrl: 'https://t.me',
      apiUrl: 'https://api.telegram.org',
      ...config
    });
    
    this.botToken = config.botToken;
    this.chatId = config.chatId;
  }

  getAuthUrl(): string {
    // Telegram uses bot tokens and chat IDs, not OAuth
    // Users need to provide bot token and chat ID directly
    return `${this.config.baseUrl}`;
  }

  async authenticate(authCode?: string): Promise<AuthResult> {
    try {
      if (!this.botToken || !this.chatId) {
        return {
          success: false,
          error: 'Bot token and chat ID are required for Telegram'
        };
      }

      // Test the bot token and get bot info
      const response = await fetch(`${this.config.apiUrl}/bot${this.botToken}/getMe`);
      const data = await response.json();

      if (!data.ok) {
        return {
          success: false,
          error: data.description || 'Invalid bot token'
        };
      }

      // Test chat access
      const chatResponse = await fetch(`${this.config.apiUrl}/bot${this.botToken}/getChat?chat_id=${this.chatId}`);
      const chatData = await chatResponse.json();

      if (!chatData.ok) {
        return {
          success: false,
          error: chatData.description || 'Invalid chat ID or no access to chat'
        };
      }

      this.setTokens(this.botToken);

      return {
        success: true,
        accessToken: this.botToken,
        userData: {
          bot: data.result,
          chat: chatData.result
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
    // Telegram bot tokens don't expire, so no refresh needed
    return {
      success: true,
      accessToken: this.botToken
    };
  }

  async postListing(post: PlatformPost): Promise<PlatformResult> {
    try {
      if (!this.botToken || !this.chatId) {
        return {
          success: false,
          error: 'Bot token and chat ID are required'
        };
      }

      // Create message text
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

      // Send text message
      const textResponse = await fetch(`${this.config.apiUrl}/bot${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: messageText,
          parse_mode: 'Markdown',
          disable_web_page_preview: false
        })
      });

      const textData = await textResponse.json();

      if (!textData.ok) {
        return {
          success: false,
          error: textData.description
        };
      }

      let mediaIds: string[] = [];

      // Send images if available
      if (post.images && post.images.length > 0) {
        for (const imageUrl of post.images.slice(0, 10)) { // Telegram allows up to 10 photos in one album
          try {
            const photoResponse = await fetch(`${this.config.apiUrl}/bot${this.botToken}/sendPhoto`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: this.chatId,
                photo: imageUrl,
                caption: post.images.length === 1 ? post.title : undefined,
                parse_mode: 'Markdown'
              })
            });

            const photoData = await photoResponse.json();

            if (photoData.ok) {
              mediaIds.push(photoData.result.message_id.toString());
            }
          } catch (error) {
            console.error('Failed to send photo:', error);
          }
        }
      }

      // Send videos if available
      if (post.videos && post.videos.length > 0) {
        for (const videoUrl of post.videos.slice(0, 1)) { // Telegram typically sends one video at a time
          try {
            const videoResponse = await fetch(`${this.config.apiUrl}/bot${this.botToken}/sendVideo`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: this.chatId,
                video: videoUrl,
                caption: post.title,
                parse_mode: 'Markdown'
              })
            });

            const videoData = await videoResponse.json();

            if (videoData.ok) {
              mediaIds.push(videoData.result.message_id.toString());
            }
          } catch (error) {
            console.error('Failed to send video:', error);
          }
        }
      }

      return {
        success: true,
        postId: textData.result.message_id.toString(),
        url: `${this.config.baseUrl}/c/${this.chatId}/${textData.result.message_id}`,
        platformData: {
          messageId: textData.result.message_id,
          mediaIds: mediaIds,
          chatId: this.chatId,
          postType: 'message',
          createdAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePost(postId: string, updates: Partial<PlatformPost>): Promise<PlatformResult> {
    try {
      if (!this.botToken || !this.chatId) {
        return {
          success: false,
          error: 'Bot token and chat ID are required'
        };
      }

      // Telegram doesn't allow updating messages after they're sent
      // You can only delete and resend
      return {
        success: false,
        error: 'Telegram does not allow updating messages. Please delete and resend.'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePost(postId: string): Promise<PlatformResult> {
    try {
      if (!this.botToken || !this.chatId) {
        return {
          success: false,
          error: 'Bot token and chat ID are required'
        };
      }

      const response = await fetch(`${this.config.apiUrl}/bot${this.botToken}/deleteMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          message_id: postId
        })
      });

      const data = await response.json();

      if (!data.ok) {
        return {
          success: false,
          error: data.description
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
      if (!this.botToken || !this.chatId) {
        throw new Error('Bot token and chat ID are required');
      }

      // Telegram doesn't provide detailed stats for individual messages
      // We can only get basic chat info
      const response = await fetch(`${this.config.apiUrl}/bot${this.botToken}/getChat?chat_id=${this.chatId}`);
      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.description);
      }

      return {
        postId,
        chatInfo: data.result,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get post stats:', error);
      return null;
    }
  }
}
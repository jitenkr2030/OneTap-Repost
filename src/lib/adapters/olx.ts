import { BasePlatformAdapter, PlatformConfig, PlatformPost, PlatformResult, AuthResult } from './base';

export class OLXAdapter extends BasePlatformAdapter {
  constructor(config: PlatformConfig) {
    super({
      baseUrl: 'https://www.olx.in',
      apiUrl: 'https://api.olx.com',
      scopes: ['ads', 'profile'],
      ...config
    });
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId || '',
      redirect_uri: this.config.redirectUri || '',
      response_type: 'code',
      state: Math.random().toString(36).substring(7)
    });

    return `${this.config.baseUrl}/oauth/authorize?${params.toString()}`;
  }

  async authenticate(authCode: string): Promise<AuthResult> {
    try {
      const tokenUrl = `${this.config.apiUrl}/oauth/token`;
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: authCode,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          redirect_uri: this.config.redirectUri
        })
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error_description || data.error
        };
      }

      this.setTokens(data.access_token, data.refresh_token);

      // Get user info
      const userResponse = await fetch(`${this.config.apiUrl}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
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
      const tokenUrl = `${this.config.apiUrl}/oauth/token`;
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret
        })
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error_description || data.error
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

      // OLX requires category mapping
      const categoryMap = {
        'PROPERTY': 'real-estate',
        'VEHICLES': 'vehicles',
        'MOBILES_ELECTRONICS': 'mobiles-phones-tablets',
        'JOBS': 'jobs',
        'SERVICES': 'services',
        'RENTALS': 'real-estate-for-rent',
        'EDUCATION': 'education-learning',
        'PETS': 'pets',
        'GENERAL_SALES': 'home-living'
      };

      const olxCategory = categoryMap[post.category as keyof typeof categoryMap] || 'home-living';

      // Create ad data
      const adData: any = {
        title: post.title,
        description: post.description,
        category_id: olxCategory,
        price: {
          value: post.price || 0,
            currency: 'INR'
        },
        location: {
          city: post.location?.split(',')[0]?.trim() || 'Mumbai',
          region: 'Maharashtra',
          country: 'India'
        }
      };

      // Add images if available
      if (post.images && post.images.length > 0) {
        adData.images = post.images.map((url, index) => ({
          url,
          order: index
        }));
      }

      // Add specific attributes based on category
      if (post.attributes) {
        adData.attributes = post.attributes;
      }

      const response = await fetch(`${this.config.apiUrl}/ads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adData)
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error_description || data.error
        };
      }

      return {
        success: true,
        postId: data.id,
        url: `${this.config.baseUrl}/item/${data.id}`,
        platformData: {
          adId: data.id,
          status: data.status,
          expiresAt: data.expires_at,
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

      const updateData: any = {};

      if (updates.title) updateData.title = updates.title;
      if (updates.description) updateData.description = updates.description;
      if (updates.price) updateData.price = { value: updates.price, currency: 'INR' };
      if (updates.location) {
        updateData.location = {
          city: updates.location.split(',')[0]?.trim() || 'Mumbai',
          region: 'Maharashtra',
          country: 'India'
        };
      }

      const response = await fetch(`${this.config.apiUrl}/ads/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error_description || data.error
        };
      }

      return {
        success: true,
        postId: data.id,
        url: `${this.config.baseUrl}/item/${data.id}`,
        platformData: {
          adId: data.id,
          status: data.status,
          updatedAt: new Date().toISOString()
        }
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

      const response = await fetch(`${this.config.apiUrl}/ads/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (response.status === 204) {
        return {
          success: true
        };
      }

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error_description || data.error
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

      const response = await fetch(`${this.config.apiUrl}/ads/${postId}/stats`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error_description || data.error);
      }

      return {
        postId,
        stats: data,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get post stats:', error);
      return null;
    }
  }
}
export interface PlatformConfig {
  clientId?: string
  clientSecret?: string
  redirectUri?: string
  scopes?: string[]
  baseUrl?: string
  apiUrl?: string
  [key: string]: any
}

export interface PlatformPost {
  id: string
  title: string
  description: string
  price?: number
  location?: string
  category: string
  images: string[]
  videos?: string[]
  attributes?: Record<string, any>
}

export interface PlatformResult {
  success: boolean
  postId?: string
  url?: string
  error?: string
  platformData?: any
}

export interface AuthResult {
  success: boolean
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  error?: string
  userData?: any
}

export abstract class BasePlatformAdapter {
  protected config: PlatformConfig;
  protected accessToken?: string;
  protected refreshToken?: string;

  constructor(config: PlatformConfig) {
    this.config = config;
  }

  abstract authenticate(authCode?: string): Promise<AuthResult>;
  abstract refreshAccessToken(): Promise<AuthResult>;
  abstract postListing(post: PlatformPost): Promise<PlatformResult>;
  abstract updatePost(postId: string, updates: Partial<PlatformPost>): Promise<PlatformResult>;
  abstract deletePost(postId: string): Promise<PlatformResult>;
  abstract getPostStats(postId: string): Promise<any>;

  protected async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  protected async handleError(error: any): Promise<PlatformResult> {
    console.error('Platform adapter error:', error);
    return {
      success: false,
      error: error.message || 'Unknown error occurred'
    };
  }

  setTokens(accessToken: string, refreshToken?: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  getAuthUrl(): string {
    throw new Error('getAuthUrl not implemented');
  }

  isConnected(): boolean {
    return !!this.accessToken;
  }
}
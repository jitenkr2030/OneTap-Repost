import { BasePlatformAdapter, PlatformConfig } from './base';
import { FacebookAdapter } from './facebook';
import { InstagramAdapter } from './instagram';
import { OLXAdapter } from './olx';
import { TelegramAdapter } from './telegram';
import { WhatsAppAdapter } from './whatsapp';

export class AdapterFactory {
  private static adapters: Map<string, new (config: PlatformConfig) => BasePlatformAdapter> = new Map([
    ['facebook', FacebookAdapter],
    ['instagram', InstagramAdapter],
    ['olx', OLXAdapter],
    ['telegram', TelegramAdapter],
    ['whatsapp', WhatsAppAdapter]
  ]);

  static createAdapter(platformType: string, config: PlatformConfig): BasePlatformAdapter {
    const AdapterClass = this.adapters.get(platformType.toLowerCase());
    
    if (!AdapterClass) {
      throw new Error(`Unsupported platform: ${platformType}`);
    }

    return new AdapterClass(config);
  }

  static getSupportedPlatforms(): string[] {
    return Array.from(this.adapters.keys());
  }

  static isPlatformSupported(platformType: string): boolean {
    return this.adapters.has(platformType.toLowerCase());
  }

  static getAdapterConfig(platformType: string): Partial<PlatformConfig> {
    const configs: Record<string, Partial<PlatformConfig>> = {
      facebook: {
        baseUrl: 'https://www.facebook.com',
        apiUrl: 'https://graph.facebook.com/v18.0',
        scopes: ['pages_manage_posts', 'pages_read_engagement', 'pages_manage_metadata']
      },
      instagram: {
        baseUrl: 'https://www.instagram.com',
        apiUrl: 'https://graph.instagram.com',
        scopes: ['instagram_content', 'instagram_basic']
      },
      olx: {
        baseUrl: 'https://www.olx.in',
        apiUrl: 'https://api.olx.com',
        scopes: ['ads', 'profile']
      },
      telegram: {
        baseUrl: 'https://t.me',
        apiUrl: 'https://api.telegram.org',
        scopes: []
      },
      whatsapp: {
        baseUrl: 'https://wa.me',
        apiUrl: 'https://graph.facebook.com/v15.0/whatsapp',
        scopes: ['whatsapp_business_messaging']
      }
    };

    return configs[platformType.toLowerCase()] || {};
  }
}

export {
  BasePlatformAdapter,
  FacebookAdapter,
  InstagramAdapter,
  OLXAdapter,
  TelegramAdapter,
  WhatsAppAdapter
};
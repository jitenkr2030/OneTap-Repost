# 🚀 OneTap Repost Engine

A universal auto-repost platform that allows users to upload their listings once and automatically distribute them across multiple social media platforms, marketplaces, and messaging apps with AI-powered optimization.

## ✨ Features

### 🎯 Core Functionality
- **One-Click Multi-Platform Reposting**: Upload once and automatically post to all selected platforms
- **Universal Platform Support**: Connect to Facebook, Instagram, WhatsApp, Telegram, OLX, and 50+ other platforms
- **Smart AI Optimization**: AI-powered content optimization, hashtag suggestions, and best posting time recommendations
- **Scheduled & Recurring Posting**: Set up automatic reposting schedules to keep listings fresh and visible

### 📊 Analytics & Management
- **Centralized Dashboard**: Track all listings, leads, and performance metrics in one unified dashboard
- **Real-time Analytics**: Monitor views, clicks, engagement, and conversion rates across all platforms
- **Lead Aggregation**: Centralized inbox for all inquiries and leads from different platforms
- **Performance Tracking**: Detailed analytics with charts and performance metrics

### 🔐 Security & Reliability
- **Enterprise-grade Security**: Encrypted tokens and secure authentication for all platforms
- **Multi-Account Management**: Connect and manage multiple accounts across different platforms
- **Job Queue System**: Robust cron-based scheduling with retry mechanisms and error handling

### 💰 Flexible Pricing
- **Pay Per Repost**: No monthly commitment, pay only for what you use
- **Daily Auto-Boost**: Unlimited daily reposts with priority processing
- **Weekly Pro**: Advanced features with multi-account support and lead aggregation
- **Enterprise**: Custom solutions with API access and dedicated support

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Hook Form + Zod** for form validation

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma ORM** with SQLite database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Cron jobs** for scheduled tasks

### Platform Integration
- **Custom Platform Adapters** for each social media platform
- **Mini-service Architecture** for background workers
- **Queue Management** for job processing
- **Webhook Support** for real-time updates

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main entities:

### Core Models
- **Users**: Authentication, roles, subscriptions
- **Listings**: Product/service information with media and attributes
- **Platforms**: Supported social media and marketplace platforms
- **Platform Accounts**: User connections to different platforms
- **Repost Jobs**: Scheduled and processed posting tasks
- **Platform Posts**: Published posts across platforms
- **Leads**: Aggregated inquiries and customer interactions
- **Analytics**: Performance metrics and reporting data
- **Subscriptions**: User plans and billing information

### Key Features
- **Relational Integrity**: Proper foreign key relationships
- **Status Tracking**: Enum-based status management for all entities
- **JSON Configuration**: Flexible config storage for platform-specific settings
- **Audit Trail**: Created/updated timestamps for all records

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- SQLite (included)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/OneTap-Repost.git
   cd OneTap-Repost
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Start the repost worker** (in a separate terminal)
   ```bash
   cd mini-services/repost-worker
   npm install
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── listings/      # Listing management
│   │   │   ├── accounts/      # Platform accounts
│   │   │   ├── repost-jobs/   # Job management
│   │   │   ├── analytics/     # Analytics data
│   │   │   └── platforms/     # Platform info
│   │   ├── dashboard/         # User dashboard
│   │   ├── listings/          # Listing pages
│   │   ├── analytics/         # Analytics pages
│   │   ├── integrations/      # Platform connections
│   │   ├── pricing/           # Pricing plans
│   │   └── (auth pages)       # Login, signup, etc.
│   ├── components/            # React components
│   │   └── ui/               # shadcn/ui components
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utility libraries
│       ├── db.ts             # Database client
│       ├── utils.ts          # Helper functions
│       ├── platform-adapters.ts # Platform integration
│       └── adapters/         # Individual platform adapters
├── mini-services/
│   └── repost-worker/        # Background job processor
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database

## 🌐 Platform Support

### Social Media
- **Facebook Marketplace**: Product listings with images and descriptions
- **Instagram**: Visual content with optimized captions and hashtags
- **WhatsApp Business**: Direct messaging with media support

### Marketplaces
- **OLX**: Classified listings with category optimization
- **Facebook Groups**: Community-based posting
- **Specialized Platforms**: Property, vehicles, jobs, services

### Messaging Apps
- **Telegram**: Channel and group posting
- **WhatsApp**: Business account integration

### Planned Integrations
- LinkedIn (Professional services)
- Twitter/X (Quick updates)
- Pinterest (Visual products)
- YouTube (Video content)

## 📊 Analytics & Reporting

### Metrics Tracked
- **Listing Performance**: Views, clicks, engagement rates
- **Platform Comparison**: Performance across different platforms
- **Lead Generation**: Inquiry volume and conversion rates
- **ROI Analysis**: Cost vs. performance metrics

### Reporting Features
- **Real-time Dashboards**: Live performance data
- **Historical Trends**: Time-based analysis
- **Custom Reports**: Exportable data and insights
- **Automated Alerts**: Performance notifications

## 🔐 Security Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based sessions
- **Role-based Access**: User, admin, and moderator roles
- **Password Security**: bcryptjs hashing with salt rounds
- **Session Management**: Secure cookie-based sessions

### Data Protection
- **Encrypted Storage**: Sensitive data encryption
- **API Rate Limiting**: Prevent abuse and attacks
- **Input Validation**: Zod schema validation
- **CORS Protection**: Secure cross-origin requests

### Platform Security
- **Token Encryption**: Secure storage of platform tokens
- **OAuth Integration**: Secure platform authentication
- **Permission Scopes**: Minimum required permissions
- **Audit Logging**: Track all platform interactions

## 💳 Payment Integration (Planned)

### Subscription Models
- **Free Trial**: 7-day trial with limited quota
- **Pay Per Post**: Flexible pricing per platform post
- **Daily Plans**: Unlimited daily reposts
- **Weekly Plans**: Advanced features with priority support
- **Enterprise**: Custom solutions with API access

### Payment Methods
- **Credit/Debit Cards**: Stripe integration
- **UPI**: Indian payment system
- **Digital Wallets**: Popular e-wallet support
- **Net Banking**: Direct bank transfers

## 🚀 Deployment

### Production Setup
1. **Environment Configuration**
   ```bash
   NODE_ENV=production
   DATABASE_URL="production-database-url"
   JWT_SECRET="production-secret-key"
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   npm run start
   ```

3. **Worker Service**
   ```bash
   cd mini-services/repost-worker
   npm run build
   npm start
   ```

### Docker Support (Planned)
```dockerfile
# Dockerfile configuration for containerized deployment
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the excellent framework
- **Prisma** for the modern ORM
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- All platform API providers for their integration support

## 📞 Support

For support and questions:
- **Email**: support@onetaprepost.com
- **Documentation**: [docs.onetaprepost.com](https://docs.onetaprepost.com)
- **Community**: [community.onetaprepost.com](https://community.onetaprepost.com)
- **Issues**: [GitHub Issues](https://github.com/jitenkr2030/OneTap-Repost/issues)

## 🗺️ Roadmap

### Phase 1 (Completed)
- [x] Database schema design
- [x] Authentication system
- [x] Basic platform adapters
- [x] Landing page and marketing site
- [x] User dashboard foundation
- [x] Repost job scheduling system

### Phase 2 (In Progress)
- [ ] Listing upload interface with media handling
- [ ] Platform connection system
- [ ] Advanced analytics with charts
- [ ] Lead aggregation system
- [ ] Payment integration
- [ ] Admin panel

### Phase 3 (Planned)
- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] API for third-party integrations
- [ ] White-label solution
- [ ] Enterprise features
- [ ] Global platform expansion

---

Built with ❤️ for the modern seller. Supercharge your posting workflow with OneTap Repost Engine! 🚀
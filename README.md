# HappyFox Product Analytics Dashboard

A comprehensive analytics dashboard for tracking customer usage across all HappyFox services with organization-level insights and RBAC support.

## 🎯 Product Analytics Schema

This dashboard implements a complete product analytics system that tracks:

- **Multi-Service Usage**: Customers can use multiple HappyFox services (AI, Helpdesk, Chat, Knowledge Base)
- **Organization-Level Analytics**: Track usage by customer organization with plan-based segmentation
- **Feature Adoption**: Monitor feature usage and adoption rates across services
- **RBAC for Internal Users**: Role-based access control for HappyFox employees

## 🏢 Core Entities

### Customer Organizations
- Plan types: starter, pro, enterprise
- Domain-based organization management
- Multi-service subscriptions

### HappyFox Services
- **AI Assistant**: Premium AI-powered customer support
- **Helpdesk**: Core ticket management system
- **Chat**: Live customer communication
- **Knowledge Base**: Self-service content management

### Features & Access Control
- Feature-level usage tracking
- Plan-based feature access (starter/pro/enterprise)
- Customer service access management
- Internal user permissions (admin/analyst/manager/viewer)

## 📊 Analytics Capabilities

### Dashboard Views
- **Overview**: High-level metrics across all services
- **Organizations**: Customer organization analytics and management
- **Services**: Service-specific usage and performance metrics
- **Features**: Feature adoption rates and usage patterns
- **Customers**: Individual customer analytics and service access
- **Events**: Detailed event tracking and analysis
- **Sessions**: User session analytics and engagement metrics
- **Access Control**: RBAC management for internal users

### Key Metrics
- Organization-level usage trends
- Service adoption and engagement rates
- Feature utilization across plan types
- Customer overlap across services
- Real-time activity monitoring

## 🚀 Getting Started

To run this project locally, you'll need Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd eventflow-insight

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Project Structure

This project uses:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type safety
- **React** - UI framework
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Chart visualization library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Features

- **Analytics Dashboard** - Comprehensive event tracking and user behavior analysis
- **Real-time Charts** - Live data visualization with interactive charts
- **User Journey Mapping** - Track user flows and conversion funnels
- **Device & Browser Analytics** - Cross-platform usage insights
- **Session Analysis** - Detailed session tracking and user engagement metrics
- **Responsive Design** - Works seamlessly across all device sizes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

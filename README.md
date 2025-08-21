# Lyvo - AI-Powered Video Conferencing Platform

## Project Structure

This project is organized for team development with clear separation between frontend and backend responsibilities.

### 📁 Folder Structure

\`\`\`
lyvo/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── meetings/             # Meeting management endpoints
│   │   └── ai/                   # AI feature endpoints
│   ├── dashboard/                # Dashboard pages
│   ├── meeting/                  # Meeting room pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # React Components
│   ├── ui/                       # Reusable UI components (shadcn)
│   ├── landing/                  # Landing page components
│   ├── dashboard/                # Dashboard components
│   ├── meeting/                  # Meeting room components
│   └── ai/                       # AI feature components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions and configurations
│   ├── api.ts                    # API client functions
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # General utilities
└── README.md                     # This file
\`\`\`

### 👥 Team Responsibilities

#### Frontend Team
- **Landing Page**: `components/landing/` - Marketing website components
- **Dashboard**: `components/dashboard/`, `app/dashboard/` - User dashboard interface
- **Meeting Room**: `components/meeting/`, `app/meeting/` - Video conferencing interface
- **AI Components**: `components/ai/` - AI feature UI components
- **Hooks**: `hooks/` - Custom React hooks for state management
- **Styling**: Global styles and component styling

#### Backend Team
- **API Routes**: `app/api/` - All server-side endpoints
- **Authentication**: `app/api/auth/` - User authentication logic
- **Meeting Management**: `app/api/meetings/` - Meeting CRUD operations
- **AI Integration**: `app/api/ai/` - AI summary and recap generation
- **Database**: Database schema and operations
- **WebRTC**: Real-time communication setup

#### AI Team
- **Summary Generation**: `app/api/ai/summary/` - Meeting summarization
- **Late Joiner Recap**: `app/api/ai/recap/` - Audio recap generation
- **Real-time Subtitles**: Multi-language subtitle processing
- **Action Item Extraction**: Smart task identification

### 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Run development server**: `npm run dev`
4. **Open**: http://localhost:3000

### 📋 Development Workflow

1. **Landing Page** - Already implemented and ready
2. **API Endpoints** - Skeleton structure created, ready for implementation
3. **Components** - Base components created, ready for feature development
4. **Types** - TypeScript definitions ready for use

### 🔧 Key Features to Implement

- [ ] User Authentication System
- [ ] Meeting Room Video Interface
- [ ] AI Summary Generation
- [ ] Late Joiner Audio Recap
- [ ] Real-time Multi-language Subtitles
- [ ] Dashboard Analytics
- [ ] Meeting Recording
- [ ] Action Item Tracking

### 📚 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

Each team member can work independently on their assigned areas while maintaining consistency through shared types and API contracts.

# AURA-Lite - Cyberpunk Telecom Support App

## 🚀 Project Overview

AURA-Lite is a proactive, self-service mobile app for telecom customers to resolve internet issues. Built with a cyberpunk aesthetic featuring neon colors, dark themes, and futuristic UI elements.

## 🎯 Core Features

- **Proactive Notifications**: Real-time alerts for connection issues
- **Interactive Self-Help Guides**: Step-by-step troubleshooting
- **AI Chat Support**: Intelligent chatbot assistance
- **Live Technician Tracking**: Real-time location and ETA updates

## 🎨 Design System

### Cyberpunk Theme
- **Colors**: Neon cyan (#00ffff), magenta (#ff0080), green (#00ff00)
- **Backgrounds**: Pure black (#000000) to dark gray (#111111)
- **Typography**: Monospace fonts (Courier New)
- **Effects**: Glowing borders, grid patterns, scan lines

## 📱 App Structure

### Tab Navigation
1. **Dashboard** (`/`) - Status overview and quick actions
2. **Self-Help** (`/help`) - Interactive troubleshooting guides
3. **AI Support** (`/chat`) - Chatbot interface
4. **Tech Track** (`/track`) - Technician location tracking

## 👥 Team Responsibilities

### 🎨 UI/UX Designer
**Files to Focus On:**
- `constants/theme.ts` - Design system and color palette
- `components/CyberpunkButton.tsx` - Reusable UI components
- All screen styling in `app/(tabs)/*.tsx`

**Responsibilities:**
- Cyberpunk visual design implementation
- Animation and interaction design
- User experience flow optimization
- Responsive design for mobile/web

### 💻 Frontend Developer
**Files to Focus On:**
- `app/(tabs)/index.tsx` - Dashboard screen
- `app/(tabs)/help.tsx` - Self-help guides
- `app/(tabs)/chat.tsx` - Chat interface
- `app/(tabs)/track.tsx` - Technician tracking
- `hooks/useNotifications.ts` - Notification system

**Responsibilities:**
- React Native component development
- State management and data flow
- Navigation implementation
- Cross-platform compatibility (iOS/Android/Web)

### 🔧 Backend Developer
**Files to Focus On:**
- `services/api.ts` - API service layer
- Mock data and business logic
- Integration points for real services

**Responsibilities:**
- API endpoint simulation
- Data structure design
- Chat bot response logic
- Real-time updates simulation

## 🛠 Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based)
- **Styling**: StyleSheet with LinearGradient
- **State**: React hooks + Context API
- **Icons**: Lucide React Native
- **Platform**: iOS, Android, Web compatible

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on web
npm run start-web
```

## 📋 Demo Script

### Core User Journey (5 minutes)
1. **Proactive Alert** (30s)
   - App shows connection issue notification
   - User taps notification to investigate

2. **Self-Help Guide** (2 minutes)
   - User selects "Slow Internet Speed" guide
   - Completes 3 troubleshooting steps
   - Marks each step as completed

3. **AI Chat Escalation** (1.5 minutes)
   - User taps "Still Need Help?"
   - Chats with AI about persistent issues
   - AI suggests technician visit

4. **Technician Tracking** (1 minute)
   - User navigates to Tech Track tab
   - Views real-time technician location
   - Sees ETA and contact information

## 🎯 Key Demo Points

- **Proactive Experience**: App detects issues before user reports them
- **Self-Service First**: Guided troubleshooting reduces support calls
- **Seamless Escalation**: Easy transition from self-help to human support
- **Real-Time Transparency**: Live tracking builds customer confidence

## 🔧 API Endpoints (Simulated)

### POST /api/chat
```json
Request: { "message": "My internet is slow" }
Response: { "reply": "Let's run a speed test...", "type": "text" }
```

### GET /api/tech-location
```json
Response: { "lat": 37.7749, "lng": -122.4194, "eta": "15 minutes" }
```

### POST /api/log-issue
```json
Request: { "issue_id": "wifi-001", "steps_completed": 3 }
Response: { "success": true, "ticket_id": "TKT-123456" }
```

## 🎨 Cyberpunk Design Elements

- **Neon Glows**: Box shadows with cyan/magenta colors
- **Grid Overlays**: Subtle background patterns
- **Monospace Typography**: Courier New for tech aesthetic
- **Angular Geometry**: Sharp corners and linear designs
- **Scan Lines**: Subtle animation effects
- **High Contrast**: Dark backgrounds with bright accents

## 📱 Cross-Platform Notes

- **Web Compatibility**: Uses React Native Web
- **Responsive Design**: Adapts to different screen sizes
- **Platform-Specific**: Conditional rendering for web vs mobile
- **Performance**: Optimized animations and rendering

## 🚀 Deployment Ready

The app is production-ready with:
- TypeScript for type safety
- Error boundaries for graceful failures
- Accessibility features
- Performance optimizations
- Cross-platform compatibility

---

**Built for hackathon success** 🏆

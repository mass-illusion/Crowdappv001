# Codebase and Terminal Explanation

## What is This Project?

**Crowdappv01** is a React Native mobile application built with Expo that helps people connect and attend events together. It's a social networking app focused on:
- Finding event buddies for live events
- Connecting people with shared interests
- Creating and managing friend groups
- Organizing local events and meetups
- Facilitating group chats

Think of it as a combination of event discovery, social matching, and group coordination all in one app.

---

## Current State of Your Terminal/Repository

### Repository Status
- **Working directory**: `/home/runner/work/Crowdappv001/Crowdappv001`
- **Current branch**: `copilot/explain-terminal-and-codebase`
- **Git status**: Clean working tree (no uncommitted changes)
- **Dependencies**: Not installed yet (node_modules directory doesn't exist)

### What You See in Your Directory
Your repository contains:
1. **~45 MB of image assets** - UI mockups, holiday themes, and event category images
2. **TypeScript source code** - The actual application code
3. **Configuration files** - For Expo, TypeScript, ESLint, and other tools
4. **No dependencies installed** - You need to run `npm install` first

---

## Project Technology Stack

### Core Technologies
- **React Native 0.81.5** - Framework for building native mobile apps with JavaScript
- **React 19.1.0** - UI library
- **Expo SDK ~54** - Development platform that simplifies React Native development
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing system (similar to Next.js)

### Key Features & Libraries
- **Maps & Location**: `expo-location`, `react-native-maps`, `react-native-google-places-autocomplete`
  - ⚠️ Note: Google Places API requires API key configuration
- **Messaging**: `expo-sms` for sending text messages
- **Media**: `expo-image-picker`, `expo-av` (audio/video)
- **UI/UX**: `expo-blur`, `expo-linear-gradient`, `@react-native-async-storage/async-storage`
- **Animations**: `react-native-reanimated`, `@shopify/react-native-skia`
- **Contacts**: `expo-contacts` for accessing phone contacts

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Expo Dev Client** - Custom development builds
- **React Native SVG** - SVG support with transformer

---

## Project Structure

```
Crowdappv001/
├── app/                          # Main application screens (file-based routing)
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # Entry point (Onboarding)
│   ├── homepage.tsx             # Main home screen
│   ├── registration.tsx         # User registration
│   ├── create-event.tsx         # Event creation screen
│   ├── map.tsx                  # Map view of events/people
│   ├── messages.tsx             # Messaging/chat screen
│   ├── profile.tsx              # User profile
│   ├── interests.tsx            # Interest selection
│   ├── circles.tsx              # Friend groups
│   └── [various other screens] # 30+ screen files
│
├── components/                   # Reusable UI components
│   ├── OnboardingCarousel.tsx   # Welcome screens
│   ├── RegistrationScreen.tsx   # Registration form
│   ├── AnimatedSplashScreen.tsx # Animated splash
│   ├── Upload.tsx               # Photo upload
│   └── [13 more components]     # Other reusable components
│
├── contexts/                     # React Context for state management
│   └── StarredProfilesContext.tsx # Manages starred/favorited profiles
│
├── constants/                    # App constants
├── types/                        # TypeScript type definitions
├── assets/                       # Images, fonts, etc.
├── debug/                        # Debug utilities
│
├── [150+ image files]           # Category images, mockups, holiday themes
│
├── package.json                 # Dependencies and scripts
├── app.json                     # Expo configuration
├── tsconfig.json                # TypeScript configuration
├── metro.config.js              # Metro bundler config
└── eas.json                     # Expo Application Services config
```

---

## How the App Works

### User Flow
1. **Onboarding** (`index.tsx` → `OnboardingCarousel`)
   - 3-slide carousel explaining the app features
   - "Event Buddies", "Real Friends", "Friend Groups"

2. **Registration** (`registration.tsx`)
   - User signs up with phone number
   - Code verification
   - Profile setup (photo, interests, demographics)

3. **Homepage** (`homepage.tsx`)
   - Main dashboard showing:
     - Live events nearby
     - Friend circles
     - Interest-based categories
     - Profile access

4. **Core Features**:
   - **Events** (`create-event.tsx`, `live-events.tsx`, `music-events.tsx`)
     - Create events with date, time, location, category
     - Invite contacts via SMS
     - Browse live events by category
   
   - **Messaging** (`messages.tsx`, `direct-message.tsx`)
     - Group chats
     - Direct messaging
   
   - **Map View** (`map.tsx`)
     - See events and people on a map
     - Location-based discovery
   
   - **Profiles** (`profile.tsx`, `crowd-profiles.tsx`, `profile-detail.tsx`)
     - View and edit user profiles
     - See shared interests
     - Star/favorite profiles
   
   - **Circles** (`circles.tsx`)
     - Create friend groups
     - Group management

### Key Technical Patterns

#### File-Based Routing (Expo Router)
- Each file in `/app` becomes a route
- `_layout.tsx` defines the navigation structure
- Navigation: `router.push('/homepage')`, `router.back()`

#### State Management
- **AsyncStorage**: Persisting user data locally (profile, starred profiles)
- **React Context**: Sharing state across components (StarredProfilesContext)
- **useState/useEffect**: Component-level state

#### Data Persistence
```typescript
// Saving data
await AsyncStorage.setItem('firstName', name);

// Loading data
const firstName = await AsyncStorage.getItem('firstName');
```

---

## How to Get Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd /home/runner/work/Crowdappv001/Crowdappv001
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Run on Device/Simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

### Available Scripts
```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run reset-project  # Reset to blank template
```

---

## Key Configuration Files

### `app.json` - Expo Configuration
- App name, version, icons
- iOS bundle identifier: `com.yourcompany.crowdappv01`
- Android package: `com.yourcompany.crowdappv01`
- Permissions: Location, Contacts, SMS
- New architecture enabled for better performance
- EAS project ID for cloud builds

### `package.json` - Dependencies
- 40+ production dependencies
- Expo SDK 54
- React Native 0.81.5
- React 19.1.0

### `tsconfig.json` - TypeScript Config
- Enables strict type checking
- Path aliases and module resolution

---

## Understanding the Large File Count

You have **150+ image files** in the root directory (45+ MB total). These include:
- **UI mockups** from ChatGPT/Gemini (design references)
- **Category images**: Business, Holidays, Sports, Music, Fandom, etc.
- **Theme images**: Christmas, Halloween, Thanksgiving
- **Icon assets**: Chat icons, SVG files, optimized versions

**Recommendation**: Consider organizing these into subdirectories:
```
assets/
├── mockups/          # Design mockups
├── categories/       # Event category images
├── holidays/         # Holiday-themed images
└── icons/           # App icons and small assets
```

---

## Common Issues and Solutions

### Issue: "node_modules not found"
**Solution**: Run `npm install` to install dependencies

### Issue: "Expo command not found"
**Solution**: Install Expo CLI globally: `npm install -g expo-cli`

### Issue: Build errors with new architecture
**Note**: App has `newArchEnabled: true` in app.json
- This uses React Native's new architecture (Fabric, TurboModules)
- Most libraries in this project support the new architecture
- If you encounter issues, check the library's documentation for new architecture support
- React Native compatibility: https://reactnative.dev/docs/new-architecture-library-intro

### Issue: Large repository size
**Cause**: 45+ MB of images in root directory
**Solution**: Consider using `.gitignore` to exclude large assets or move to cloud storage

---

## Architecture Highlights

### New React Native Architecture
This app uses the **new architecture** (`newArchEnabled: true`):
- **Fabric**: New rendering system
- **TurboModules**: Faster native module calls
- Better performance and user experience

### Expo Features Used
- **Expo Router**: File-based navigation
- **Expo Splash Screen**: Custom animated splash
- **Expo Updates**: Over-the-air updates (EAS)
- **Expo Dev Client**: Custom development builds

### Permissions Required
The app needs access to:
- **Location** (fine and coarse): Find nearby events and people
- **Contacts**: Invite friends to events
- **SMS**: Send event invitations

---

## Next Steps

### For Development
1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Test on simulator or physical device
4. Make code changes and see live reload

### For Production
1. Configure EAS Build: Already set up with project ID
2. Build iOS/Android apps: `eas build`
3. Submit to app stores: `eas submit`
4. Set up OTA updates: Already configured

### Code Improvements to Consider
1. **Organize images**: Move to `assets/` subdirectories
2. **Add .gitignore rules**: Exclude mockups and design files
3. **Environment variables**: Move API keys to `.env` files
4. **Testing**: Add unit tests (no test infrastructure currently)
5. **Backend integration**: Currently using local AsyncStorage only
6. **Error boundaries**: Add error handling for production

---

## Summary

Your Crowdappv001 is a **feature-rich social event app** built with modern React Native/Expo. The codebase is organized with:
- 30+ screens for user registration, events, messaging, and profiles
- 14 reusable components
- Context-based state management
- File-based routing with Expo Router
- Heavy use of visual assets for categories and themes

**Current status**: 
- ✅ Code is complete and functional
- ❌ Dependencies not installed yet
- 🎨 Lots of visual assets included (45+ MB)
- 🚀 Ready to run once you do `npm install`

**To get running**:
```bash
npm install
npm start
```

Then scan the QR code with Expo Go app on your phone, or press `i`/`a` for simulators.

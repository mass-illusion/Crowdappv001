# App Flow Diagram

## Visual Structure of Crowdappv01

```
┌─────────────────────────────────────────────────────────────────┐
│                     CROWDAPPV01 MOBILE APP                       │
│                    (React Native + Expo)                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
        ┌────────────────────────────────────────────┐
        │    Animated Splash Screen (AnimatedSplash)  │
        │         Custom animated intro               │
        └────────────────────────────────────────────┘
                                 │
                                 ▼
        ┌────────────────────────────────────────────┐
        │   Onboarding Carousel (index.tsx)          │
        │   • Slide 1: Event Buddies                 │
        │   • Slide 2: Real Friends (AI matching)    │
        │   • Slide 3: Friend Groups                 │
        └────────────────────────────────────────────┘
                                 │
                                 ▼
        ┌────────────────────────────────────────────┐
        │   Registration Flow (registration.tsx)      │
        │   1. Phone number entry                    │
        │   2. Code verification                     │
        │   3. Profile setup                         │
        │      • Name, age, gender                   │
        │      • Photo upload                        │
        │      • Interests selection                 │
        │      • Looking for (friends/dating)        │
        └────────────────────────────────────────────┘
                                 │
                                 ▼
        ┌────────────────────────────────────────────┐
        │         Homepage (homepage.tsx)             │
        │    ┌──────────────────────────────────┐   │
        │    │  User Profile Header              │   │
        │    │  [Photo] Hi, [Name]               │   │
        │    └──────────────────────────────────┘   │
        │                                             │
        │    ┌──────────────────────────────────┐   │
        │    │  Quick Actions                    │   │
        │    │  [Create Event] [Messages]        │   │
        │    └──────────────────────────────────┘   │
        │                                             │
        │    ┌──────────────────────────────────┐   │
        │    │  Event Categories (Scrollable)    │   │
        │    │  • Live Events                    │   │
        │    │  • Music Festivals                │   │
        │    │  • Sports                         │   │
        │    │  • Business                       │   │
        │    │  • Holidays                       │   │
        │    │  • Conventions                    │   │
        │    │  • Fandom                         │   │
        │    └──────────────────────────────────┘   │
        │                                             │
        │    ┌──────────────────────────────────┐   │
        │    │  Friend Circles                   │   │
        │    │  Your Groups & Communities        │   │
        │    └──────────────────────────────────┘   │
        └────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┬──────────────┬──────────────┐
        │             │             │              │              │
        ▼             ▼             ▼              ▼              ▼
   ┌────────┐   ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐
   │ Events │   │   Map   │  │ Messages │  │ Profiles │  │ Circles │
   └────────┘   └─────────┘  └──────────┘  └──────────┘  └─────────┘


═══════════════════════════════════════════════════════════════════
                        DETAILED FEATURE FLOWS
═══════════════════════════════════════════════════════════════════


1. EVENT FLOW
══════════════

Homepage
   │
   ▼
Browse Events by Category
   │
   ├──► Live Events (live-events.tsx)
   ├──► Music Events (music-events.tsx)
   ├──► Holidays (holidays.tsx)
   └──► Public Figures (public-figures.tsx)
          │
          ▼
   View Event Details
          │
          ▼
   ┌──────────────┐
   │ Create Event │ (create-event.tsx)
   └──────────────┘
          │
          ├─► Enter event name
          ├─► Select date & time
          ├─► Choose category
          ├─► Add location
          ├─► Write details
          └─► Invite contacts (via SMS)
                  │
                  ▼
          Event Created & Shared


2. MESSAGING FLOW
═════════════════

Messages Screen (messages.tsx)
   │
   ├──► View all conversations
   │    └─► Group chats
   │    └─► Direct messages
   │
   ▼
Select Conversation
   │
   ▼
Direct Message (direct-message.tsx)
   │
   ├─► Send text messages
   ├─► View message history
   ├─► Create event from chat
   └─► View participant profiles


3. PROFILE & DISCOVERY FLOW
════════════════════════════

View Profiles
   │
   ├──► Browse Profiles (crowd-profiles.tsx)
   │    └─► Filter by location/interests
   │    └─► See spot matches
   │
   ▼
Profile Detail (profile-detail.tsx)
   │
   ├─► View shared interests
   ├─► Star/favorite profile
   ├─► Send message
   └─► View similar profiles
        │
        ▼
   Your Profile (profile.tsx)
        │
        ├─► View your info
        ├─► View starred profiles
        └─► Edit Profile
              │
              ▼
   Edit Profile (edit-profile.tsx)
              │
              ├─► Update photo
              ├─► Change interests
              ├─► Update info
              └─► Save changes


4. MAP & LOCATION FLOW
══════════════════════

Map View (map.tsx)
   │
   ├─► See nearby events (markers)
   ├─► See nearby people
   ├─► Filter by distance
   └─► Tap marker for details
         │
         ▼
   Event/Profile Detail
         │
         └─► Join event or connect


5. CIRCLES (FRIEND GROUPS) FLOW
════════════════════════════════

Circles (circles.tsx)
   │
   ├─► View your circles
   ├─► Create new circle
   │   └─► Name the group
   │   └─► Add members
   │   └─► Set group image
   │
   └─► Manage circle
       ├─► View members
       ├─► Start group chat
       ├─► Create circle event
       └─► Edit circle details


═══════════════════════════════════════════════════════════════════
                    DATA FLOW & STATE MANAGEMENT
═══════════════════════════════════════════════════════════════════


┌─────────────────────────────────────────────────────────────────┐
│                    ASYNCSTORAGE (Local Storage)                  │
│                                                                   │
│  • User Profile Data (firstName, age, gender)                   │
│  • Profile Photo URI                                             │
│  • Starred Profiles                                              │
│  • User Preferences                                              │
│  • Onboarding Completion Status                                 │
└─────────────────────────────────────────────────────────────────┘
                                 ▲
                                 │ Read/Write
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              REACT CONTEXT (StarredProfilesContext)              │
│                                                                   │
│  • Global state for starred/favorited profiles                  │
│  • Functions: addStarred, removeStarred, isStarred              │
│  • Persists to AsyncStorage automatically                       │
└─────────────────────────────────────────────────────────────────┘
                                 ▲
                                 │ Provides to
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        ALL APP COMPONENTS                        │
│                                                                   │
│  Components use Context + AsyncStorage for:                     │
│  • Displaying user info                                          │
│  • Persisting user choices                                       │
│  • Syncing across screens                                        │
└─────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                        NAVIGATION STRUCTURE
═══════════════════════════════════════════════════════════════════

app/_layout.tsx (Root Layout)
   │
   ├─► Wraps all screens in StarredProfilesContext
   ├─► Shows AnimatedSplashScreen on first load
   └─► Provides navigation stack
          │
          ├─► app/index.tsx (Onboarding)
          ├─► app/registration.tsx
          ├─► app/homepage.tsx (Main Hub)
          ├─► app/create-event.tsx
          ├─► app/messages.tsx
          ├─► app/direct-message.tsx
          ├─► app/map.tsx
          ├─► app/profile.tsx
          ├─► app/edit-profile.tsx
          ├─► app/circles.tsx
          ├─► app/crowd-profiles.tsx
          ├─► app/profile-detail.tsx
          ├─► app/live-events.tsx
          ├─► app/music-events.tsx
          ├─► app/holidays.tsx
          ├─► app/public-figures.tsx
          ├─► app/interests.tsx
          ├─► app/age.tsx
          ├─► app/gender.tsx
          ├─► app/also.tsx
          ├─► app/welcome.tsx
          ├─► app/Upload.tsx
          ├─► app/LookingForScreen.tsx
          ├─► app/spot-matches.tsx
          ├─► app/crowd-filter-modal.tsx
          ├─► app/interest-map.tsx
          ├─► app/terms.tsx
          └─► app/privacy-policy.tsx


═══════════════════════════════════════════════════════════════════
                          EXTERNAL SERVICES
═══════════════════════════════════════════════════════════════════

┌──────────────────┐
│  Device Services │
└──────────────────┘
        │
        ├─► GPS/Location (expo-location)
        │   └─► Find nearby events/people
        │
        ├─► Camera/Gallery (expo-image-picker)
        │   └─► Upload profile photos
        │
        ├─► Contacts (expo-contacts)
        │   └─► Invite friends to events
        │
        └─► SMS (expo-sms)
            └─► Send event invitations

┌──────────────────┐
│  Map Services    │
└──────────────────┘
        │
        └─► Google Places API (react-native-google-places)
            └─► Location search & autocomplete

┌──────────────────┐
│  Expo Services   │
└──────────────────┘
        │
        └─► EAS Updates
            └─► Over-the-air app updates


═══════════════════════════════════════════════════════════════════
                        KEY COMPONENTS LIBRARY
═══════════════════════════════════════════════════════════════════

Reusable Components (components/)
   │
   ├─► OnboardingCarousel.tsx
   │   └─► 3-slide welcome carousel
   │
   ├─► AnimatedSplashScreen.tsx
   │   └─► Custom animated app intro
   │
   ├─► RegistrationScreen.tsx
   │   └─► User signup form
   │
   ├─► CodeVerificationScreen.tsx
   │   └─► Phone verification UI
   │
   ├─► ProfileScreen.tsx
   │   └─► Profile display/edit
   │
   ├─► Upload.tsx
   │   └─► Photo upload component
   │
   ├─► AgeScreen.tsx
   │   └─► Age selection UI
   │
   ├─► GenderScreen.tsx
   │   └─► Gender selection UI
   │
   ├─► LookingForScreen.tsx
   │   └─► Relationship preference UI
   │
   ├─► WelcomeModal.tsx
   │   └─► Welcome popup/modal
   │
   ├─► TermsScreen.tsx
   │   └─► Terms of service
   │
   └─► PrivacyPolicyScreen.tsx
       └─► Privacy policy display


═══════════════════════════════════════════════════════════════════
                    SUMMARY: HOW IT ALL CONNECTS
═══════════════════════════════════════════════════════════════════

                         User Opens App
                               │
                               ▼
                    Animated Splash Screen
                               │
                               ▼
                     Onboarding (3 slides)
                               │
                               ▼
                  Registration + Profile Setup
                               │
                               ▼
                          Homepage Hub
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
      Discover Events    Connect w/People   Create Groups
           │                   │                   │
           ▼                   ▼                   ▼
    Join/Create Event   Message Profiles    Circle Activities
           │                   │                   │
           └───────────────────┴───────────────────┘
                               │
                               ▼
                   Share & Invite via SMS
                               │
                               ▼
                     Build Social Network!

```

## Quick Legend

- `┌─┐` = Screen/Component boundary
- `│` = Flow connection
- `▼` = Proceeds to
- `├─►` = Option/branch
- `═` = Section divider
- `[  ]` = Button/Action
- `(file.tsx)` = Source file reference

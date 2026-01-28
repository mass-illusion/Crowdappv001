# CrowdApp Maps Setup Guide

## 🚀 Quick Setup

### 1. Supabase Setup

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and anon key

2. **Run the database schema:**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the query

3. **Update Supabase configuration:**
   ```typescript
   // lib/supabase.ts
   const supabaseUrl = 'https://your-project.supabase.co'
   const supabaseAnonKey = 'your-anon-key'
   ```

### 2. Mapbox Setup

1. **Create a Mapbox account:**
   - Go to [mapbox.com](https://mapbox.com)
   - Sign up and get your access token

2. **Update Mapbox configuration:**
   ```typescript
   // lib/mapbox.ts
   export const MAPBOX_ACCESS_TOKEN = 'pk.your-mapbox-token'
   ```

3. **iOS Configuration (ios/Podfile):**
   ```ruby
   # Add to your Podfile
   pod 'RNMBGL', :path => '../node_modules/@rnmapbox/maps'
   ```

4. **Android Configuration:**
   ```xml
   <!-- android/app/src/main/AndroidManifest.xml -->
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   ```

### 3. Enable Location Services

Add to your `app.json`:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location to find nearby places you might love."
        }
      ]
    ]
  }
}
```

## 📱 Features Implemented

### Core Functionality
- ✅ Interactive Mapbox map
- ✅ User location tracking
- ✅ Place search via Mapbox Geocoding
- ✅ Save favorite places to Supabase
- ✅ Categorize places (restaurant, bar, coffee, etc.)
- ✅ Rate and add notes to places
- ✅ Find users with similar favorite places

### User Experience
- ✅ Real-time search suggestions
- ✅ Custom map markers by category
- ✅ Smooth camera animations
- ✅ Modal for adding favorites
- ✅ Category filtering
- ✅ Social discovery features

### Database Features
- ✅ Row-level security
- ✅ Automatic match creation
- ✅ User profiles integration
- ✅ Efficient indexing

## 🎯 Usage

1. **Search for places:** Type in the search bar to find restaurants, bars, cafes, etc.
2. **Add to favorites:** Tap a search result to add it to your favorites with category, rating, and notes
3. **View on map:** See all your favorite places as colored markers on the map
4. **Discover similar users:** When you add a place, see other users who also love that spot
5. **Filter by category:** Use the category buttons to filter your view

## 🔧 Customization

### Adding New Categories
```typescript
// lib/mapbox.ts
export const PLACE_CATEGORIES = {
  // Add new categories here
  bakery: {
    color: '#FFD93D',
    icon: '🥖',
    label: 'Bakery'
  }
}
```

### Custom Map Styles
```typescript
// lib/mapbox.ts
export const MAPBOX_STYLES = {
  // Add custom map styles
  CUSTOM: 'mapbox://styles/yourusername/your-style-id'
}
```

## 🚨 Troubleshooting

### Common Issues:

1. **Map not loading:**
   - Check your Mapbox access token
   - Verify internet connection

2. **Location not working:**
   - Grant location permissions
   - Check device location services

3. **Database errors:**
   - Verify Supabase configuration
   - Check RLS policies
   - Ensure user is authenticated

4. **Search not working:**
   - Check Mapbox access token
   - Verify network connectivity

## 📈 Future Enhancements

- [ ] Real-time chat for matched users
- [ ] Photo sharing for favorite places
- [ ] Event creation at favorite locations
- [ ] Advanced filtering and recommendations
- [ ] Integration with external APIs (Yelp, Google Places)
- [ ] Offline map support
- [ ] Push notifications for nearby matches

## 🔒 Privacy & Security

- All data is secured with Row Level Security (RLS)
- Users only see their own favorites
- Location data is not stored permanently
- User matching is opt-in only

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review Supabase logs
- Check React Native and Expo documentation
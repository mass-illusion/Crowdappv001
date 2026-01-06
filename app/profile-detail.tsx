import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import GroupIcon from '../assets/images/Groupicon.svg';

// Mock profile data - matches crowd-profiles.tsx
const mockProfiles = [
  {
    id: 1,
    image: require('../assets/images/profile01.png'),
    starred: false,
    name: 'Emma',
    age: 24,
    city: 'San Francisco, CA',
    description: 'Software engineer that loves house music and traveling.',
    lookingFor: 'Girlfriends to carpool and share a room at EDC!',
    interests: ['League of Legends', 'Weight Training', 'Tech House', 'Art Exhibits', 'Raving'],
    userType: 'individual',
    photos: [
      require('../assets/images/profile01.png'),
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300'
    ]
  },
  {
    id: 2,
    image: require('../assets/images/profile2.png'),
    starred: false,
    name: 'Group',
    age: null,
    city: 'Los Angeles, CA',
    description: 'Party crew looking for more amazing people to join us.',
    lookingFor: 'New friends to party and explore festivals together!',
    interests: ['Raving', 'Tech House', 'Art Exhibits', 'Weight Training'],
    userType: 'large-group',
    photos: [
      require('../assets/images/profile2.png'),
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300'
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
    starred: false,
    name: 'Sarah & Mia',
    age: null,
    city: 'Austin, TX',
    description: 'Best friends who love dancing and meeting new people at festivals.',
    lookingFor: 'Looking for a group to explore different music genres with!',
    interests: ['Dancing', 'Tech House', 'Photography', 'Travel'],
    userType: 'couple',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300'
    ]
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    starred: false,
    name: 'Alex',
    age: 26,
    city: 'Miami, FL',
    description: 'Music producer and DJ who enjoys discovering new artists.',
    lookingFor: 'Fellow music enthusiasts to attend underground shows with.',
    interests: ['Music Production', 'DJing', 'Tech House', 'Art Exhibits'],
    userType: 'individual',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300'
    ]
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    starred: false,
    name: 'Concert Crew',
    age: null,
    city: 'Denver, CO',
    description: 'Group of friends who attend every major music event in the city.',
    lookingFor: 'More people to join our concert adventures!',
    interests: ['Live Music', 'Raving', 'Photography', 'Travel'],
    userType: 'large-group',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300'
    ]
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    starred: false,
    name: 'Maya',
    age: 23,
    city: 'Seattle, WA',
    description: 'Art student with a passion for electronic music and creativity.',
    lookingFor: 'Creative souls to share artistic experiences and raves with.',
    interests: ['Art Exhibits', 'Electronic Music', 'Dancing', 'Photography'],
    userType: 'individual',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300'
    ]
  }
];

type Profile = {
  id: number;
  name: string;
  image: any;
  starred: boolean;
  age: number | null;
  description: string;
  lookingFor: string;
  interests: string[];
  userType: string;
  photos: any[];
};

const getCurrentProfile = (profileId: string) => {
  return mockProfiles.find(p => p.id.toString() === profileId) || mockProfiles[0];
};

const getCurrentProfileIndex = (profileId: string) => {
  return mockProfiles.findIndex(p => p.id.toString() === profileId);
};

export default function ProfileDetailScreen() {
  const router = useRouter();
  const { profileId } = useLocalSearchParams();
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [isStarred, setIsStarred] = React.useState(false);
  
  const profile = getCurrentProfile(profileId as string);
  const currentProfileIndex = getCurrentProfileIndex(profileId as string);
  
  // Initialize starred state based on profile data
  useFocusEffect(
    React.useCallback(() => {
      const loadStarredState = async () => {
        try {
          const starredData = await AsyncStorage.getItem('starredProfiles');
          const starredList = starredData ? JSON.parse(starredData) : [];
          setIsStarred(starredList.includes(profile.id));
        } catch (e) {
          console.warn('Failed to load starred state', e);
          setIsStarred(false);
        }
      };
      
      loadStarredState();
    }, [profile.id])
  );
  
  // Animation values for swipe gesture
  const translateX = React.useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = Dimensions.get('window');
  const opacity = React.useRef(new Animated.Value(1)).current;
  
  // Create animated event for smoother gesture handling
  const gestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );
  
  const handlePreviousProfile = () => {
    const prevIndex = currentProfileIndex === 0 ? mockProfiles.length - 1 : currentProfileIndex - 1;
    const prevProfile = mockProfiles[prevIndex];
    setCurrentPhotoIndex(0); // Reset to first photo of new profile
    router.replace(`/profile-detail?profileId=${prevProfile.id}`);
  };
  
  const handleNextProfile = () => {
    const nextIndex = currentProfileIndex === mockProfiles.length - 1 ? 0 : currentProfileIndex + 1;
    const nextProfile = mockProfiles[nextIndex];
    setCurrentPhotoIndex(0); // Reset to first photo of new profile
    router.replace(`/profile-detail?profileId=${nextProfile.id}`);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(prev => 
      prev === 0 ? profile.photos.length - 1 : prev - 1
    );
  };
  
  const handleNextPhoto = () => {
    setCurrentPhotoIndex(prev => 
      prev === profile.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleStarPress = async () => {
    const newStarredState = !isStarred;
    setIsStarred(newStarredState);
    
    // Save to AsyncStorage
    try {
      const starredData = await AsyncStorage.getItem('starredProfiles');
      const starredList = starredData ? JSON.parse(starredData) : [];
      
      if (newStarredState) {
        // Add to starred list
        if (!starredList.includes(profile.id)) {
          starredList.push(profile.id);
        }
      } else {
        // Remove from starred list
        const index = starredList.indexOf(profile.id);
        if (index > -1) {
          starredList.splice(index, 1);
        }
      }
      
      await AsyncStorage.setItem('starredProfiles', JSON.stringify(starredList));
    } catch (e) {
      console.warn('Failed to save starred state', e);
    }
    
    // Add haptic feedback (if available)
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    console.log(`${newStarredState ? 'Starred' : 'Unstarred'} profile:`, profile.name);
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'individual':
        return <Ionicons name="person-outline" size={20} color="#666" />;
      case 'couple':
        return <Ionicons name="people-outline" size={20} color="#666" />;
      case 'large-group':
        return <GroupIcon width={32} height={32} />;
      default:
        return <Ionicons name="person-outline" size={20} color="#666" />;
    }
  };
    
  const onSwipeHandlerStateChange = (event: any) => {
    const { state, translationX, velocityX } = event.nativeEvent;

    if (state === State.END) {
      const swipeThreshold = screenWidth * 0.15; // Reduced threshold for easier swiping
      const velocityThreshold = 300; // Reduced velocity threshold

      // Determine if swipe is significant enough
      const shouldSwipe = Math.abs(translationX) > swipeThreshold || Math.abs(velocityX) > velocityThreshold;

      if (shouldSwipe) {
        // Add smooth transition to next/previous photo
        const targetX = translationX > 0 ? screenWidth : -screenWidth;
        
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: targetX,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          })
        ]).start(() => {
          // Change photo after animation
          if (translationX > 0) {
            handlePreviousPhoto();
          } else {
            handleNextPhoto();
          }
          
          // Reset position and fade in new photo
          translateX.setValue(0);
          Animated.timing(opacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }).start();
        });
      } else {
        // Bounce back to original position
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 120,
            friction: 7,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          })
        ]).start();
      }
    }
  };

  const currentPhoto = profile.photos[currentPhotoIndex];

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Fixed Profile Image with Swipe Gesture */}
        <View style={styles.imageContainer}>
          <PanGestureHandler
            onGestureEvent={gestureEvent}
            onHandlerStateChange={onSwipeHandlerStateChange}
            activeOffsetX={[-10, 10]}
            failOffsetY={[-40, 40]}
            shouldCancelWhenOutside={false}
            enableTrackpadTwoFingerGesture={true}
          >
            <Animated.View style={[
              styles.imageWrapper, 
              { 
                transform: [{ translateX }],
                opacity: opacity
              }
            ]}>
              <Image 
                source={typeof currentPhoto === 'string' ? { uri: currentPhoto } : currentPhoto}
                style={styles.profileImage} 
              />
            </Animated.View>
          </PanGestureHandler>
          
          {/* Photo Indicators */}
          <View style={styles.imageIndicator}>
            {profile.photos.map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.dot, 
                  index === currentPhotoIndex && styles.activeDot
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <TouchableOpacity 
                style={[styles.starButton, isStarred && styles.starButtonActive]}
                onPress={handleStarPress}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={isStarred ? "star" : "star-outline"} 
                  size={28} 
                  color={isStarred ? "#FFD700" : "#999"} 
                />
              </TouchableOpacity>
            </View>
            
            {/* City Section */}
            <View style={styles.citySection}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.cityText}>{profile.city || 'City not specified'}</Text>
            </View>
            
            <Text style={styles.description}>{profile.description}</Text>

            <Text style={styles.lookingForTitle}>Looking for:</Text>
            <Text style={styles.lookingForText}>{profile.lookingFor}</Text>

            {/* Shared Interests */}
            <View style={styles.interestTags}>
              {profile.interests.map((interest, index) => {
                const colors = ['#6366F1', '#EF4444', '#F97316', '#10B981', '#06B6D4'];
                return (
                  <View 
                    key={index}
                    style={[styles.tag, { backgroundColor: colors[index % colors.length] }]}
                  >
                    <Text style={styles.tagText}>{interest}</Text>
                  </View>
                );
              })}
            </View>

            <Text style={styles.interestCount}>{profile.interests.length} interests</Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom Navigation Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handlePreviousProfile}
          >
            <Ionicons name="arrow-back" size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.messageButton}
            onPress={() => {
              // Navigate to direct message screen
              router.push(`/direct-message?profileName=${encodeURIComponent(profile.name)}&profileId=${profile.id}`);
            }}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleNextProfile}
          >
            <Ionicons name="arrow-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        
        {/* User Type Icon - Bottom Right */}
        <View style={styles.userTypeIconBottomRight}>
          {getUserTypeIcon(profile.userType)}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    height: '55%',
    position: 'relative',
    backgroundColor: '#E5E5EA',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for bottom actions + card margins
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 0,
  },
  citySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cityText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  userTypeIconBottomRight: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  starButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  starButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  lookingForTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  lookingForText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  interestCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  additionalContent: {
    marginTop: 24,
  },
  additionalText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
});
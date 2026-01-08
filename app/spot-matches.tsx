import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ChatAlt2SVG from '../assets/images/Chat_alt_2.svg';
import PlateSVG from '../assets/images/plate.svg';
import { CUSTOM_MESSAGES } from '../constants/messages';
import { useStarredProfiles } from '../contexts/StarredProfilesContext';

// Import interests data for emoji display
const INTERESTS = [
  { id: 'techno', label: 'Techno', emoji: '🎛️', peopleCount: 47 },
  { id: 'coffee', label: 'Coffee', emoji: '☕', peopleCount: 23 },
  { id: 'fitness', label: 'Fitness', emoji: '💪', peopleCount: 31 },
  { id: 'art', label: 'Art', emoji: '🎨', peopleCount: 19 },
  { id: 'food', label: 'Food', emoji: '🍕', peopleCount: 42 },
  { id: 'books', label: 'Books', emoji: '📚', peopleCount: 18 },
  { id: 'photography', label: 'Photography', emoji: '📸', peopleCount: 26 },
  { id: 'hiking', label: 'Hiking', emoji: '🥾', peopleCount: 33 }
];

// Generate profiles based on interest-based matching
const generateInterestBasedProfiles = (interest: string, location: string) => {
  // Define the allowed interest keys
  type InterestKey = 'techno' | 'coffee' | 'fitness';
  
  // Define interest-specific profiles
  const interestProfiles: Record<InterestKey, {
    id: number;
    name: string;
    image: any;
    sharedInterests: number;
    starred: boolean;
    interests: string[];
    lookingFor: string[];
  }[]> = {
    'techno': [
      {
        id: 2001,
        name: 'DJ Alex',
        image: require('../assets/images/profile01.png'),
        sharedInterests: 8,
        starred: false,
        interests: ['Techno Producer', 'DJ', 'Electronic Music', 'Underground Scene'],
        lookingFor: [
          'Fellow techno enthusiasts for club nights',
          'Producers for collaboration and remix projects'
        ]
      },
      {
        id: 2002,
        name: 'Maya',
        image: require('../assets/images/profile2.png'),
        sharedInterests: 7,
        starred: false,
        interests: ['Raver', 'Electronic Music', 'Festival Goer', 'Music Blogger'],
        lookingFor: [
          'Rave partners for underground events',
          'Music journalists and festival companions'
        ]
      }
    ],
    'coffee': [
      {
        id: 3001,
        name: 'Jordan',
        image: require('../assets/images/profile01.png'),
        sharedInterests: 6,
        starred: false,
        interests: ['Coffee Enthusiast', 'Barista', 'Roasting', 'Cafe Culture'],
        lookingFor: [
          'Coffee connoisseurs for tasting sessions',
          'Fellow baristas and cafe entrepreneurs'
        ]
      },
      {
        id: 3002,
        name: 'Elena',
        image: require('../assets/images/profile2.png'),
        sharedInterests: 5,
        starred: false,
        interests: ['Coffee Writer', 'Cafe Owner', 'Specialty Coffee', 'Latte Art'],
        lookingFor: [
          'Coffee shop owners for collaboration',
          'Writers covering coffee culture and industry'
        ]
      }
    ],
    'fitness': [
      {
        id: 4001,
        name: 'Marcus',
        image: require('../assets/images/profile01.png'),
        sharedInterests: 7,
        starred: false,
        interests: ['Personal Trainer', 'CrossFit', 'Nutrition', 'Wellness Coach'],
        lookingFor: [
          'Workout partners and fitness accountability',
          'Health coaches for collaboration and client referrals'
        ]
      },
      {
        id: 4002,
        name: 'Sophia',
        image: require('../assets/images/profile2.png'),
        sharedInterests: 6,
        starred: false,
        interests: ['Yoga Instructor', 'Pilates', 'Mindfulness', 'Holistic Health'],
        lookingFor: [
          'Wellness practitioners for workshops',
          'Mindfulness partners for meditation sessions'
        ]
      }
    ]
  };
  
  // Get profiles for the specific interest or return default profiles
  const key = interest.toLowerCase() as InterestKey;
  const specificProfiles = interestProfiles[key] || [];
  
  // Add some general profiles that match various interests
  const generalProfiles = [
    {
      id: 5001,
      name: 'Chris',
      image: require('../assets/images/profile01.png'),
      sharedInterests: 4,
      starred: false,
      interests: ['Community Builder', 'Event Organizer', 'Networking', 'Social Impact'],
      lookingFor: [
        'Community organizers and event planners',
        'Social entrepreneurs and impact-driven individuals'
      ]
    },
    {
      id: 5002,
      name: 'Aria',
      image: require('../assets/images/profile2.png'),
      sharedInterests: 3,
      starred: false,
      interests: ['Creative Director', 'Artist', 'Design', 'Innovation'],
      lookingFor: [
        'Creative collaborators for art projects',
        'Design thinking partners and innovation enthusiasts'
      ]
    },
    {
      id: 5003,
      name: 'Tyler',
      image: require('../assets/images/profile01.png'),
      sharedInterests: 5,
      starred: false,
      interests: ['Entrepreneur', 'Startup Founder', 'Tech', 'Business Development'],
      lookingFor: [
        'Co-founders and business partners',
        'Tech entrepreneurs for networking and mentorship'
      ]
    }
  ];

  return [...specificProfiles, ...generalProfiles];
};

// Mock matched profiles based on shared interests (fallback for establishment-based matching)
const generateMatchedProfiles = (spotName: string) => {
  return [
    {
      id: 1001,
      name: 'Jordan',
      image: require('../assets/images/profile01.png'),
      sharedInterests: 6,
      starred: false,
      interests: ['Photography', 'Coffee Enthusiast', 'Tech'],
      lookingFor: [
        'Looking for creative collaborators and coffee meetups',
        'Photography buddies for weekend shoots'
      ]
    },
    {
      id: 1002,
      name: 'Samantha',
      image: require('../assets/images/profile2.png'),
      sharedInterests: 5,
      starred: false,
      interests: ['Writer', 'Book Club', 'Yoga'],
      lookingFor: [
        'Fellow writers and book lovers for discussion groups',
        'Yoga partners and mindfulness enthusiasts'
      ]
    },
    {
      id: 1003,
      name: 'Marcus',
      image: require('../assets/images/profile01.png'),
      sharedInterests: 4,
      starred: false,
      interests: ['Fitness', 'Rock Climbing', 'Outdoor Adventures'],
      lookingFor: [
        'Climbing partners and hiking buddies',
        'Fitness accountability partners'
      ]
    },
    {
      id: 1004,
      name: 'Luna',
      image: require('../assets/images/profile2.png'),
      sharedInterests: 3,
      starred: false,
      interests: ['Artist', 'Sustainability', 'Community Organizer'],
      lookingFor: [
        'Environmental activists and community builders',
        'Art collaborators for social impact projects'
      ]
    },
    {
      id: 1005,
      name: 'Carlos',
      image: require('../assets/images/profile01.png'),
      sharedInterests: 4,
      starred: false,
      interests: ['Chef', 'Food Blogger', 'Travel'],
      lookingFor: [
        'Food lovers and restaurant exploration partners',
        'Travel companions for culinary adventures'
      ]
    },
    {
      id: 1006,
      name: 'Zoe',
      image: require('../assets/images/profile2.png'),
      sharedInterests: 5,
      starred: false,
      interests: ['Musician', 'Producer', 'Live Events'],
      lookingFor: [
        'Musicians for collaboration and jam sessions',
        'Event organizers and music venue partners'
      ]
    },
    {
      id: 1007,
      name: 'Kai',
      image: require('../assets/images/profile01.png'),
      sharedInterests: 3,
      starred: false,
      interests: ['Developer', 'Gaming', 'AI Enthusiast'],
      lookingFor: [
        'Tech co-founders and development partners',
        'Gaming buddies and AI project collaborators'
      ]
    },
    {
      id: 1008,
      name: 'Isabella',
      image: require('../assets/images/profile2.png'),
      sharedInterests: 6,
      starred: false,
      interests: ['Fashion Designer', 'Entrepreneur', 'Networking'],
      lookingFor: [
        'Fashion industry connections and mentors',
        'Business partners for sustainable fashion startup'
      ]
    },
  ];
};

export default function SpotMatchesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const spotName = params.spotName as string || 'This Location';
  const spotId = params.spotId as string;
  const matchingType = params.matchingType as string;
  const baseInterest = params.baseInterest as string;
  const spotLocation = params.spotLocation as string;
  const { addStarredProfile, removeStarredProfile, isProfileStarred } = useStarredProfiles();
  
  // Generate profiles based on matching type
  const generateProfiles = () => {
    if (matchingType === 'interest' && baseInterest) {
      return generateInterestBasedProfiles(baseInterest, spotLocation || 'San Francisco');
    }
    return generateMatchedProfiles(spotName);
  };
  
  const [profiles, setProfiles] = useState(
    generateProfiles().sort((a, b) => b.sharedInterests - a.sharedInterests)
  );
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [modalStarred, setModalStarred] = useState(false);
  const totalProfiles = profiles.length;

  const toggleStar = (profileId: number) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;

    const starred = !profile.starred;
    setProfiles(prev =>
      prev.map(p => p.id === profileId ? { ...p, starred } : p)
    );

    if (starred) {
      addStarredProfile({
        id: profile.id,
        name: profile.name,
        image: profile.image,
        spotName: spotName,
        sharedInterests: profile.sharedInterests,
      });
    } else {
      removeStarredProfile(profileId);
    }
  };

  const openProfileModal = (profile: any) => {
    const index = profiles.findIndex(p => p.id === profile.id);
    setCurrentProfileIndex(index);
    setSelectedProfile(profile);
    setShowProfileModal(true);
    setModalStarred(profile.starred);
  };

  const navigateProfile = (direction: 'next' | 'prev') => {
    let newIndex = currentProfileIndex;
    if (direction === 'next') {
      newIndex = (currentProfileIndex + 1) % profiles.length;
    } else {
      newIndex = currentProfileIndex === 0 ? profiles.length - 1 : currentProfileIndex - 1;
    }
    setCurrentProfileIndex(newIndex);
    setSelectedProfile(profiles[newIndex]);
    setModalStarred(profiles[newIndex].starred);
  };

  const handleMessagePress = async () => {
    if (!selectedProfile) return;
    
    try {
      // Create new conversation entry
      const conversations = await AsyncStorage.getItem('conversations');
      const conversationData = conversations ? JSON.parse(conversations) : {};
      
      const conversationKey = `conversation_${selectedProfile.id}`;
      const timestamp = new Date();
      
      // Add initial message indicating this is from locals/map
      if (!conversationData[conversationKey]) {
        conversationData[conversationKey] = [
          {
            id: Date.now().toString(),
            text: CUSTOM_MESSAGES.LOCALS_MAP_INTRO,
            sender: 'user',
            timestamp: timestamp,
            senderName: 'You',
            read: false
          }
        ];
        
        await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
        
        // Trigger message list update
        await AsyncStorage.setItem('messageUpdateTrigger', Date.now().toString());
        
        // Add to conversation participants
        const participantsData = await AsyncStorage.getItem('conversationParticipants');
        const allParticipants = participantsData ? JSON.parse(participantsData) : {};
        allParticipants[conversationKey] = [selectedProfile.id];
        await AsyncStorage.setItem('conversationParticipants', JSON.stringify(allParticipants));
        
        // Add as friend if not already added
        const friends = await AsyncStorage.getItem('friends');
        const friendsList = friends ? JSON.parse(friends) : [];
        const existingFriend = friendsList.find((f: any) => f.id === selectedProfile.id);
        
        if (!existingFriend) {
          const newFriend = {
            id: selectedProfile.id,
            name: selectedProfile.name,
            image: selectedProfile.image,
            isLocalImage: false,
            source: matchingType === 'interest' ? 'interest-map' : 'locals/map'
          };
          friendsList.push(newFriend);
          await AsyncStorage.setItem('friends', JSON.stringify(friendsList));
        }
      }
      
      // Close the modal
      setShowProfileModal(false);
      
      // Navigate to direct message
      router.push({
        pathname: '/direct-message',
        params: {
          profileName: selectedProfile.name,
          profileId: selectedProfile.id.toString()
        }
      });
      
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with map background */}
      <View style={styles.headerSection}>
        <View style={styles.mapBackground}>
          <View style={styles.headerOverlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={28} color="#333" />
            </TouchableOpacity>
          </View>
          
          {/* Spot/Interest Icon and Name */}
          <View style={styles.spotDisplay}>
            <View style={styles.spotIconContainer}>
              {matchingType === 'interest' ? (
                <View style={styles.interestEmojiContainer}>
                  <Text style={styles.interestEmojiLarge}>
                    {INTERESTS.find(i => i.id === baseInterest)?.emoji || '🔍'}
                  </Text>
                </View>
              ) : (
                <PlateSVG width={68} height={68} />
              )}
            </View>
            
            {/* User Avatars */}
            <View style={styles.spotUsers}>
              <Image
                source={require('../assets/images/profile01.png')}
                style={[styles.userAvatar, { zIndex: 3 }]}
              />
              <Image
                source={require('../assets/images/profile2.png')}
                style={[styles.userAvatar, { marginLeft: -8, zIndex: 2 }]}
              />
              <Image
                source={require('../assets/images/profile01.png')}
                style={[styles.userAvatar, { marginLeft: -8, zIndex: 1 }]}
              />
            </View>
            
            <Text style={styles.spotDisplayName}>
              {matchingType === 'interest' 
                ? (INTERESTS.find(i => i.id === baseInterest)?.label || baseInterest)
                : spotName}
            </Text>
          </View>
        </View>
      </View>

      {/* Profiles List */}
      <View style={styles.listSection}>
        <Text style={styles.listTitle}>
          {totalProfiles} Profiles {matchingType === 'interest' ? `into ${baseInterest}` : `❤️ ${spotName}`}
        </Text>
        
        <ScrollView style={styles.profilesList} showsVerticalScrollIndicator={false}>
          {profiles.map((profile) => (
            <TouchableOpacity 
              key={profile.id} 
              style={styles.profileItem}
              onPress={() => openProfileModal(profile)}
            >
              <View style={styles.profileLeft}>
                <Image source={profile.image} style={styles.profileAvatar} />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile.name}</Text>
                  <Text style={styles.profileInterests}>
                    You have {profile.sharedInterests} interest in common!
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  toggleStar(profile.id);
                }}
                style={styles.starButton}
              >
                <Ionicons 
                  name={profile.starred ? "star" : "star-outline"} 
                  size={28} 
                  color={profile.starred ? "#FFD700" : "#CCC"} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Profile Modal */}
      <Modal
        visible={showProfileModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowProfileModal(false)}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>

            {/* Featured Profile Card */}
            {selectedProfile && (
              <View style={styles.modalCard}>
                <View style={styles.featuredTop}>
                  <Image source={selectedProfile.image} style={styles.featuredImage} />
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredName}>{selectedProfile.name}</Text>
                    <View style={styles.interestTags}>
                      {selectedProfile.interests?.map((interest: string, index: number) => (
                        <View key={index} style={styles.interestTag}>
                          <Text style={styles.interestEmoji}>
                            {interest === 'Techie' ? '👩‍💻' : interest === 'Raver' ? '🌸' : '📱'}
                          </Text>
                          <Text style={styles.interestText}>{interest}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                
                {selectedProfile.lookingFor && (
                  <View style={styles.lookingForSection}>
                    <Text style={styles.lookingForTitle}>Looking for:</Text>
                    {selectedProfile.lookingFor.map((item: string, index: number) => (
                      <View key={index} style={styles.lookingForItem}>
                        <Text style={styles.lookingForEmoji}>
                          {index === 0 ? '🦄' : '💻'}
                        </Text>
                        <Text style={styles.lookingForText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Card navigation */}
                <View style={styles.cardNavigation}>
                  <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => navigateProfile('prev')}
                  >
                    <Ionicons name="chevron-back" size={32} color="#D0D0D0" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.navCenterButton}
                    onPress={handleMessagePress}
                  >
                    <View style={{ width: 26, height: 26 }}>
                      <ChatAlt2SVG width={26} height={26} color="#D0D0D0" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.navCenterButton}
                    onPress={() => {
                      setModalStarred(!modalStarred);
                      toggleStar(selectedProfile.id);
                    }}
                  >
                    <Ionicons 
                      name={modalStarred ? "star" : "star-outline"} 
                      size={24} 
                      color={modalStarred ? "#FFD700" : "#666"} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => navigateProfile('next')}
                  >
                    <Ionicons name="chevron-forward" size={32} color="#D0D0D0" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    height: 320,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    position: 'relative',
  },
  headerOverlay: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spotDisplay: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    alignItems: 'center',
  },
  spotIconContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  interestEmojiContainer: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  interestEmojiLarge: {
    fontSize: 32,
  },
  spotDisplayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  spotUsers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  featuredCard: {
    position: 'absolute',
    bottom: -80,
    left: 20,
    right: 20,
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredTop: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featuredImage: {
    width: 100,
    height: 140,
    borderRadius: 12,
    marginRight: 16,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  interestEmoji: {
    fontSize: 14,
  },
  interestText: {
    fontSize: 14,
    color: '#666',
  },
  lookingForSection: {
    marginBottom: 16,
  },
  lookingForTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  lookingForItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  lookingForEmoji: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  lookingForText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  cardNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    padding: 8,
  },
  navCenterButton: {
    padding: 12,
  },
  listSection: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  profilesList: {
    flex: 1,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  profileInterests: {
    fontSize: 14,
    color: '#666',
  },
  starButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalCard: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 20,
    margin: 20,
  },
});

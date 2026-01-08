import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useStarredProfiles } from '../contexts/StarredProfilesContext';

// Interest pills data
const INTERESTS = [
  { id: 'Soccer', label: 'Soccer', emoji: '⚽', peopleCount: 6500 },
  { id: 'Nature', label: 'Nature', emoji: '🌿', peopleCount: 9800 },
  { id: 'Language', label: 'Language', emoji: '💬', peopleCount: 2300 },
  { id: 'Fashion', label: 'Fashion', emoji: '🧥', peopleCount: 3400 },
  { id: 'Photography', label: 'Photography', emoji: '📷', peopleCount: 3200 },
  { id: 'Techno', label: 'Techno', emoji: '🎵', peopleCount: 4800 },
  { id: 'Writing', label: 'Writing', emoji: '✍️', peopleCount: 397 },
  { id: 'Boxing', label: 'Boxing', emoji: '🥊', peopleCount: 1800 },
];

// Mock data for users on the interest map
const mockUsers = [
  {
    id: 1,
    name: "User 1",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 40, y: 540 },
  },
  {
    id: 2,
    name: "User 2",
    avatar: require('../assets/images/profile2.png'),
    coordinates: { x: 220, y: 370 },
  },
  {
    id: 3,
    name: "User 3",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 250, y: 370 },
  },
  {
    id: 4,
    name: "User 4",
    avatar: require('../assets/images/profile2.png'),
    coordinates: { x: 280, y: 370 },
  },
  {
    id: 5,
    name: "User 5",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 310, y: 370 },
  },
  {
    id: 6,
    name: "User 6",
    avatar: require('../assets/images/profile2.png'),
    coordinates: { x: 310, y: 490 },
  },
  {
    id: 7,
    name: "User 7",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 340, y: 490 },
  },
  {
    id: 8,
    name: "User 8",
    avatar: require('../assets/images/profile2.png'),
    coordinates: { x: 370, y: 490 },
  },
  {
    id: 9,
    name: "User 9",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 180, y: 645 },
  },
  {
    id: 10,
    name: "User 10",
    avatar: require('../assets/images/profile2.png'),
    coordinates: { x: 210, y: 645 },
  },
  {
    id: 11,
    name: "User 11",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 150, y: 730 },
  },
  {
    id: 12,
    name: "User 12",
    avatar: require('../assets/images/profile2.png'),
    coordinates: { x: 270, y: 760 },
  },
  {
    id: 13,
    name: "User 13",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 300, y: 760 },
  },
  {
    id: 14,
    name: "User 14",
    avatar: require('../assets/images/profile2.png'),
    coordinates: { x: 330, y: 760 },
  },
  {
    id: 15,
    name: "User 15",
    avatar: require('../assets/images/profile01.png'),
    coordinates: { x: 80, y: 790 },
  },
];

// Interest discovery data with people counts
const INTEREST_DISCOVERY = [
  { id: 'Photography', label: 'Photography', emoji: '📷', peopleCount: 3200, image: { uri: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=400&fit=crop' } },
  { id: 'Nature', label: 'Nature', emoji: '🌿', peopleCount: 9800, image: { uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' } },
  { id: 'Music', label: 'Music', emoji: '🎧', peopleCount: 4700, image: { uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop' } },
  { id: 'Writing', label: 'Writing', emoji: '✍️', peopleCount: 397, image: { uri: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop' } },
  { id: 'Fashion', label: 'Fashion', emoji: '🧥', peopleCount: 3400, image: { uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop' } },
  { id: 'Architecture', label: 'Architecture', emoji: '🏛️', peopleCount: 5100, image: { uri: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop' } },
  { id: 'Design', label: 'Design', emoji: '🎨', peopleCount: 1100, image: { uri: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop' } },
];

export default function InterestMapScreen() {
  const router = useRouter();
  const { starredProfiles, addStarredProfile, removeStarredProfile } = useStarredProfiles();
  const [selectedInterest, setSelectedInterest] = useState('Techno');
  const [isMapMode, setIsMapMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortDescending, setSortDescending] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStarredModal, setShowStarredModal] = useState(false);
  const [customInterest, setCustomInterest] = useState('');
  const [selectedCity, setSelectedCity] = useState('Los Angeles');
  const [citySearchInput, setCitySearchInput] = useState('Los Angeles');
  const [customInterestCount, setCustomInterestCount] = useState<number | null>(null);
  const [selectedInterestCount, setSelectedInterestCount] = useState<number | null>(4800);

  const filteredUsers = mockUsers;

  // Load user's stored location on component mount
  useEffect(() => {
    const loadUserLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('userLocation');
        if (storedLocation) {
          setCitySearchInput(storedLocation);
          setSelectedCity(storedLocation);
        }
      } catch (error) {
        console.error('Error loading user location:', error);
      }
    };

    loadUserLocation();
  }, []);

  // Sort interests based on people count
  const sortedInterests = [...INTEREST_DISCOVERY].sort((a, b) => {
    return sortDescending ? b.peopleCount - a.peopleCount : a.peopleCount - b.peopleCount;
  });

  const toggleSort = () => {
    setSortDescending(!sortDescending);
  };

  const handleInterestNavigation = () => {
    // Navigate to spot-matches with interest-based matching
    router.push({
      pathname: '/spot-matches',
      params: {
        spotName: selectedInterest,
        spotLocation: selectedCity,
        matchingType: 'interest', // Flag for interest-based matching
        baseInterest: selectedInterest
      }
    });
  };

  const handleCustomInterestSearch = async () => {
    if (customInterest.trim()) {
      // Generate a random count for demo purposes
      const randomCount = Math.floor(Math.random() * 5000) + 100;
      setCustomInterestCount(randomCount);
      setSelectedInterest(customInterest.trim());
      setSelectedInterestCount(null); // Clear regular interest count
      
      // Use the city the user entered in the modal
      const finalCity = citySearchInput.trim() || selectedCity;
      setSelectedCity(finalCity);
      
      // Clear the custom interest text field but keep the city as entered
      setCustomInterest('');
      
      setShowAddModal(false);
    }
  };

  const renderUserOnMap = (user: typeof mockUsers[0]) => {
    return (
      <TouchableOpacity 
        key={user.id} 
        style={[styles.mapUser, { left: user.coordinates.x, top: user.coordinates.y }]}
        onPress={() => {
          const starredProfile = {
            id: user.id,
            name: user.name,
            image: user.avatar,
            spotName: selectedCity,
            sharedInterests: Math.floor(Math.random() * 5) + 1
          };
          addStarredProfile(starredProfile);
        }}
      >
        <Image source={user.avatar} style={styles.userAvatar} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MAPS</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <View style={styles.menuIconCircle}>
            <Ionicons name="options" size={22} color="#666" />
          </View>
        </TouchableOpacity>
        <Switch
          trackColor={{ false: '#E5E5E5', true: '#A2CCF2' }}
          thumbColor={'#fff'}
          ios_backgroundColor="#E5E5E5"
          onValueChange={() => setIsMapMode(!isMapMode)}
          value={isMapMode}
          style={styles.toggleSwitch}
        />
      </View>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          <TouchableOpacity 
            style={styles.dropdownOverlay}
            onPress={() => setShowDropdown(false)}
            activeOpacity={1}
          />
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => { setShowDropdown(false); router.replace('/map'); }}>
              <Text style={styles.dropdownText}>Switch to Local Spots</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
              <Text style={styles.dropdownText}>Update Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
              <Text style={styles.dropdownText}>Edit Profile Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {
              setShowDropdown(false);
              setShowStarredModal(true);
            }}>
              <Text style={styles.dropdownText}>Starred {starredProfiles.length > 0 && `(${starredProfiles.length})`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
              <Text style={styles.dropdownText}>Favorited</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!isMapMode ? (
          <>
            {/* Interests Section */}
            <View style={styles.interestsSection}>
              <View style={styles.interestsSectionHeader}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.interestPillsContainer}
              >
                <View style={styles.interestPillsColumn}>
                  <View style={styles.interestPillsRow}>
                    {INTERESTS.slice(0, 4).map((interest) => (
                      <TouchableOpacity
                        key={interest.id}
                        style={[
                          styles.interestPill,
                          selectedInterest === interest.id && styles.interestPillSelected
                        ]}
                        onPress={() => {
                          setSelectedInterest(interest.id);
                          setSelectedInterestCount(interest.peopleCount);
                          setCustomInterestCount(null);
                        }}
                      >
                        <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                        <Text style={[
                          styles.interestLabel,
                          selectedInterest === interest.id && styles.interestLabelSelected
                        ]}>
                          {interest.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.interestPillsRow}>
                    {INTERESTS.slice(4, 8).map((interest) => (
                      <TouchableOpacity
                        key={interest.id}
                        style={[
                          styles.interestPill,
                          selectedInterest === interest.id && styles.interestPillSelected
                        ]}
                        onPress={() => {
                          setSelectedInterest(interest.id);
                          setSelectedInterestCount(interest.peopleCount);
                          setCustomInterestCount(null);
                        }}
                      >
                        <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                        <Text style={[
                          styles.interestLabel,
                          selectedInterest === interest.id && styles.interestLabelSelected
                        ]}>
                          {interest.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </View>

            {/* Around Me Section */}
            <View style={styles.aroundMeSection}>
              <Text style={styles.aroundMeTitle}>Around me</Text>
              <Text style={styles.aroundMeSubtitle}>
                People with "<Text style={styles.highlightedInterest}>{selectedInterest}</Text>" interest around you
                {(customInterestCount !== null || selectedInterestCount !== null) && (
                  <Text style={styles.profileCount}> • {(customInterestCount || selectedInterestCount)?.toLocaleString()} profiles</Text>
                )}
              </Text>

              {/* Map Area */}
              <View style={styles.mapContainer}>
                <View style={styles.mapBackground}>
                  {/* Background map grid */}
                  <View style={styles.mapGrid} />
                  
                  {/* Street Labels */}
                  <Text style={[styles.streetLabel, { left: 90, top: 40, transform: [{ rotate: '-45deg' }] }]}>
                    Whittier Street
                  </Text>
                  <Text style={[styles.streetLabel, { left: -40, top: 280, transform: [{ rotate: '-90deg' }] }]}>
                    Dresden Street
                  </Text>
                  <Text style={[styles.streetLabel, { right: -20, top: 240, transform: [{ rotate: '-90deg' }] }]}>
                    South
                  </Text>
                  <Text style={[styles.streetLabel, { right: 320, top: 360 }]}>
                    McDo
                  </Text>

                  {/* Location pin with label */}
                  <View style={styles.locationPinContainer}>
                    <TouchableOpacity 
                      style={styles.locationPin}
                      onPress={handleInterestNavigation}
                    >
                      <View style={styles.locationPinIcon}>
                        <Text style={styles.locationPinEmoji}>
                          {INTERESTS.find(i => i.id === selectedInterest)?.emoji || '🔍'}
                        </Text>
                      </View>
                      <View style={styles.locationPinTriangle} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.locationLabel}
                      onPress={handleInterestNavigation}
                    >
                      <Text style={styles.locationLabelText}>
                        {INTERESTS.find(i => i.id === selectedInterest)?.label || selectedInterest}
                      </Text>
                      <Text style={styles.locationLabelSubtext}>{selectedCity}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Featured user (large center profile) */}
                  <TouchableOpacity 
                    style={styles.featuredUser}
                    onPress={handleInterestNavigation}
                  >
                    <Image 
                      source={require('../assets/images/profile01.png')} 
                      style={styles.featuredUserImage} 
                    />
                  </TouchableOpacity>
                  
                  {/* Render users on map */}
                  {filteredUsers.map(renderUserOnMap)}

                  {/* Add custom interest button */}
                  <TouchableOpacity 
                    style={styles.zoomControl}
                    onPress={() => setShowAddModal(true)}
                  >
                    <Ionicons name="add" size={28} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* Interest Discovery List */
          <View style={styles.discoverySection}>
            <View style={styles.discoveryHeader}>
              <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
                <Text style={styles.sortText}>Popular</Text>
                <Ionicons name="chevron-down" size={16} color="#D0D0D0" />
              </TouchableOpacity>
            </View>

            <View style={styles.discoveryList}>
              {sortedInterests.map((interest) => (
                <TouchableOpacity
                  key={interest.id}
                  style={styles.discoveryItem}
                  onPress={() => {
                    setSelectedInterest(interest.id);
                    setSelectedInterestCount(interest.peopleCount);
                    setCustomInterestCount(null);
                    setIsMapMode(false);
                  }}
                >
                  <View style={styles.discoveryItemLeft}>
                    <View style={styles.discoveryItemImage}>
                      <Image source={interest.image} style={styles.discoveryImage} />
                    </View>
                    <View style={styles.discoveryItemInfo}>
                      <Text style={styles.discoveryItemTitle}>{interest.label}</Text>
                      <Text style={styles.discoveryItemCount}>
                        {interest.peopleCount >= 1000 
                          ? `${(interest.peopleCount / 1000).toFixed(1)}k` 
                          : interest.peopleCount} people
                      </Text>
                      <View style={styles.discoveryAvatars}>
                        <Image source={require('../assets/images/profile01.png')} style={styles.discoveryAvatar} />
                        <Image source={require('../assets/images/profile2.png')} style={[styles.discoveryAvatar, { marginLeft: -8 }]} />
                        <Image source={require('../assets/images/profile01.png')} style={[styles.discoveryAvatar, { marginLeft: -8 }]} />
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#D0D0D0" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/homepage')}>
          <Ionicons name="home" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="mic" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Add Custom Interest Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          style={styles.modalContainer}
        >
          <View style={styles.addModalContent}>
            <ScrollView 
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
                <View style={styles.addModalHeader}>
                  <Text style={styles.addModalTitle}>Add Custom Interest</Text>
                  <TouchableOpacity onPress={() => setShowAddModal(false)}>
                    <Ionicons name="close" size={28} color="#333" />
                  </TouchableOpacity>
                </View>

                <View style={styles.addModalBody}>
                  <Text style={styles.inputLabel}>Interest</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter Interest (e.g. Cosplay, Kayak)"
                    placeholderTextColor="#999"
                    value={customInterest}
                    onChangeText={setCustomInterest}
                    autoCapitalize="words"
                  />

                  <Text style={styles.inputLabel}>City</Text>
                  <View style={styles.citySearchContainer}>
                    <Ionicons name="location-outline" size={20} color="#999" style={styles.citySearchIcon} />
                    <TextInput
                      style={styles.citySearchInput}
                      placeholder="Enter city name or zip code"
                      placeholderTextColor="#999"
                      value={citySearchInput}
                      onChangeText={(text) => {
                        setCitySearchInput(text);
                        setSelectedCity(text || 'Los Angeles');
                      }}
                      selectTextOnFocus={true}
                      autoCapitalize="words"
                    />
                  </View>

                  {customInterestCount !== null && (
                    <View style={styles.resultContainer}>
                      <Ionicons name="people" size={24} color="#4A90E2" />
                      <Text style={styles.resultText}>
                        {customInterestCount.toLocaleString()} profiles mentioned "{customInterest}" in {selectedCity}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity 
                    style={styles.doneButton}
                    onPress={handleCustomInterestSearch}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Starred Profiles Modal */}
      <Modal
        visible={showStarredModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStarredModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitleSmall}>Starred Profiles</Text>
              <TouchableOpacity onPress={() => setShowStarredModal(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {starredProfiles.length > 0 ? (
                starredProfiles.map((profile) => (
                  <View key={profile.id} style={styles.modalItem}>
                    <View style={styles.modalItemInfo}>
                      <Image source={profile.image} style={styles.starredProfileAvatar} />
                      <View style={styles.starredProfileInfo}>
                        <Text style={styles.modalItemName}>{profile.name}</Text>
                        <Text style={styles.starredProfileLocation}>
                          {profile.spotName} • {profile.sharedInterests} shared interests
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity 
                      onPress={() => {
                        removeStarredProfile(profile.id);
                      }}
                      style={styles.modalRemoveButton}
                    >
                      <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="star-outline" size={48} color="#999" />
                  <Text style={styles.emptyStateText}>No starred profiles yet</Text>
                </View>
              )}
            </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
    backgroundColor: '#fff',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#E8E8E8',
    letterSpacing: -2,
    lineHeight: 72,
  },
  menuButton: {
    position: 'absolute',
    right: 85,
    top: 20,
    padding: 0,
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleSwitch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    position: 'absolute',
    right: 20,
    top: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1001,
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  scrollContent: {
    flex: 1,
  },
  interestsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  interestsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  viewAllButton: {
    paddingRight: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  interestPillsContainer: {
    paddingRight: 20,
  },
  interestPillsColumn: {
    flexDirection: 'column',
    gap: 10,
  },
  interestPillsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  interestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  interestPillSelected: {
    backgroundColor: '#B3D9FF',
    borderColor: '#4A90E2',
  },
  interestEmoji: {
    fontSize: 16,
  },
  interestLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  interestLabelSelected: {
    color: '#000',
    fontWeight: '600',
  },
  aroundMeSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flex: 1,
  },
  aroundMeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  aroundMeSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  profileCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  highlightedInterest: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 500,
  },
  mapBackground: {
    height: 500,
    position: 'relative',
    backgroundColor: '#E8E8E8',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E8E8E8',
    opacity: 0.3,
  },
  streetLabel: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    backgroundColor: 'transparent',
  },
  locationPinContainer: {
    position: 'absolute',
    left: 160,
    top: 220,
    alignItems: 'center',
  },
  locationPin: {
    alignItems: 'center',
  },
  locationPinIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6B8EFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  locationPinEmoji: {
    fontSize: 24,
  },
  locationPinTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#6B8EFF',
    marginTop: -2,
  },
  locationLabel: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  locationLabelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  locationLabelSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  featuredUser: {
    position: 'absolute',
    left: 100,
    top: 330,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#4A90E2',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  featuredUserImage: {
    width: '100%',
    height: '100%',
  },
  mapUser: {
    position: 'absolute',
    alignItems: 'center',
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  zoomControl: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 8,
  },
  discoverySection: {
    flex: 1,
    paddingTop: 20,
  },
  discoveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
  },
  discoveryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginLeft: 12,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  discoveryList: {
    paddingHorizontal: 20,
  },
  discoveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  discoveryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  discoveryItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#E0E0E0',
  },
  discoveryImage: {
    width: '100%',
    height: '100%',
  },
  discoveryItemInfo: {
    flex: 1,
  },
  discoveryItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  discoveryItemCount: {
    fontSize: 14,
    color: '#A2CCF2',
    fontWeight: '500',
    marginBottom: 8,
  },
  discoveryAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discoveryAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  addModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    minHeight: '40%',
    paddingBottom: 40,
  },
  addModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  addModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  addModalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F8F8F8',
  },
  citySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  citySearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
    marginBottom: 20,
  },
  citySearchIcon: {
    marginRight: 8,
  },
  citySearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  cityOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F8F8F8',
  },
  cityOptionSelected: {
    backgroundColor: '#A2CCF2',
    borderColor: '#A2CCF2',
  },
  cityOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  cityOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  resultText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  doneButton: {
    backgroundColor: '#A2CCF2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    width: '100%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitleSmall: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  modalList: {
    paddingHorizontal: 20,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  modalRemoveButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  starredProfileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  starredProfileInfo: {
    flex: 1,
  },
  starredProfileLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

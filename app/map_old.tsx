import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Dimensions
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import BeerSVG from '../assets/images/beer.svg';
import BobaSVG from '../assets/images/boba.svg';
import PlateSVG from '../assets/images/plate.svg';
import { useStarredProfiles } from '../contexts/StarredProfilesContext';
import CoffeeSVG from '../Map/Coffee.svg';

// Types for business places
interface Business {
  id: string;
  name: string;
  type: string;
  emoji: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  rating?: number;
  users: Array<{
    id: number;
    avatar: any;
    name?: string;
  }>;
}

// Sample real-world business data (you can replace with API calls to Google Places, Yelp, etc.)
const sampleBusinesses: Business[] = [
  {
    id: 'starbucks_union_sq',
    name: 'Starbucks',
    type: 'coffee',
    emoji: '☕',
    coordinate: { latitude: 37.7879, longitude: -122.4075 },
    address: '901 Market St, San Francisco, CA',
    rating: 4.2,
    users: [
      { id: 1, avatar: require('../assets/images/profile01.png'), name: 'Sarah' },
      { id: 2, avatar: require('../assets/images/profile2.png'), name: 'Mike' },
      { id: 3, avatar: require('../assets/images/profile01.png'), name: 'Emma' },
    ]
  },
  {
    id: 'chipotle_market',
    name: 'Chipotle Mexican Grill',
    type: 'restaurant',
    emoji: '🌯',
    coordinate: { latitude: 37.7849, longitude: -122.4094 },
    address: '1145 Market St, San Francisco, CA',
    rating: 4.0,
    users: [
      { id: 4, avatar: require('../assets/images/profile2.png'), name: 'Alex' },
      { id: 5, avatar: require('../assets/images/profile01.png'), name: 'Lisa' },
    ]
  },
  {
    id: 'bluebottle_mint',
    name: 'Blue Bottle Coffee',
    type: 'coffee',
    emoji: '☕',
    coordinate: { latitude: 37.7764, longitude: -122.4193 },
    address: '66 Mint St, San Francisco, CA',
    rating: 4.5,
    users: [
      { id: 6, avatar: require('../assets/images/profile01.png'), name: 'Jordan' },
      { id: 7, avatar: require('../assets/images/profile2.png'), name: 'Casey' },
      { id: 8, avatar: require('../assets/images/profile01.png'), name: 'Taylor' },
      { id: 9, avatar: require('../assets/images/profile2.png'), name: 'Morgan' },
    ]
  },
  {
    id: 'gong_cha_market',
    name: 'Gong Cha',
    type: 'boba',
    emoji: '🧋',
    coordinate: { latitude: 37.7875, longitude: -122.4058 },
    address: '833 Market St, San Francisco, CA',
    rating: 4.3,
    users: [
      { id: 10, avatar: require('../assets/images/profile2.png'), name: 'Kevin' },
      { id: 11, avatar: require('../assets/images/profile01.png'), name: 'Anna' },
      { id: 12, avatar: require('../assets/images/profile2.png'), name: 'Chris' },
    ]
  },
  {
    id: 'zeitgeist_valencia',
    name: 'Zeitgeist',
    type: 'bar',
    emoji: '🍺',
    coordinate: { latitude: 37.7648, longitude: -122.4194 },
    address: '199 Valencia St, San Francisco, CA',
    rating: 4.4,
    users: [
      { id: 13, avatar: require('../assets/images/profile01.png'), name: 'Sam' },
      { id: 14, avatar: require('../assets/images/profile2.png'), name: 'Riley' },
    ]
  },
];

export default function MapScreen() {
  const router = useRouter();
  const { starredProfiles, removeStarredProfile } = useStarredProfiles();
  const [searchText, setSearchText] = useState('');
  const [isMapMode, setIsMapMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [favoritedSpots, setFavoritedSpots] = useState<string[]>([]);
  const [showFavoritedModal, setShowFavoritedModal] = useState(false);
  const [showStarredModal, setShowStarredModal] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>(sampleBusinesses);
  const [userLocation, setUserLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    loadFavoritedSpots();
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show nearby businesses');
        return;
      }
      
      setLocationPermission(true);
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const loadFavoritedSpots = async () => {
    try {
      const stored = await AsyncStorage.getItem('favoritedSpots');
      if (stored) {
        setFavoritedSpots(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading favorited spots:', error);
    }
  };

  const saveFavoritedSpots = async (spots: string[]) => {
    try {
      await AsyncStorage.setItem('favoritedSpots', JSON.stringify(spots));
    } catch (error) {
      console.log('Error saving favorited spots:', error);
    }
  };

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchText.toLowerCase()) ||
    business.type.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleFavorite = (businessId: string) => {
    setFavoritedSpots(prev => {
      const newFavorites = prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId];
      
      saveFavoritedSpots(newFavorites);
      return newFavorites;
    });
  };

  const getFavoritedBusinessesList = () => {
    return businesses.filter(business => favoritedSpots.includes(business.id));
  };

  const getBusinessIcon = (type: string, emoji: string) => {
    switch (type) {
      case 'coffee':
        return <CoffeeSVG width={30} height={30} />;
      case 'restaurant':
      case 'food':
        return <PlateSVG width={30} height={30} />;
      case 'bar':
      case 'brewery':
        return <BeerSVG width={30} height={30} />;
      case 'boba':
      case 'bubble_tea':
        return <BobaSVG width={30} height={30} />;
      default:
        return <Text style={styles.emojiIcon}>{emoji}</Text>;
    }
  };

  const renderBusinessMarker = (business: Business) => {
    const isFavorited = favoritedSpots.includes(business.id);
    
    return (
      <Marker
        key={business.id}
        coordinate={business.coordinate}
        onPress={() => toggleFavorite(business.id)}
      >
        <View style={styles.markerContainer}>
          <View style={[styles.markerIcon, isFavorited && styles.markerIconFavorited]}>
            {getBusinessIcon(business.type, business.emoji)}
            {isFavorited && (
              <View style={styles.favoriteIndicator}>
                <Ionicons name="heart" size={10} color="#FF3B30" />
              </View>
            )}
          </View>
          {business.users.length > 0 && (
            <View style={styles.markerUsers}>
              {business.users.slice(0, 3).map((user, index) => (
                <Image
                  key={user.id}
                  source={user.avatar}
                  style={[
                    styles.markerUserAvatar,
                    { 
                      marginLeft: index > 0 ? -6 : 0,
                      zIndex: business.users.length - index
                    }
                  ]}
                />
              ))}
              {business.users.length > 3 && (
                <View style={[styles.markerUserAvatar, styles.moreUsersMarker]}>
                  <Text style={styles.moreUsersMarkerText}>+{business.users.length - 3}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        
        <Callout
          tooltip={false}
          onPress={() => router.push({
            pathname: '/spot-matches',
            params: { 
              spotId: business.id, 
              spotName: business.name,
              spotType: business.type 
            }
          })}
        >
          <View style={styles.calloutContainer}>
            <Text style={styles.calloutTitle}>{business.name}</Text>
            <Text style={styles.calloutAddress}>{business.address}</Text>
            {business.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>⭐ {business.rating}</Text>
              </View>
            )}
            <Text style={styles.calloutUsers}>
              {business.users.length} people love this spot
            </Text>
          </View>
        </Callout>
      </Marker>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MAPS</Text>
        <View style={styles.headerRight}>
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
            thumbColor={isMapMode ? '#fff' : '#fff'}
            ios_backgroundColor="#E5E5E5"
            onValueChange={() => setIsMapMode(!isMapMode)}
            value={isMapMode}
            style={styles.toggleSwitch}
          />
        </View>
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
            <TouchableOpacity style={styles.dropdownItem} onPress={() => { setShowDropdown(false); router.push('/interest-map'); }}>
              <Text style={styles.dropdownText}>Switch to Interest Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
              <Text style={styles.dropdownText}>Update Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
              <Text style={styles.dropdownText}>Edit Profile Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => {
                setShowDropdown(false);
                setShowStarredModal(true);
              }}
            >
              <Text style={styles.dropdownText}>
                Starred {starredProfiles.length > 0 && `(${starredProfiles.length})`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => {
                setShowDropdown(false);
                setShowFavoritedModal(true);
              }}
            >
              <Text style={styles.dropdownText}>
                Favorited {favoritedSpots.length > 0 && `(${favoritedSpots.length})`}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Local Spots Section */}
      <View style={styles.localSpotsSection}>
        <Text style={styles.sectionTitle}>Local Businesses</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search restaurants, cafes, bars..."
              placeholderTextColor="#C7C7CC"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      </View>

      {/* Map Area */}
      {!isMapMode ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={userLocation}
            region={userLocation}
            showsUserLocation={locationPermission}
            showsMyLocationButton={true}
            mapType="standard"
          >
            {filteredBusinesses.map((business) => renderBusinessMarker(business))}
          </MapView>
        </View>
      ) : (
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredBusinesses.map((business) => (
            <TouchableOpacity 
              key={business.id} 
              style={styles.listItem}
              onPress={() => router.push({
                pathname: '/spot-matches',
                params: { 
                  spotId: business.id, 
                  spotName: business.name,
                  spotType: business.type 
                }
              })}
            >
              <View style={styles.listItemIcon}>
                {getBusinessIcon(business.type, business.emoji)}
              </View>
              <View style={styles.listItemContent}>
                <View style={styles.listItemHeader}>
                  <Text style={styles.listItemName}>{business.name}</Text>
                  {business.rating && (
                    <Text style={styles.listItemRating}>⭐ {business.rating}</Text>
                  )}
                </View>
                <Text style={styles.listItemAddress}>{business.address}</Text>
                <View style={styles.listItemUsers}>
                  {business.users.slice(0, 3).map((user, index) => (
                    <Image
                      key={user.id}
                      source={user.avatar}
                      style={[styles.listUserAvatar, { marginLeft: index > 0 ? -6 : 0 }]}
                    />
                  ))}
                  <Text style={styles.listUserCount}>
                    {business.users.length > 3 
                      ? `+${business.users.length - 3} others love this spot`
                      : `${business.users.length} people love this spot`
                    }
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => toggleFavorite(business.id)}
                style={styles.favoriteButton}
              >
                <Ionicons 
                  name={favoritedSpots.includes(business.id) ? "heart" : "heart-outline"} 
                  size={24} 
                  color={favoritedSpots.includes(business.id) ? "#FF3B30" : "#999"} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Favorited Modal */}
      <Modal
        visible={showFavoritedModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFavoritedModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitleSmall}>Favorited Businesses</Text>
              <TouchableOpacity onPress={() => setShowFavoritedModal(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {getFavoritedBusinessesList().length > 0 ? (
                getFavoritedBusinessesList().map((business) => (
                  <View key={business.id} style={styles.modalItem}>
                    <View style={styles.modalItemLeft}>
                      <View style={styles.modalItemIcon}>
                        {getBusinessIcon(business.type, business.emoji)}
                      </View>
                      <View>
                        <Text style={styles.modalItemName}>{business.name}</Text>
                        <Text style={styles.modalItemAddress}>{business.address}</Text>
                      </View>
                    </View>
                    <TouchableOpacity 
                      onPress={() => toggleFavorite(business.id)}
                      style={styles.modalRemoveButton}
                    >
                      <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="heart-outline" size={64} color="#CCC" />
                  <Text style={styles.emptyStateText}>No favorited businesses yet</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
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
            <ScrollView style={styles.modalList}>
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
                  <Ionicons name="star-outline" size={64} color="#CCC" />
                  <Text style={styles.emptyStateText}>No starred profiles yet</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    paddingBottom: 16,
    backgroundColor: '#fff',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#E5E5EA',
    letterSpacing: 2,
    textShadowColor: '#bbb',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: -5,
    marginTop: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 45,
    gap: 15,
  },
  menuButton: {
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
  },
  localSpotsSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8E8E93',
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: 135,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  markerIconFavorited: {
    borderColor: '#FF3B30',
    borderWidth: 3,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  markerUsers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markerUserAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreUsersMarker: {
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreUsersMarkerText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#666',
  },
  emojiIcon: {
    fontSize: 20,
  },
  calloutContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    minWidth: 160,
    maxWidth: 250,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  calloutAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
  },
  calloutUsers: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listItemIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listItemContent: {
    flex: 1,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  listItemRating: {
    fontSize: 12,
    color: '#666',
  },
  listItemAddress: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  listItemUsers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listUserAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  listUserCount: {
    fontSize: 11,
    color: '#666',
    marginLeft: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
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
    maxHeight: '70%',
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
  modalItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalItemIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
  },
  modalItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  modalItemAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
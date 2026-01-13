import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import BeerSVG from '../assets/images/beer.svg';
import BobaSVG from '../assets/images/boba.svg';
import PlateSVG from '../assets/images/plate.svg';
import { useStarredProfiles } from '../contexts/StarredProfilesContext';
import CoffeeSVG from '../Map/Coffee.svg';
import * as Location from 'expo-location';

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

// (styles object moved above MapScreen, see previous replacement)

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

  const filteredSpots = sampleBusinesses.filter(spot => 
    spot.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleFavorite = (spotId: string) => {
    setFavoritedSpots(prev => {
      const newFavorites = prev.includes(spotId) 
        ? prev.filter(id => id !== spotId)
        : [...prev, spotId];
      
      // Save to AsyncStorage
      saveFavoritedSpots(newFavorites);
      
      return newFavorites;
    });
  };

  const getFavoritedSpotsList = () => {
    return sampleBusinesses.filter(spot => favoritedSpots.includes(spot.id));
  };

  const renderSpotOnMap = (spot: typeof sampleBusinesses[0]) => {
    const isFavorited = favoritedSpots.includes(spot.id);
    // Convert lat/lng to approximate x/y coordinates for the static map
    const x = ((spot.coordinate.longitude + 122.4194) * 1000) + 200;
    const y = ((37.7749 - spot.coordinate.latitude) * 1000) + 400;
    
    return (
      <View 
        key={spot.id}
        style={[
          styles.spotContainer, 
          { 
            position: 'absolute',
            left: x - 25, // Offset for centering
            top: y - 90 // Offset for centering and user avatars
          }
        ]}
      >
        {/* Spot icon */}
        <TouchableOpacity 
          style={spot.type === "restaurant" || spot.type === "bar" || spot.type === "boba" || spot.type === "coffee" ? styles.spotIconNoCircle : styles.spotIcon}
          onPress={() => toggleFavorite(spot.id)}
          activeOpacity={0.7}
        >
          {spot.type === "restaurant" ? (
            <PlateSVG width={40} height={40} />
          ) : spot.type === "bar" ? (
            <BeerSVG width={40} height={40} />
          ) : spot.type === "boba" ? (
            <BobaSVG width={40} height={40} />
          ) : spot.type === "coffee" ? (
            <CoffeeSVG width={40} height={40} />
          ) : (
            <Text style={styles.spotIconText}>{spot.emoji}</Text>
          )}
          {isFavorited && (
            <View style={styles.favoriteIndicator}>
              <Ionicons name="heart" size={12} color="#FF3B30" />
            </View>
          )}
        </TouchableOpacity>
        
        {/* Users who love this spot */}
        <TouchableOpacity 
          style={styles.spotUsers}
          onPress={() => router.push({
            pathname: '/spot-matches',
            params: { spotId: spot.id, spotName: spot.name }
          })}
        >
          {spot.users.slice(0, 4).map((user, index) => (
            <Image
              key={user.id}
              source={user.avatar}
              style={[
                styles.userAvatar,
                { 
                  marginLeft: index > 0 ? -8 : 0,
                  zIndex: spot.users.length - index
                }
              ]}
            />
          ))}
          {spot.users.length > 4 && (
            <View style={[styles.userAvatar, styles.moreUsersAvatar]}>
              <Text style={styles.moreUsersText}>+{spot.users.length - 4}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
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
        <Text style={styles.sectionTitle}>Local Spots</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your favorite restaurant"
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
          <ScrollView
            style={styles.mapScrollView}
            contentContainerStyle={styles.mapContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            maximumZoomScale={2}
            minimumZoomScale={0.5}
            bouncesZoom={true}
            scrollEnabled={true}
          >
            <ImageBackground
              source={require('../assets/images/map.png')}
              style={styles.mapBackground}
              resizeMode="contain"
            >
              {/* Render spots on map */}
              {filteredSpots.map((spot) => renderSpotOnMap(spot))}
            </ImageBackground>
          </ScrollView>
        </View>
      ) : (
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredSpots.map((spot) => (
            <View key={spot.id.toString()} style={styles.listItem}>
              <View style={styles.listItemIcon}>
                {spot.icon === "plate" ? (
                  <PlateSVG width={62} height={62} />
                ) : spot.icon === "beer" ? (
                  <BeerSVG width={62} height={62} />
                ) : spot.icon === "boba" ? (
                  <BobaSVG width={72} height={72} />
                ) : spot.icon === "coffee" ? (
                  <CoffeeSVG width={62} height={62} />
                ) : null}
              </View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemName}>{spot.name}</Text>
                <View style={styles.listItemUsers}>
                  {spot.users.slice(0, 3).map((user, index) => (
                    <Image
                      key={user.id}
                      source={user.avatar}
                      style={[styles.listUserAvatar, { marginLeft: index > 0 ? -6 : 0 }]}
                    />
                  ))}
                  {spot.users.length > 3 && (
                    <Text style={styles.listUserCount}>+{spot.users.length - 3} others love this spot</Text>
                  )}
                </View>
              </View>
            </View>
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
              <Text style={styles.modalTitleSmall}>Favorited</Text>
              <TouchableOpacity onPress={() => setShowFavoritedModal(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {getFavoritedSpotsList().length > 0 ? (
                getFavoritedSpotsList().map((spot) => (
                  <View key={spot.id} style={styles.modalItem}>
                    <View style={styles.modalItemLeft}>
                      <View style={styles.modalItemIcon}>
                        {spot.icon === "plate" ? (
                          <PlateSVG width={40} height={40} />
                        ) : spot.icon === "beer" ? (
                          <BeerSVG width={40} height={40} />
                        ) : spot.icon === "boba" ? (
                          <BobaSVG width={46} height={46} />
                        ) : spot.icon === "coffee" ? (
                          <CoffeeSVG width={40} height={40} />
                        ) : null}
                      </View>
                      <Text style={styles.modalItemName}>{spot.name}</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => toggleFavorite(spot.id)}
                      style={styles.modalRemoveButton}
                    >
                      <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="heart-outline" size={64} color="#CCC" />
                  <Text style={styles.emptyStateText}>No favorited establishments yet</Text>
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
          <Ionicons name="person" size={24} color="#999" />
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
  filterButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
  favoritedItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F9F9F9',
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoritedItemText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  mapContainer: {
    flex: 1,
  },
  mapScrollView: {
    flex: 1,
  },
  mapContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBackground: {
    height: 800,
    width: 400,
    position: 'relative',
  },
  spotContainer: {
    alignItems: 'center',
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
  mapSpot: {
    position: 'absolute',
    alignItems: 'center',
  },
  spotIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 8,
  },
  spotIconNoCircle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 0,
  },
  spotIconText: {
    fontSize: 24,
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
  moreUsersAvatar: {
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  moreUsersText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
  spotName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
    width: 40,
    height: 40,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listIconText: {
    fontSize: 20,
  },
  listItemContent: {
    flex: 1,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  listItemUsers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listUserAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
  },
  listUserCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
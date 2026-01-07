import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import BeerSVG from '../assets/images/beer.svg'; // Mock data for spots with users who love them
import BobaSVG from '../assets/images/boba.svg';
import PlateSVG from '../assets/images/plate.svg';
const mockSpots = [
  {
    id: 1,
    name: "Whittier Street",
    type: "bubble_tea",
    icon: "🧋",
    coordinates: { x: 135, y: 380 },
    users: [
      { id: 1, avatar: require('../assets/images/profile01.png') },
      { id: 2, avatar: require('../assets/images/profile2.png') },
      { id: 3, avatar: require('../assets/images/profile01.png') },
      { id: 4, avatar: require('../assets/images/profile2.png') },
    ]
  },
  {
    id: 2,
    name: "Chesapeake Avenue",
    type: "bubble_tea", 
    icon: "🧋",
    coordinates: { x: 200, y: 310 },
    users: [
      { id: 5, avatar: require('../assets/images/profile01.png') },
      { id: 6, avatar: require('../assets/images/profile2.png') },
      { id: 7, avatar: require('../assets/images/profile01.png') },
      { id: 8, avatar: require('../assets/images/profile2.png') },
    ]
  },
  {
    id: 3,
    name: "Dresden Street", 
    type: "beer",
    icon: "beer",
    coordinates: { x: 60, y: 580 },
    users: [
      { id: 9, avatar: require('../assets/images/profile01.png') },
    ]
  },
  {
    id: 4,
    name: "South End",
    type: "restaurant",
    icon: "plate", 
    coordinates: { x: 300, y: 500 },
    users: [
      { id: 10, avatar: require('../assets/images/profile2.png') },
      { id: 11, avatar: require('../assets/images/profile01.png') },
      { id: 12, avatar: require('../assets/images/profile2.png') },
    ]
  },
  {
    id: 5,
    name: "McD",
    type: "fast_food",
    icon: "🍟",
    coordinates: { x: 380, y: 700 },
    users: [
      { id: 13, avatar: require('../assets/images/profile01.png') },
      { id: 14, avatar: require('../assets/images/profile2.png') },
      { id: 15, avatar: require('../assets/images/profile01.png') },
      { id: 16, avatar: require('../assets/images/profile2.png') },
    ]
  },
  {
    id: 6,
    name: "Hoppy Hour",
    type: "beer",
    icon: "beer",
    coordinates: { x: 250, y: 200 },
    users: [
      { id: 17, avatar: require('../assets/images/profile01.png') },
      { id: 18, avatar: require('../assets/images/profile2.png') },
    ]
  },
  {
    id: 7,
    name: "The Local Brewery",
    type: "beer",
    icon: "beer",
    coordinates: { x: 150, y: 650 },
    users: [
      { id: 19, avatar: require('../assets/images/profile01.png') },
    ]
  },
  {
    id: 8,
    name: "Boba Paradise",
    type: "boba",
    icon: "boba",
    coordinates: { x: 180, y: 220 },
    users: [
      { id: 20, avatar: require('../assets/images/profile01.png') },
      { id: 21, avatar: require('../assets/images/profile2.png') },
      { id: 22, avatar: require('../assets/images/profile01.png') },
    ]
  },
  {
    id: 9,
    name: "Tea Time Corner",
    type: "boba",
    icon: "boba",
    coordinates: { x: 90, y: 450 },
    users: [
      { id: 23, avatar: require('../assets/images/profile2.png') },
      { id: 24, avatar: require('../assets/images/profile01.png') },
      { id: 25, avatar: require('../assets/images/profile2.png') },
      { id: 26, avatar: require('../assets/images/profile01.png') },
    ]
  },
  {
    id: 10,
    name: "Bubble Bliss",
    type: "boba",
    icon: "boba",
    coordinates: { x: 250, y: 520 },
    users: [
      { id: 27, avatar: require('../assets/images/profile01.png') },
      { id: 28, avatar: require('../assets/images/profile2.png') },
    ]
  }
];

export default function MapScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [isMapMode, setIsMapMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredSpots = mockSpots.filter(spot => 
    spot.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderSpotOnMap = (spot: typeof mockSpots[0]) => {
    return (
      <View key={spot.id} style={[styles.mapSpot, { left: spot.coordinates.x, top: spot.coordinates.y }]}>
        {/* Spot icon */}
        <View style={spot.icon === "plate" || spot.icon === "beer" || spot.icon === "boba" ? styles.spotIconNoCircle : styles.spotIcon}>
          {spot.icon === "plate" ? (
            <PlateSVG width={68} height={68} />
          ) : spot.icon === "beer" ? (
            <BeerSVG width={68} height={68} />
          ) : spot.icon === "boba" ? (
            <BobaSVG width={68} height={68} />
          ) : (
            <Text style={styles.spotIconText}>{spot.icon}</Text>
          )}
        </View>
        
        {/* Users who love this spot */}
        <View style={styles.spotUsers}>
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
        </View>
        
        {/* Spot name */}
        <Text style={styles.spotName}>{spot.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MAPS</Text>
        <Switch
          trackColor={{ false: '#E5E5E5', true: '#A2CCF2' }}
          thumbColor={isMapMode ? '#fff' : '#fff'}
          ios_backgroundColor="#E5E5E5"
          onValueChange={() => setIsMapMode(!isMapMode)}
          value={isMapMode}
          style={styles.toggleSwitch}
        />
      </View>

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
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Ionicons name="options" size={20} color="#666" />
          </TouchableOpacity>
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
              <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                <Text style={styles.dropdownText}>Switch to Interest Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                <Text style={styles.dropdownText}>Update Location</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                <Text style={styles.dropdownText}>Edit Profile Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                <Text style={styles.dropdownText}>Starred</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                <Text style={styles.dropdownText}>Favorited</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Map Area */}
      {!isMapMode ? (
        <ScrollView style={styles.mapContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.mapBackground}>
            {/* Background map grid */}
            <View style={styles.mapGrid} />
            
            {/* Render spots on map */}
            {filteredSpots.map(renderSpotOnMap)}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredSpots.map((spot) => (
            <View key={spot.id} style={styles.listItem}>
              <View style={styles.listItemIcon}>
                {spot.icon === "plate" ? (
                  <PlateSVG width={62} height={62} />
                ) : spot.icon === "beer" ? (
                  <BeerSVG width={62} height={62} />
                ) : spot.icon === "boba" ? (
                  <BobaSVG width={62} height={62} />
                ) : (
                  <Text style={styles.listIconText}>{spot.icon}</Text>
                )}
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
  toggleSwitch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    position: 'absolute',
    right: 20,
    bottom: 45,
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
    top: 60,
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
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  mapContainer: {
    flex: 1,
  },
  mapBackground: {
    height: 800,
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
  mapSpot: {
    position: 'absolute',
    alignItems: 'center',
  },
  spotIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 35,
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
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
});
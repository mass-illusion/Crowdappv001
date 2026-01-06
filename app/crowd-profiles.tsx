import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock profile data - replace with actual database search results
const mockProfiles = [
  {
    id: 1,
    image: require('../assets/images/profile01.png'),
    starred: true,
    name: 'Emma',
    age: 24
  },
  {
    id: 2,
    image: require('../assets/images/profile2.png'),
    starred: true,
    name: 'Group',
    age: null
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
    starred: false,
    name: 'Sarah & Mia',
    age: null
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    starred: false,
    name: 'Alex',
    age: 26
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    starred: false,
    name: 'Concert Crew',
    age: null
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    starred: false,
    name: 'Maya',
    age: 23
  }
];

const bottomProfiles = [
  { id: 7, image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100' },
  { id: 8, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' },
  { id: 9, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100' },
  { id: 10, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
];

export default function CrowdProfilesScreen() {
  const router = useRouter();
  const [userProfileImage, setUserProfileImage] = React.useState('https://via.placeholder.com/50');
  const [starredProfiles, setStarredProfiles] = React.useState(new Set([1, 2]));

  useFocusEffect(
    React.useCallback(() => {
      const loadProfilePhoto = async () => {
        try {
          const uri = await AsyncStorage.getItem('profilePhoto');
          if (uri) setUserProfileImage(uri);
        } catch (e) {
          console.warn('Failed to load profile photo', e);
        }
      };
      loadProfilePhoto();
    }, [])
  );

  const toggleStar = (profileId: number) => {
    setStarredProfiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(profileId)) {
        newSet.delete(profileId);
      } else {
        newSet.add(profileId);
      }
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNavBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <Ionicons name="notifications" size={28} color="#8E8E93" />
        <Ionicons name="options" size={28} color="#8E8E93" style={styles.settingsIcon} />
        <TouchableOpacity style={styles.profileCircle}>
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.eventTitle}>EDC Las Vegas 2026</Text>
        <Text style={styles.matchesText}>You have 58 matches!</Text>
      </View>

      {/* Profiles Grid */}
      <ScrollView style={styles.profilesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.profilesGrid}>
          {mockProfiles.map((profile) => (
            <TouchableOpacity 
              key={profile.id} 
              style={styles.profileCard}
              onPress={() => router.push(`/profile-detail?profileId=${profile.id}`)}
            >
              <Image source={typeof profile.image === 'string' ? { uri: profile.image } : profile.image} style={styles.profileCardImage} />
              
              {/* Star Button */}
              <TouchableOpacity 
                style={styles.starButton}
                onPress={() => toggleStar(profile.id)}
              >
                <Ionicons 
                  name={starredProfiles.has(profile.id) ? "star" : "star-outline"} 
                  size={18} 
                  color={starredProfiles.has(profile.id) ? "#FFD700" : "#fff"} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Profile Selector */}
      <View style={styles.bottomSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bottomScrollView}>
          {bottomProfiles.map((profile, index) => (
            <TouchableOpacity key={profile.id} style={[styles.bottomProfile, styles.activeBottomProfile]}>
              <Image source={typeof profile.image === 'string' ? { uri: profile.image } : profile.image} style={styles.bottomProfileImage} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavCustom}>
        <TouchableOpacity style={styles.navItemCustom} onPress={() => router.push('/homepage')}>
          <Ionicons name="home-outline" size={28} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <Ionicons name="mic-outline" size={28} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <Ionicons name="map-outline" size={28} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <Ionicons name="chatbubble-outline" size={28} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingsIcon: {
    marginLeft: 0,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  matchesText: {
    fontSize: 18,
    color: '#8E8E93',
    fontWeight: '500',
  },
  profilesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  profileCard: {
    width: '48%',
    aspectRatio: 0.75,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  profileCardImage: {
    width: '100%',
    height: '100%',
  },
  starButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  bottomSelector: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  bottomScrollView: {
    flexGrow: 0,
  },
  bottomProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeBottomProfile: {
    borderColor: '#007AFF',
  },
  bottomProfileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bottomNavCustom: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  navItemCustom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
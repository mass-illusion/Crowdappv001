

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ArtSVG from '../assets/images/art.svg';
import ConventionsSVG from '../assets/images/conventions.svg';
import LionsSVG from '../assets/images/lions.svg';
import MusicSVG from '../assets/images/music2.svg';

const eventCategories = [
  { title: 'Music' },
  { title: 'Sports' },
  { title: 'Conventions' },
  { title: 'Art & Culture' },
];
export default function LiveEventsScreen() {
  const router = useRouter();
  const [userProfileImage, setUserProfileImage] = React.useState('https://via.placeholder.com/50');

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.topNavBar}>
          <View style={{ flex: 1 }} />
          <Ionicons name="notifications" size={28} color="#8E8E93" />
          <Ionicons name="options" size={28} color="#8E8E93" style={styles.settingsIcon} />
          <TouchableOpacity style={styles.profileCircle}>
            <Image
              source={{ uri: userProfileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>EVENTS</Text>
        <View style={[styles.searchBar, { marginTop: 12 }]}>
          <Ionicons name="search" size={24} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Specific Event"
            placeholderTextColor="#C7C7CC"
          />
        </View>
        {/* Event Categories */}
        <View style={styles.grid}>
          {eventCategories.map((cat, idx) => (
            <TouchableOpacity 
              key={cat.title} 
              style={styles.card}
              onPress={() => {
                if (cat.title === 'Music') {
                  router.push('/music-events');
                }
              }}
            >
              <View style={[styles.cardImage, {justifyContent: 'center', alignItems: 'center'}]}>
                {cat.title === 'Sports' ? (
                  <LionsSVG
                    width="100%"
                    height="100%"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                    }}
                    preserveAspectRatio="none"
                  />
                ) : cat.title === 'Music' ? (
                  <MusicSVG
                    width="100%"
                    height="100%"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                    }}
                    preserveAspectRatio="none"
                  />
                ) : cat.title === 'Conventions' ? (
                  <ConventionsSVG
                    width="100%"
                    height="100%"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                    }}
                    preserveAspectRatio="none"
                  />
                ) : cat.title === 'Art & Culture' ? (
                  <ArtSVG
                    width="100%"
                    height="100%"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                    }}
                    preserveAspectRatio="none"
                  />
                ) : (
                  <Ionicons name="image-outline" size={48} color="#bbb" />
                )}
              </View>
              <Text style={styles.cardTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Bottom Navigation (matches homepage) */}
        <View style={styles.bottomNavCustom}>
          <TouchableOpacity style={styles.navItemCustom} onPress={() => {router.replace('/homepage')}}>
            <Ionicons name="home" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemCustom}>
            <Ionicons name="mic" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemCustom}>
            <Ionicons name="map" size={24} color="#999" />
          </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom} onPress={() => router.replace('/messages')}>
          <Ionicons name="chatbubble" size={24} color="#999" />
        </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
    paddingHorizontal: 0,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    gap: 32,
    paddingRight: 8,
  },
  topIcon: {
    marginHorizontal: 4,
  },
  profileWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 8,
  },
  headerText: {
    fontSize: 62,
    fontWeight: 'bold',
    color: '#E5E5EA',
    letterSpacing: 2,
    textShadowColor: '#bbb',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
    marginTop: -18,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 24,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 12,
    textShadowColor: '#222',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
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
    marginBottom: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navIconOutline: {
    width: 32,
    height: 32,
    marginBottom: 0,
    resizeMode: 'contain',
    tintColor: '#222',
  },
  navItemCustom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Removed duplicate 'container' style definition
  navIcon: {
    width: 32,
    height: 32,
    marginBottom: 0,
    resizeMode: 'contain',
    tintColor: '#222',
  },
});

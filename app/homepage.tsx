import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MicrophoneIcon from '../assets/images/Microphone.svg';
import HomeIcon from '../assets/images/home.svg';
import MapIcon from '../assets/images/map.svg';
import MessageIcon from '../assets/images/message.svg';
import SearchIcon from '../assets/images/seacrh.svg';
import Welcome2Button from '../assets/images/welcome2.svg';

const Homepage: React.FC = () => {
  // This would typically come from user context/state
  const [userName, setUserName] = React.useState('');
  const [userProfileImage, setUserProfileImage] = React.useState('https://via.placeholder.com/50');
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const loadProfilePhotoAndName = async () => {
        try {
          const uri = await AsyncStorage.getItem('profilePhoto');
          if (uri) setUserProfileImage(uri);
          const firstName = await AsyncStorage.getItem('firstName');
          if (firstName) setUserName(firstName);
        } catch (e) {
          console.warn('Failed to load profile photo or first name', e);
        }
      };
      loadProfilePhotoAndName();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hi {userName || 'Sabrina'} 👋</Text>
            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.menuIcon}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <View style={styles.notificationIcon}>
                <Text style={styles.bellIcon}>🔔</Text>
                <View style={styles.notificationDot} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/Upload')}>
              <View style={styles.profileWrap}>
                <Image
                  source={{ uri: userProfileImage }}
                  style={styles.profileImage}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Cards */}
        <View style={styles.categoryGrid}>
          <TouchableOpacity style={[styles.categoryCard, styles.liveEventsCard]}>
            <Image
              source={require('../assets/images/liveevent.png')}
              style={styles.categoryImage}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>LIVE EVENTS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.categoryCard, styles.localsCard]}>
            <Image
              source={require('../assets/images/locals.png')}
              style={[styles.categoryImage, styles.localsImage]}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>LOCALS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.categoryCard, styles.circlesCard]}>
            <Image
              source={require('../assets/images/circles2.png')}
              style={styles.categoryImage}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>CIRCLES</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.categoryCard, styles.gamesCard]}>
            <Image
              source={require('../assets/images/games.png')}
              style={styles.categoryImage}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>GAMES</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Welcome Card */}
        <TouchableOpacity style={styles.welcomeCard}>
          <View style={styles.buttonContainer}>
            <Welcome2Button width={360} height={90} />
          </View>
        </TouchableOpacity>

        {/* Feature Sections */}
        <TouchableOpacity style={styles.featureSection}>
          <Image
            source={require('../assets/images/musicfestival.png')}
            style={styles.featureImage}
          />
          <View style={styles.featureOverlay}>
            <Text style={styles.featureTitle}>Music Festivals</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureSection}>
          <Image
            source={require('../assets/images/conventions.png')}
            style={styles.featureImage}
          />
          <View style={styles.featureOverlay}>
            <Text style={styles.featureTitle}>Conventions</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureSection}>
          <Image
            source={require('../assets/images/live.png')}
            style={styles.featureImage}
          />
          <View style={styles.featureOverlay}>
            <Text style={styles.featureTitle}>Live</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavCustom}>
        <TouchableOpacity style={styles.navItemCustom}>
          <HomeIcon width={32} height={32} style={styles.navIconOutline} />
          <Text style={styles.navLabelOutline}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <SearchIcon width={32} height={32} style={styles.navIconOutline} />
          <Text style={styles.navLabelOutline}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <MicrophoneIcon width={32} height={32} style={styles.navIconOutline} />
          <Text style={styles.navLabelOutline}>Speak</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <MapIcon width={32} height={32} style={styles.navIconOutline} />
          <Text style={styles.navLabelOutline}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <MessageIcon width={32} height={32} style={styles.navIconOutline} />
          <Text style={styles.navLabelOutline}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d3d3d3', // light grey
    marginRight: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  // Removed duplicate notificationButton style
  profileButton: {
    marginLeft: 6,
  },
  profileWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImageLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // elevation for Android
    elevation: 3,
  },
  menuIcon: {
    width: 20,
    height: 16,
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#8E8E93',
    marginVertical: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: 12,
  },
  notificationIcon: {
    position: 'relative',
  },
  bellIcon: {
    fontSize: 24,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  categoryCard: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    marginRight: '2%',
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  localsImage: {
    top: 0,
    left: -10,
    width: '105%',
  },
  liveEventsCard: {
    backgroundColor: '#FF6B35',
  },
  localsCard: {
    backgroundColor: '#8B4513',
    marginRight: 0,
  },
  circlesCard: {
    backgroundColor: '#4A90E2',
  },
  gamesCard: {
    backgroundColor: '#F39C12',
    marginRight: 0,
  },
  categoryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingLeft: 0,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 0,
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    marginTop: -18,
    marginLeft: -8,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  welcomeArrow: {
    fontSize: 20,
    color: '#8E8E93',
  },
  featureSection: {
    marginHorizontal: 16,
    marginBottom: 8, // decreased space between banners
    borderRadius: 8, // slightly rounded corners
    overflow: 'hidden',
    height: 150,
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  featureOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  featureTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomNavCustom: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 0,
    paddingBottom: 16,
    paddingHorizontal: 8,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 8, // reduced bottom margin
  },
  navItemCustom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4, // reduce space below icons/labels
  },
  navIconOutline: {
    width: 32,
    height: 32,
    marginBottom: 0,
    resizeMode: 'contain',
    tintColor: '#222',
  },
  navLabelOutline: {
    fontSize: 13,
    color: '#222',
    fontWeight: '400',
    marginTop: 2,
  },


});

export default Homepage;
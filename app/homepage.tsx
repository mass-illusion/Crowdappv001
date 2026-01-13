import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Welcome2SVG from '../assets/images/welcome2.svg';


const Homepage = () => {
  // This would typically come from user context/state
  const [userName, setUserName] = React.useState('');
  const [userProfileImage, setUserProfileImage] = React.useState('https://via.placeholder.com/50');
  const [loadFeatureImages, setLoadFeatureImages] = React.useState(false);

  const navigation = useNavigation();
  // const [activeTab, setActiveTab] = React.useState('home');

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
      
      // Lazy load feature images after a short delay
      const timer = setTimeout(() => {
        setLoadFeatureImages(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }, [])
  );

  // Optimize navigation handler for Live Events
  const handleLiveEventsPress = React.useCallback(() => {
    navigation.navigate('live-events' as never);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hi {userName || 'Sabrina'}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.notificationButton, { marginLeft: 16 }]}> 
              <View style={styles.notificationIcon}>
                <Ionicons name="notifications" size={32} color="#8E8E93" style={styles.bellIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="options" size={28} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('edit-profile' as never)}>
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
          <TouchableOpacity style={[styles.categoryCard, styles.liveEventsCard]} onPress={handleLiveEventsPress}>
            <Image
              source={require('../assets/images/liveevent4.webp')}
              style={styles.categoryImage}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>LIVE EVENTS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, styles.localsCard]}
            onPress={() => navigation.navigate('map' as never)}
          >
            <Image
              source={require('../assets/images/locals1.webp')}
              style={[styles.categoryImage, styles.localsImage]}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>LOCALS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, styles.circlesCard]}
            onPress={() => navigation.navigate('circles' as never)}
          >
            <Image
              source={require('../assets/images/circle4.webp')}
              style={styles.categoryImage}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>CIRCLES</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.categoryCard, styles.gamesCard]}>
            <Image
              source={require('../assets/images/games3.webp')}
              style={[styles.categoryImage, { top: -12 }]}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>GAMES</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Welcome Card */}
        <TouchableOpacity 
          style={styles.welcomeCard}
          onPress={() => navigation.navigate('welcome' as never)}
        >
          <Welcome2SVG width={340} height={85} />
        </TouchableOpacity>

        {/* Feature Sections - Lazy Loaded */}
        {loadFeatureImages && (
          <>
            <TouchableOpacity style={styles.featureSection}>
              <Image
                source={require('../assets/images/musicfestival2.webp')}
                style={styles.featureImage}
              />
              <View style={[styles.featureOverlay, { backgroundColor: 'rgba(0,0,0,0.35)' }]}> 
                <Text style={styles.featureTitle}>Music Festivals</Text>
              </View>
            </TouchableOpacity>

            {/* Sports Banner */}
            <TouchableOpacity style={styles.featureSection}>
              <Image
                source={require('../assets/images/sports3.webp')}
                style={styles.featureImage}
              />
              <View style={styles.featureOverlay}>
                <Text style={styles.featureTitle}>Sports</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureSection}>
              <Image
                source={require('../assets/images/conventions.webp')}
                style={styles.featureImage}
              />
              <View style={styles.featureOverlay}>
                <Text style={styles.featureTitle}>Conventions</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureSection}>
              <Image
                source={require('../assets/images/live3.webp')}
                style={styles.featureImage}
              />
              <View style={styles.featureOverlay}>
                <Text style={styles.featureTitle}>Live</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavCustom}>
        <TouchableOpacity style={styles.navItemCustom}>
          <Ionicons name="home" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom}>
          <Ionicons name="mic" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom} onPress={() => navigation.navigate('map' as never)}>
          <Ionicons name="map" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCustom} onPress={() => navigation.navigate('messages' as never)}>
          <Ionicons name="chatbubble" size={24} color="#999" />
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
  headerLeft: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  notificationIcon: {
    position: 'relative',
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
    paddingBottom: 20, // increased space below header
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C7C7CC',
    marginBottom: -4,
    letterSpacing: 0,
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 3,
  },
  categoryCard: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
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
    left: 0,
    width: '100%',
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
    backgroundColor: '#00C853',
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
    marginHorizontal: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 0,
    borderRadius: 12,
    marginBottom: 12,
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
    marginBottom: 8, // reduced bottom margin
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

  // ...existing code...
});

export default Homepage;

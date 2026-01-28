import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock event data - replace with actual API calls to Ticketmaster/other sources
const mockEvents = [
  {
    id: 1,
    title: "EDC Las Vegas",
    location: "Las Vegas",
    date: "15\nMay",
    attendees: "6,891 joined",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    status: "Going"
  },
  {
    id: 2,
    title: "COACHELLA",
    location: "Coachella Valley",
    date: "10\nApril", 
    attendees: "5,891 joined",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    status: "Going"
  },
  {
    id: 3,
    title: "STAGECOACH",
    location: "Indio",
    date: "25\nJune",
    attendees: "3,247 joined", 
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    status: "Going"
  }
];

const categories = ["Festivals", "Concerts", "Afters"];

export default function MusicEventsScreen() {
  const router = useRouter();
  const [userProfileImage, setUserProfileImage] = React.useState('https://via.placeholder.com/50');
  const [selectedCategory, setSelectedCategory] = React.useState("Festivals");
  const [eventStatuses, setEventStatuses] = React.useState<{ [key: string]: string }>({
    "1": "Interested",
    "2": "Interested", 
    "3": "Interested"
  });
  const [searchQuery, setSearchQuery] = React.useState('');

  const toggleEventStatus = (eventId: number) => {
    setEventStatuses(prev => ({
      ...prev,
      [eventId.toString()]: prev[eventId.toString()] === "Interested" ? "Going" : "Interested"
    }));
  };

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
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNavBar}>
        <View style={{ flex: 1 }} />
        <Ionicons name="notifications" size={28} color="#8E8E93" />
        <Ionicons name="options" size={28} color="#8E8E93" style={styles.settingsIcon} />
        <TouchableOpacity style={styles.profileCircle}>
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity 
            key={category}
            style={[
              styles.categoryPill,
              selectedCategory === category && styles.selectedCategoryPill
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Events Feed */}
      <ScrollView style={styles.eventsContainer} showsVerticalScrollIndicator={false}>
        {mockEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            
            {/* Date Badge */}
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{event.date}</Text>
            </View>

            {/* Event Info Overlay */}
            <View style={styles.eventInfoOverlay}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={16} color="#fff" />
                <Text style={styles.locationText}>{event.location}</Text>
              </View>
              <View style={styles.attendeesRow}>
                <Ionicons name="people" size={16} color="#4A9EFF" />
                <Text style={styles.attendeesText}>{event.attendees}</Text>
              </View>
              
              {/* Bottom row with status and button */}
              <View style={styles.bottomRow}>
                {/* Status Badge with Glass Effect */}
                <TouchableOpacity 
                  style={styles.statusBadgeBottom}
                  onPress={() => toggleEventStatus(event.id)}
                >
                  <View style={[
                    styles.glassContainer,
                    eventStatuses[event.id.toString()] === "Going" && styles.selectedStatusContainer
                  ]}>
                    <Text style={[
                      styles.statusText,
                      eventStatuses[event.id.toString()] === "Going" && styles.selectedStatusText
                    ]}>
                      {eventStatuses[event.id.toString()]}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Find My Crowd Button with Glass Effect */}
                <TouchableOpacity style={styles.findCrowdButton} onPress={() => router.push('/crowd-filter-modal')}>
                  <View style={styles.buttonGlass}>
                    <Text style={styles.buttonText}>Find My Crowd</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

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
        <TouchableOpacity style={styles.navItemCustom} onPress={() => router.push('/messages')}>
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
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  selectedCategoryPill: {
    backgroundColor: '#A2CCF2',
  },
  categoryText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventCard: {
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    backdropFilter: 'blur(10px)',
  },
  selectedStatusContainer: {
    backgroundColor: '#A2CCF2',
  },
  statusText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedStatusText: {
    color: '#fff',
  },
  dateBadge: {
    position: 'absolute',
    bottom: 110,
    right: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
  },
  eventInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  attendeesText: {
    color: '#4A9EFF',
    fontSize: 16,
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadgeBottom: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  findCrowdButton: {
    alignSelf: 'flex-end',
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGlass: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    backdropFilter: 'blur(10px)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
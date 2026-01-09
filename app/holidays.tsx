import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Holiday {
  id: string;
  title: string;
  image: any;
}

interface Group {
  id: string;
  title: string;
  members: number;
  image: any;
}

interface Month {
  id: string;
  title: string;
  isActive?: boolean;
}

const HolidaysScreen = () => {
  const router = useRouter();

  const upcomingHolidays: Holiday[] = [
    {
      id: '1',
      title: 'Christmas',
      image: require('../assets/images/merrychristmas3.webp')
    },
    {
      id: '2',
      title: 'Friendsgiving',
      image: require('../assets/images/thanksgiving.webp')
    },
    {
      id: '3',
      title: 'Halloween',
      image: require('../assets/images/halloweenholiday.webp')
    },
    {
      id: '4',
      title: "New Year's",
      image: require('../assets/images/newyear.webp')
    }
  ];

  const popularGroups: Group[] = [
    {
      id: '1',
      title: 'Christmas Alone in LA',
      members: 432,
      image: require('../assets/images/holidays4.webp')
    },
    {
      id: '2',
      title: 'Friendsgiving NYC',
      members: 215,
      image: require('../assets/images/halloween2s.webp')
    },
    {
      id: '3',
      title: 'Halloween Parties - Austin 😊',
      members: 167,
      image: require('../assets/images/halloween2s.webp')
    },
    {
      id: '4',
      title: 'NYE Meetup - Chicago',
      members: 89,
      image: require('../assets/images/holidays4.webp')
    }
  ];

  const months: Month[] = [
    { id: '1', title: 'January', isActive: true },
    { id: '2', title: 'February' },
    { id: '3', title: 'March' },
    { id: '4', title: 'April' },
    { id: '5', title: 'May' },
    { id: '6', title: 'June' },
    { id: '7', title: 'July' },
    { id: '8', title: 'August' },
    { id: '9', title: 'September' },
    { id: '10', title: 'October' },
    { id: '11', title: 'November' },
    { id: '12', title: 'December' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HOLIDAYS</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search holidays or city"
            placeholderTextColor="#999"
          />
        </View>

        {/* Upcoming Holidays */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Holidays</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All ›</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {upcomingHolidays.map((holiday) => (
              <TouchableOpacity key={holiday.id} style={styles.holidayCard}>
                <Image source={holiday.image} style={styles.holidayImage} />
                <Text style={styles.holidayTitle}>{holiday.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular This Week */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular This Week</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All ›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.groupsGrid}>
            {popularGroups.map((group) => (
              <TouchableOpacity key={group.id} style={styles.groupCard}>
                <Image source={group.image} style={styles.groupImage} />
                <View style={styles.groupOverlay}>
                  <Text style={styles.groupTitle}>{group.title}</Text>
                  <Text style={styles.groupMembers}>{group.members} Members</Text>
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Explore by Month */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore by Month</Text>
          <View style={styles.monthsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthRowScroll}>
              <View style={styles.monthRow}>
                {months.slice(0, 6).map((month) => (
                  <TouchableOpacity 
                    key={month.id} 
                    style={[styles.monthButton, month.isActive && styles.monthButtonActive]}
                  >
                    <Text style={[styles.monthText, month.isActive && styles.monthTextActive]}>
                      {month.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthRowScroll}>
              <View style={styles.monthRow}>
                {months.slice(6, 12).map((month) => (
                  <TouchableOpacity 
                    key={month.id} 
                    style={[styles.monthButton, month.isActive && styles.monthButtonActive]}
                  >
                    <Text style={[styles.monthText, month.isActive && styles.monthTextActive]}>
                      {month.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Create Circle */}
        <View style={styles.createSection}>
          <Text style={styles.createText}>
            Can't find your holiday? Create your own <Text style={styles.createLink}>Circle + 🎉</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#999" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 2,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 25,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginHorizontal: -5,
  },
  holidayCard: {
    alignItems: 'center',
    marginHorizontal: -5,
    width: 170,
  },
  holidayImage: {
    width: 150,
    height: 220,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  holidayTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  groupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  groupCard: {
    width: '48%',
    height: 140,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
  },
  groupImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  groupOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
  },
  groupTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  groupMembers: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  monthsContainer: {
    paddingRight: 20,
    marginTop: 20,
  },
  monthRowScroll: {
    marginBottom: 10,
  },
  monthRow: {
    flexDirection: 'row',
  },
  monthButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  monthButtonActive: {
    backgroundColor: '#007AFF',
  },
  monthText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  monthTextActive: {
    color: '#fff',
  },
  createSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  createText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  createLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HolidaysScreen;
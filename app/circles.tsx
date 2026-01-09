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
  View
} from 'react-native';

const { width } = Dimensions.get('window');

interface Circle {
  id: string;
  title: string;
  subtitle?: string;
  image: any;
  buttonText: string;
}

const CirclesScreen = () => {
  const router = useRouter();
  const [loadActiveCircles, setLoadActiveCircles] = React.useState(false);
  const [loadCategories, setLoadCategories] = React.useState(false);

  // Lazy load below-the-fold content
  React.useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoadActiveCircles(true);
    }, 300);
    
    const timer2 = setTimeout(() => {
      setLoadCategories(true);
    }, 600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const topCircles: Circle[] = [
    {
      id: '1',
      title: 'Adult Disney Lovers',
      image: require('../assets/images/disneyless.png'),
      buttonText: 'Join Now'
    },
    {
      id: '2',
      title: 'Founders',
      subtitle: 'Entrepreneurship',
      image: require('../assets/images/founder2 (1).png'),
      buttonText: 'Join Now'
    },
    {
      id: '3',
      title: 'Outdoor Adventures',
      image: require('../assets/images/outdoors.webp'),
      buttonText: 'Join Now'
    }
  ];

  const activeCircles: Circle[] = [
    {
      id: '4',
      title: 'Halloween 2026',
      image: require('../assets/images/halloween2s.webp'),
      buttonText: 'Join Now'
    },
    {
      id: '5',
      title: 'New Moms',
      image: require('../assets/images/newmom.webp'),
      buttonText: 'Join Now'
    }
  ];

  const categories = [
    {
      id: 'holidays',
      title: 'HOLIDAYS',
      image: require('../assets/images/holidays4.webp'),
      route: '/holidays'
    },
    {
      id: 'business',
      title: 'BUSINESS',
      image: require('../assets/images/business131.webp')
    },
    {
      id: 'fanatics',
      title: 'FANDOM',
      image: require('../assets/images/fandom9.webp')
    },
    {
      id: 'lifephases',
      title: 'LIFE PHASES',
      image: require('../assets/images/lifephase22.webp')
    },
    {
      id: 'hobbies',
      title: 'HOBBIES',
      image: require('../assets/images/hobbies2.webp')
    },
    {
      id: 'lastminute',
      title: 'LAST MINUTE',
      image: require('../assets/images/circle4.webp')
    },
    {
      id: 'career',
      title: 'CAREER',
      image: require('../assets/images/business3.webp')
    },
    {
      id: 'skills',
      title: 'SKILLS',
      image: require('../assets/images/circle4.webp')
    },
    {
      id: 'memes',
      title: 'MEMES',
      image: require('../assets/images/circle4.webp')
    },
    {
      id: 'jammin',
      title: 'JAMMIN',
      image: require('../assets/images/circle4.webp')
    },
    {
      id: 'sports',
      title: 'SPORTS',
      image: require('../assets/images/circle4.webp')
    },
    {
      id: 'trips',
      title: 'TRIPS',
      image: require('../assets/images/circle4.webp')
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CIRCLES</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Groups"
            placeholderTextColor="#999"
          />
        </View>

        {/* Top Circles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top circles</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all ›</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {topCircles.map((circle) => (
              <View key={circle.id} style={styles.circleCard}>
                <Image source={circle.image} style={styles.circleImage} />
                <View style={styles.circleOverlay}>
                  <Text style={styles.circleTitle}>{circle.title}</Text>
                  {circle.subtitle && (
                    <Text style={styles.circleSubtitle}>{circle.subtitle}</Text>
                  )}
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>{circle.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* This Week's Most Active - Lazy Loaded */}
        {loadActiveCircles && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>This week's most active</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all ›</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {activeCircles.map((circle) => (
                <View key={circle.id} style={styles.activeCircleCard}>
                  <Image source={circle.image} style={styles.circleImage} />
                  <View style={styles.circleOverlay}>
                    <Text style={styles.circleTitle}>{circle.title}</Text>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>{circle.buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Explore All Categories - Lazy Loaded */}
        {loadCategories && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Explore all categories</Text>
            </View>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity 
                  key={category.id} 
                  style={styles.categoryCard}
                  onPress={() => {
                    if (category.route) {
                      router.push(category.route as any);
                    }
                  }}
                >
                  <Image source={category.image} style={styles.categoryImage} />
                  <View style={styles.categoryOverlay}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/homepage')}>
          <Ionicons name="home" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="mic" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/map' as any)}>
          <Ionicons name="map" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/messages' as any)}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C7C7CC',
    letterSpacing: 2,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 16,
    color: '#999',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  circleCard: {
    width: width * 0.45,
    height: 220,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  activeCircleCard: {
    width: width * 0.55,
    height: 110,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'transparent',
  },
  circleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  circleTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  circleSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  joinButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryCard: {
    width: '47%',
    height: 220,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 15,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bottomNav: {
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
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CirclesScreen;
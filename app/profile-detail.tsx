import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock profile data - in real app, this would come from API/database
type Profile = {
  id: number;
  name: string;
  image: any;
  description: string;
  lookingFor: string;
  interests: string[];
  photos: any[];
};

const getProfileDetails = (profileId: string) => {
  const profiles: { [key: string]: Profile } = {
    '1': {
      id: 1,
      name: 'Olivia',
      image: require('../assets/images/profile01.png'),
      description: 'Software engineer that loves house music and traveling.',
      lookingFor: 'Girlfriends to carpool and share a room at EDC!',
      interests: ['League of Legends', 'Weight Training', 'Tech House', 'Art Exhibits', 'Raving'],
      photos: [
        require('../assets/images/profile01.png'),
        'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300'
      ]
    },
    '2': {
      id: 2,
      name: 'Group',
      image: require('../assets/images/profile2.png'),
      description: 'Party crew looking for more amazing people to join us.',
      lookingFor: 'New friends to party and explore festivals together!',
      interests: ['Raving', 'Tech House', 'Art Exhibits', 'Weight Training'],
      photos: [
        require('../assets/images/profile2.png'),
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300'
      ]
    },
    // Add more profiles as needed
  };
  
  return profiles[profileId] || profiles['1']; // Default to first profile if not found
};

export default function ProfileDetailScreen() {
  const router = useRouter();
  const { profileId } = useLocalSearchParams();
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  
  const profile = getProfileDetails(profileId as string);
  
  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(prev => 
      prev === 0 ? profile.photos.length - 1 : prev - 1
    );
  };
  
  const handleNextPhoto = () => {
    setCurrentPhotoIndex(prev => 
      prev === profile.photos.length - 1 ? 0 : prev + 1
    );
  };

  const currentPhoto = profile.photos[currentPhotoIndex];

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={typeof currentPhoto === 'string' ? { uri: currentPhoto } : currentPhoto}
          style={styles.profileImage} 
        />
        
        {/* Photo Indicators */}
        <View style={styles.imageIndicator}>
          {profile.photos.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.dot, 
                index === currentPhotoIndex && styles.activeDot
              ]} 
            />
          ))}
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <TouchableOpacity style={styles.starButton}>
            <Ionicons name="star-outline" size={28} color="#FFD700" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description}>{profile.description}</Text>

        <Text style={styles.lookingForTitle}>Looking for:</Text>
        <Text style={styles.lookingForText}>{profile.lookingFor}</Text>

        {/* Shared Interests */}
        <View style={styles.interestTags}>
          {profile.interests.map((interest, index) => {
            const colors = ['#6366F1', '#EF4444', '#F97316', '#10B981', '#06B6D4'];
            return (
              <View 
                key={index}
                style={[styles.tag, { backgroundColor: colors[index % colors.length] }]}
              >
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.interestCount}>{profile.interests.length} interests</Text>
      </View>

      {/* Bottom Navigation Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handlePreviousPhoto}
        >
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => {
            // Navigate to messaging screen or open message composer
            console.log('Open message composer for:', profile.name);
          }}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleNextPhoto}
        >
          <Ionicons name="arrow-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    height: '55%',
    position: 'relative',
    backgroundColor: '#E5E5EA',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  starButton: {
    padding: 4,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  lookingForTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  lookingForText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  interestCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
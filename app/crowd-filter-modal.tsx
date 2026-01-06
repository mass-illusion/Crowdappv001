import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GroupIcon from '../assets/images/Groupicon.svg';

export default function CrowdFilterModal() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');

  const userTypes = [
    { id: 'individual', icon: 'person-outline', label: 'Individual', isIonicon: true },
    { id: 'couple', icon: 'people-outline', label: 'Couple', isIonicon: true },
    { id: 'large-group', icon: 'custom', label: 'Large Group', isIonicon: false }
  ];

  const interests = [
    { id: 'new-friends', label: 'New Friends', color: '#6366F1' },
    { id: 'pre-game', label: 'Pre-game', color: '#EF4444' },
    { id: 'carpool', label: 'Carpool', color: '#F97316' },
    { id: 'afters', label: 'Afters', color: '#10B981' },
    { id: 'meetup', label: 'Meetup', color: '#06B6D4' },
    { id: 'roomies', label: 'Roomies', color: '#8B5CF6' }
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    router.push('/crowd-profiles');
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={24} color="#666" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>I'm</Text>
      </View>

      {/* User Type Selection */}
      <View style={styles.typeSelection}>
        <View style={styles.typeIcons}>
          {userTypes.map((type) => (
            <View key={type.id} style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeIcon,
                  selectedType === type.id && styles.selectedTypeIcon
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                {type.isIonicon ? (
                  <Ionicons 
                    name={type.icon as React.ComponentProps<typeof Ionicons>['name']} 
                    size={32} 
                    color={selectedType === type.id ? '#fff' : '#333'} 
                  />
                ) : (
                  <GroupIcon 
                    width={45} 
                    height={45} 
                    color={selectedType === type.id ? '#fff' : '#333'}
                  />
                )}
              </TouchableOpacity>
              {type.id === 'individual' && (
                <Text style={styles.typeLabel}>Solo</Text>
              )}
              {type.id === 'couple' && (
                <Text style={styles.typeLabel}>Duo</Text>
              )}
              {type.id === 'large-group' && (
                <Text style={styles.typeLabel}>Group</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Looking For Section */}
      <View style={styles.lookingForSection}>
        <Text style={styles.sectionTitle}>Looking for....</Text>
        
        {/* Custom Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="(Optional)"
            placeholderTextColor="#E0E0E0"
            value={customInput}
            onChangeText={setCustomInput}
          />
        </View>

        {/* Interest Pills */}
        <View style={styles.interestsContainer}>
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestPill,
                { backgroundColor: selectedInterests.includes(interest.id) ? interest.color : '#F0F0F0' }
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text style={[
                styles.interestText,
                { color: selectedInterests.includes(interest.id) ? '#fff' : '#666' }
              ]}>
                {interest.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Note */}
        <Text style={styles.footerNote}>
          *Complete your profile to increase compatibility
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#C0C0C0',
    marginBottom: 0,
  },
  typeSelection: {
    marginBottom: 30,
  },
  typeIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  typeContainer: {
    alignItems: 'center',
  },
  typeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTypeIcon: {
    backgroundColor: '#333',
  },
  typeLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontWeight: '500',
  },
  lookingForSection: {
    flex: 1,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#C0C0C0',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 1,
  },
  interestPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footerNote: {
    fontSize: 14,
    color: '#999',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 50,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
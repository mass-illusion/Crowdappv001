import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import GroupIcon from '../assets/images/Groupicon.svg';

export default function CrowdFilterModal() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [editableProfile, setEditableProfile] = useState({
    name: 'Your Name',
    city: 'Your City',
    description: 'Your bio description will appear here. This is how other users will see your profile.',
    lookingFor: 'What you\'re looking for will be displayed here.',
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'
    ]
  });

  const userTypes = [
    { id: 'individual', icon: 'person-outline', label: 'Solo', isIonicon: true },
    { id: 'couple', icon: 'people-outline', label: 'Duo', isIonicon: true },
    { id: 'large-group', icon: 'custom', label: 'Group', isIonicon: false }
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

  const getUserTypeIcon = () => {
    if (!selectedType) return null;
    
    const userType = userTypes.find(type => type.id === selectedType);
    if (!userType) return null;

    if (userType.isIonicon) {
      return <Ionicons name={userType.icon as any} size={20} color="#666" />;
    } else {
      return <GroupIcon width={28} height={28} />;
    }
  };

  const updateProfileField = (field: string, value: string) => {
    setEditableProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldPress = (field: string) => {
    setEditingField(field);
  };

  const handleFieldBlur = () => {
    setEditingField(null);
  };

  const addPhoto = () => {
    // In a real app, this would open image picker
    const newPhotoUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
    setEditableProfile(prev => ({
      ...prev,
      photos: [...prev.photos, newPhotoUrl]
    }));
  };

  const removePhoto = (index: number) => {
    setEditableProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    // Adjust current photo index if needed
    if (index <= currentPhotoIndex && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const onSwipeGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX } = nativeEvent;
      const screenWidth = Dimensions.get('window').width;
      
      if (translationX > screenWidth * 0.3) {
        // Swipe right - previous photo
        setCurrentPhotoIndex(prev => 
          prev > 0 ? prev - 1 : editableProfile.photos.length - 1
        );
      } else if (translationX < -screenWidth * 0.3) {
        // Swipe left - next photo
        setCurrentPhotoIndex(prev => 
          prev < editableProfile.photos.length - 1 ? prev + 1 : 0
        );
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <TouchableOpacity
              key={type.id}
              style={styles.typeContainer}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={[styles.typeIcon, selectedType === type.id && styles.selectedTypeIcon]}>
                {type.isIonicon ? (
                  <Ionicons 
                    name={type.icon as any} 
                    size={24} 
                    color={selectedType === type.id ? "#fff" : "#666"} 
                  />
                ) : (
                  <GroupIcon 
                    width={36} 
                    height={36} 
                  />
                )}
              </View>
              <Text style={styles.typeLabel}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Looking For Section */}
      <View style={styles.lookingForSection}>
        <Text style={styles.sectionTitle}>Looking for</Text>
        
        {/* Custom Input */}
        <TextInput
          style={styles.customInput}
          placeholder="Let us know what you're looking for..."
          value={customInput}
          onChangeText={setCustomInput}
          onSubmitEditing={Keyboard.dismiss}
          multiline
          textAlignVertical="top"
          blurOnSubmit={true}
        />

        {/* Interest Pills */}
        <View style={styles.interestsContainer}>
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestPill,
                { 
                  backgroundColor: selectedInterests.includes(interest.id) 
                    ? interest.color 
                    : '#F0F0F0' 
                }
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

        {/* Edit Profile Link */}
        <TouchableOpacity 
          style={styles.editProfileLink} 
          onPress={() => setShowProfilePreview(true)}
        >
          <Text style={styles.editProfileText}>Profile Preview</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Profile Preview Modal */}
      <Modal
        visible={showProfilePreview}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Profile Preview</Text>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowProfilePreview(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.profileCard}>
              {/* Main Photo with Swipe Functionality */}
              <GestureHandlerRootView style={styles.mainPhotoContainer}>
                <PanGestureHandler onGestureEvent={onSwipeGesture}>
                  <Animated.View style={styles.swipeablePhoto}>
                    <Image 
                      source={{ uri: editableProfile.photos[currentPhotoIndex] }}
                      style={styles.mainProfilePhoto}
                    />
                    
                    {/* Photo Counter */}
                    {editableProfile.photos.length > 1 && (
                      <View style={styles.photoCounter}>
                        <Text style={styles.photoCounterText}>
                          {currentPhotoIndex + 1} / {editableProfile.photos.length}
                        </Text>
                      </View>
                    )}
                    
                    {/* Remove Current Photo Button */}
                    <TouchableOpacity 
                      style={styles.removeCurrentPhotoButton}
                      onPress={() => removePhoto(currentPhotoIndex)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </Animated.View>
                </PanGestureHandler>
              </GestureHandlerRootView>
              
              {/* Photo Thumbnail Strip */}
              <View style={styles.photoThumbnails}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.thumbnailScrollView}
                >
                  {editableProfile.photos.map((photo, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.thumbnailContainer,
                        currentPhotoIndex === index && styles.activeThumbnail
                      ]}
                      onPress={() => setCurrentPhotoIndex(index)}
                    >
                      <Image 
                        source={{ uri: photo }}
                        style={styles.thumbnailPhoto}
                      />
                    </TouchableOpacity>
                  ))}
                  
                  {/* Add Photo Button */}
                  <TouchableOpacity 
                    style={styles.addPhotoThumbnail}
                    onPress={addPhoto}
                  >
                    <Ionicons name="add" size={20} color="#666" />
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View style={styles.profileInfo}>
                {editingField === 'name' ? (
                  <TextInput
                    style={[styles.profileName, styles.editingInput]}
                    value={editableProfile.name}
                    onChangeText={(text) => updateProfileField('name', text)}
                    onBlur={handleFieldBlur}
                    autoFocus
                    selectTextOnFocus
                  />
                ) : (
                  <TouchableOpacity onPress={() => handleFieldPress('name')}>
                    <Text style={styles.profileName}>{editableProfile.name}</Text>
                  </TouchableOpacity>
                )}
                
                <View style={styles.citySection}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  {editingField === 'city' ? (
                    <TextInput
                      style={[styles.cityText, styles.editingInput]}
                      value={editableProfile.city}
                      onChangeText={(text) => updateProfileField('city', text)}
                      onBlur={handleFieldBlur}
                      autoFocus
                      selectTextOnFocus
                    />
                  ) : (
                    <TouchableOpacity onPress={() => handleFieldPress('city')}>
                      <Text style={styles.cityText}>{editableProfile.city}</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                {editingField === 'description' ? (
                  <TextInput
                    style={[styles.description, styles.editingInput, styles.multilineInput]}
                    value={editableProfile.description}
                    onChangeText={(text) => updateProfileField('description', text)}
                    onBlur={handleFieldBlur}
                    multiline
                    autoFocus
                    selectTextOnFocus
                  />
                ) : (
                  <TouchableOpacity onPress={() => handleFieldPress('description')}>
                    <Text style={styles.description}>{editableProfile.description}</Text>
                  </TouchableOpacity>
                )}

                <Text style={styles.lookingForTitle}>Looking for:</Text>
                {editingField === 'lookingFor' ? (
                  <TextInput
                    style={[styles.lookingForText, styles.editingInput]}
                    value={editableProfile.lookingFor}
                    onChangeText={(text) => updateProfileField('lookingFor', text)}
                    onBlur={handleFieldBlur}
                    multiline
                    autoFocus
                    selectTextOnFocus
                  />
                ) : (
                  <TouchableOpacity onPress={() => handleFieldPress('lookingFor')}>
                    <Text style={styles.lookingForText}>{editableProfile.lookingFor}</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              {/* User Type Icon - Bottom Right */}
              {selectedType && (
                <View style={styles.userTypeIconBottomRight}>
                  {getUserTypeIcon()}
                </View>
              )}
            </View>

            <View style={styles.modalFooter}>
              <Text style={styles.modalNote}>
                This is how your profile will appear to other users. Interests will be added automatically based on your selections.
              </Text>
              
              <TouchableOpacity 
                style={styles.doneButton}
                onPress={() => {
                  setShowProfilePreview(false);
                  // Here you would navigate to editable profile screen
                  // router.push('/profile-edit');
                }}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      </View>
    </TouchableWithoutFeedback>
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
    padding: 8,
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#C0C0C0',
    marginBottom: 20,
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 24,
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
  editProfileLink: {
    marginTop: 20,
    marginBottom: 50,
  },
  editProfileText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    textDecorationLine: 'underline',
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  profileImageContainer: {
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    padding: 20,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  citySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cityText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
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
  },
  lookingForText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 40,
  },
  modalNote: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userTypeIconBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  editOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 6,
  },
  editingInput: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  mainPhotoContainer: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  swipeablePhoto: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mainProfilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  photoCounter: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  photoCounterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  removeCurrentPhotoButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,68,68,0.8)',
    padding: 8,
    borderRadius: 20,
  },
  photoThumbnails: {
    marginBottom: 16,
  },
  thumbnailScrollView: {
    flexDirection: 'row',
  },
  thumbnailContainer: {
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  activeThumbnail: {
    borderColor: '#007AFF',
  },
  thumbnailPhoto: {
    width: 50,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  addPhotoThumbnail: {
    width: 50,
    height: 60,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});
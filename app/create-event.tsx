import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SMS from 'expo-sms';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export default function CreateEventScreen() {
  const router = useRouter();
  const { fromChatId, fromChatName, participants: participantsParam } = useLocalSearchParams();
  
  // Parse participants from URL parameter
  const currentChatParticipants = participantsParam ? JSON.parse(decodeURIComponent(participantsParam as string)) : [];
  const currentChatId = fromChatId as string;
  const currentChatName = fromChatName ? decodeURIComponent(fromChatName as string) : 'Chat';
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Set default times - 6:00 PM and 11:00 PM
  const defaultFromTime = new Date();
  defaultFromTime.setHours(18, 0, 0, 0); // 6:00 PM
  const defaultToTime = new Date();
  defaultToTime.setHours(23, 0, 0, 0); // 11:00 PM
  
  const [fromTime, setFromTime] = useState(defaultFromTime);
  const [toTime, setToTime] = useState(defaultToTime);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [category, setCategory] = useState('Pre-game');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [location, setLocation] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [phoneContacts, setPhoneContacts] = useState<any[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [showPhoneContacts, setShowPhoneContacts] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactSearchQuery, setContactSearchQuery] = useState('');

  const categories = [
    'Pre-game',
    'Sports',
    'Music',
    'Food & Drinks',
    'Arts & Culture',
    'Networking',
    'Entertainment',
    'Other'
  ];

  // Mock friends data - replace with actual data from your app
  const mockFriends = [
    { id: '1', name: 'Emma', type: 'friend' },
    { id: '2', name: 'Group', type: 'friend' },
    { id: '3', name: 'Sarah & Mia', type: 'friend' },
    { id: '4', name: 'Alex', type: 'friend' },
    { id: '6', name: 'Maya', type: 'friend' },
  ];

  const formatDate = (date: Date) => {
    try {
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
      return `${dayOfWeek}, ${day} ${month} ${year}`;
    } catch (error) {
      return date.toLocaleDateString();
    }
  };

  const formatDateShort = (date: Date) => {
    try {
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('default', { month: 'short' });
      const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
      return `${dayOfWeek}, ${day} ${month}`;
    } catch (error) {
      return date.toLocaleDateString();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventDate(selectedDate);
      setHasSelectedDate(true);
    }
  };

  const handleFromTimeChange = (event: any, selectedTime?: Date) => {
    setShowFromTimePicker(false);
    if (selectedTime) {
      setFromTime(selectedTime);
    }
  };

  const handleToTimeChange = (event: any, selectedTime?: Date) => {
    setShowToTimePicker(false);
    if (selectedTime) {
      setToTime(selectedTime);
    }
  };

  const handleCreateEvent = async () => {
    if (!eventName.trim()) {
      Alert.alert('Error', 'Please enter an event name');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }

    try {
      // Create event card message
      const eventCardMessage = {
        id: Date.now().toString(),
        text: '',
        sender: 'user' as const,
        timestamp: new Date(),
        eventData: {
          title: eventName,
          date: formatDate(eventDate),
          time: `${formatTime(fromTime)} - ${formatTime(toTime)}`,
          location: location,
          description: eventDetails || 'Meetup before EDC',
          invitedCount: getAllInvitedPeople().length,
          approvals: 3, // Mock initial approvals
          userApproved: false
        }
      };

      // Save event card to the current chat where it was created
      const conversations = await AsyncStorage.getItem('conversations');
      const conversationData = conversations ? JSON.parse(conversations) : {};
      
      let conversationKey;
      if (currentChatId && currentChatId !== '2') {
        // Individual chat
        conversationKey = `conversation_${currentChatId}`;
      } else {
        // Group chat or default
        conversationKey = 'group_main';
      }
      
      if (!conversationData[conversationKey]) {
        conversationData[conversationKey] = [];
      }
      
      conversationData[conversationKey].push(eventCardMessage);

      // Get current group/chat participants (people who are already in this chat)
      const currentParticipantIds = currentChatParticipants.map((p: any) => p.id?.toString() || p.id);
      
      // Get all invited friends from the app
      const invitedAppFriends = invitedFriends.filter(friendId => friendId !== 'user'); // Remove self
      
      // Find friends who are invited but NOT in the current chat
      const friendsNotInCurrentChat = invitedAppFriends.filter(friendId => 
        !currentParticipantIds.includes(friendId.toString())
      );

      // Send event cards to friends who aren't in the current chat via DM
      if (friendsNotInCurrentChat.length > 0) {
        for (const friendId of friendsNotInCurrentChat) {
          const dmConversationKey = `conversation_${friendId}`;
          
          if (!conversationData[dmConversationKey]) {
            conversationData[dmConversationKey] = [];
          }
          
          // Create a copy of the event card for this DM
          const dmEventCard = {
            ...eventCardMessage,
            id: `${Date.now()}_${friendId}`, // Unique ID for each DM
            sender: 'other' as const, // Appears as if sent by the event creator
            senderName: 'Mass_illusion'
          };
          
          conversationData[dmConversationKey].push(dmEventCard);
        }
      }

      // Save all conversation updates
      await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));

      // Create SMS message for contacts (people outside the app)
      const eventMessage = `🎉 You're invited to ${eventName}!\n\n📅 Date: ${formatDate(eventDate)}\n⏰ Time: ${formatTime(fromTime)} - ${formatTime(toTime)}\n📍 Location: ${location}\n\n${eventDetails ? `Details: ${eventDetails}\n\n` : ''}Hope to see you there! 😊`;

      // Send SMS to selected contacts (external people)
      let smsResults = { sent: false, count: 0 };
      if (selectedContacts.length > 0) {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          const phoneNumbers = selectedContacts.map(contact => contact.phone).filter(Boolean);
          
          if (phoneNumbers.length > 0) {
            const { result } = await SMS.sendSMSAsync(phoneNumbers, eventMessage);
            smsResults = { sent: result === 'sent', count: phoneNumbers.length };
          }
        }
      }

      // Navigate back to the chat where the event was created
      if (currentChatId && currentChatName) {
        router.push(`/direct-message?profileName=${encodeURIComponent(currentChatName)}&profileId=${currentChatId}`);
      } else {
        router.back();
      }

    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'There was a problem creating the event. Please try again.');
    }
  };

  const toggleFriendInvite = (personId: string) => {
    // Check if it's a contact
    const contact = [...phoneContacts, ...selectedContacts].find(c => c.id === personId);
    
    if (contact) {
      // Handle contact selection
      setSelectedContacts(prev => {
        const exists = prev.find(c => c.id === personId);
        if (exists) {
          return prev.filter(c => c.id !== personId);
        } else {
          return [...prev, contact];
        }
      });
    } else {
      // Handle friend selection
      setInvitedFriends(prev => 
        prev.includes(personId)
          ? prev.filter(id => id !== personId)
          : [...prev, personId]
      );
    }
  };

  const handleImportContacts = async () => {
    try {
      const Contacts = require('expo-contacts');
      
      const permission = await Contacts.requestPermissionsAsync();
      
      if (permission.status === 'granted') {
        // Close friends modal first, then show contacts modal
        setShowFriendsModal(false);
        
        // Small delay to ensure friends modal closes before opening contacts modal
        setTimeout(() => {
          setLoadingContacts(true);
          setShowPhoneContacts(true);
        }, 100);
        
        // Load contacts in background
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        
        const formattedContacts = data
          .filter((contact: any) => contact.phoneNumbers && contact.phoneNumbers.length > 0)
          .map((contact: any, index: number) => {
            // Get the display name - try multiple name fields
            let displayName = 'Unknown';
            
            if (contact.name) {
              displayName = contact.name;
            } else if (contact.firstName && contact.lastName) {
              displayName = `${contact.firstName} ${contact.lastName}`;
            } else if (contact.firstName) {
              displayName = contact.firstName;
            } else if (contact.lastName) {
              displayName = contact.lastName;
            } else if (contact.displayName) {
              displayName = contact.displayName;
            }
            
            return {
              id: `contact-${index}`,
              name: displayName,
              type: 'contact',
              phone: contact.phoneNumbers?.[0]?.number || '',
            };
          });
        
        setPhoneContacts(formattedContacts);
        setLoadingContacts(false);
        
        if (formattedContacts.length === 0) {
          Alert.alert('No Contacts', 'No contacts with phone numbers found on this device.');
        }
      } else {
        Alert.alert('Permission Denied', 'We need access to your contacts to import them. Please enable this in settings.');
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      Alert.alert('Error', `Failed to load contacts: ${error}`);
      setLoadingContacts(false);
    }
  };

  const handleClosePhoneContacts = () => {
    setShowPhoneContacts(false);
    setLoadingContacts(false);
    setPhoneContacts([]);
    setContactSearchQuery('');
    // Return to friends modal
    setShowFriendsModal(true);
  };

  const handleDonePhoneContacts = () => {
    setShowPhoneContacts(false);
    setLoadingContacts(false);
    setPhoneContacts([]);
    setContactSearchQuery('');
    // Don't return to friends modal, go back to main form
  };

  // Get all invited people (friends + contacts)
  const getAllInvitedPeople = () => {
    const invitedPeople: { id: string; name: string; type: string; phone?: string }[] = [];
    
    // Add app friends
    invitedFriends.forEach(friendId => {
      const friend = mockFriends.find(f => f.id === friendId);
      if (friend) {
        invitedPeople.push({
          id: friend.id,
          name: friend.name,
          type: 'friend'
        });
      }
    });
    
    // Add selected phone contacts
    selectedContacts.forEach(contact => {
      invitedPeople.push({
        id: contact.id,
        name: contact.name,
        type: 'contact',
        phone: contact.phone
      });
    });
    
    return invitedPeople;
  };

  // Filter contacts based on search query
  const getFilteredContacts = () => {
    if (!contactSearchQuery.trim()) {
      return phoneContacts;
    }
    
    return phoneContacts.filter(contact =>
      contact.name.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
      contact.phone.includes(contactSearchQuery)
    );
  };

  const renderFriendItem = ({ item }: { item: { id: string; name: string; type: string; phone?: string } }) => {
    const isSelected = item.type === 'contact' 
      ? selectedContacts.some(c => c.id === item.id)
      : invitedFriends.includes(item.id);
      
    return (
      <TouchableOpacity
        style={styles.friendItem}
        onPress={() => toggleFriendInvite(item.id)}
      >
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendType}>
            {item.type === 'friend' ? '👥 Friend' : item.phone ? `📞 ${item.phone}` : '📞 Contact'}
          </Text>
        </View>
        <View style={[
          styles.checkbox,
          isSelected && styles.checkedBox
        ]}>
          {isSelected && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollContainer}
          onScrollBeginDrag={Keyboard.dismiss}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.form}>
          {/* Event Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Event Name<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              value={eventName}
              onChangeText={setEventName}
              placeholder=""
              placeholderTextColor="#999"
            />
          </View>

          {/* Event Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Event Date<Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.dateTimeInput}
              onPress={() => {
                Keyboard.dismiss();
                setShowFromTimePicker(false);
                setShowToTimePicker(false);
                setShowDatePicker(true);
              }}
            >
              <Text style={[styles.dateTimeText, !hasSelectedDate && styles.placeholderText]}>
                {hasSelectedDate ? formatDateShort(eventDate) : 'Select date'}
              </Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          {/* Event Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Event Time<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.timeRow}>
              <View style={styles.timeGroup}>
                <Text style={styles.timeLabel}>From</Text>
                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => {
                    setShowDatePicker(false);
                    setShowToTimePicker(false);
                    setShowFromTimePicker(true);
                  }}
                >
                  <Text style={styles.timeText}>{formatTime(fromTime)}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeGroup}>
                <Text style={styles.timeLabel}>To</Text>
                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => {
                    setShowDatePicker(false);
                    setShowFromTimePicker(false);
                    setShowToTimePicker(true);
                  }}
                >
                  <Text style={styles.timeText}>{formatTime(toTime)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={styles.categoryText}>{category}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            
            {showCategoryPicker && (
              <View style={styles.categoryDropdown}>
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryOption}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text style={[
                      styles.categoryOptionText,
                      category === cat && styles.selectedCategoryText
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Location<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.locationInput}>
              <TextInput
                style={styles.locationTextInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location..."
                placeholderTextColor="#999"
              />
              <Text style={styles.locationIcon}>📍</Text>
            </View>
          </View>

          {/* Event Details */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Details</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={eventDetails}
              onChangeText={setEventDetails}
              placeholder=""
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Invite Friends */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Invite Friends</Text>
            <TouchableOpacity
              style={styles.inviteFriendsButton}
              onPress={() => setShowFriendsModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.inviteFriendsText}>
                {getAllInvitedPeople().length > 0
                  ? `${getAllInvitedPeople().length} friend(s) invited`
                  : 'Add friends to invite'
                }
              </Text>
              <Text style={styles.inviteFriendsIcon}>👥</Text>
            </TouchableOpacity>
            
            {getAllInvitedPeople().length > 0 && (
              <View style={styles.invitedFriendsList}>
                {getAllInvitedPeople().map(person => (
                  <View key={person.id} style={styles.invitedFriendTag}>
                    <Text style={styles.invitedFriendName}>
                      {person.name}
                      {person.type === 'contact' && (
                        <Text style={styles.contactIndicator}> 📞</Text>
                      )}
                    </Text>
                    <TouchableOpacity
                      onPress={() => toggleFriendInvite(person.id)}
                      style={styles.removeFriendButton}
                      activeOpacity={0.6}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.removeFriendText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Create Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
            <Text style={styles.createButtonText}>Create Event</Text>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Time Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showFromTimePicker && (
        <DateTimePicker
          value={fromTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleFromTimeChange}
        />
      )}

      {showToTimePicker && (
        <DateTimePicker
          value={toTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleToTimeChange}
        />
      )}

      {/* Friends Invitation Modal */}
      <Modal
        visible={showFriendsModal}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowFriendsModal(false)}
              style={styles.modalCloseButton}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Invite Friends</Text>
            <TouchableOpacity
              onPress={() => setShowFriendsModal(false)}
              style={styles.modalDoneButton}
              activeOpacity={0.7}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>
              Select friends and contacts to invite:
            </Text>
            
            <View style={styles.contactsPrompt}>
              <Text style={styles.contactsPromptText}>
                💬 Want to invite contacts from your phone? You can add them directly!
              </Text>
              <TouchableOpacity 
                style={styles.contactsPromptButton}
                onPress={handleImportContacts}
                activeOpacity={0.7}
              >
                <Text style={styles.contactsPromptButtonText}>Import Contacts</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={mockFriends}
              renderItem={renderFriendItem}
              keyExtractor={(item: { id: string; name: string; type: string }) => item.id}
              style={styles.friendsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
      </Modal>

      {/* Phone Contacts Modal */}
      <Modal
        visible={showPhoneContacts}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleClosePhoneContacts}
              style={styles.modalCloseButton}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCloseText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Phone Contacts</Text>
            <TouchableOpacity
              onPress={handleDonePhoneContacts}
              style={styles.modalDoneButton}
              activeOpacity={0.7}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>
              Select contacts to invite:
            </Text>
            
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search contacts..."
                placeholderTextColor="#999"
                value={contactSearchQuery}
                onChangeText={setContactSearchQuery}
              />
            </View>
            
            <FlatList
              data={getFilteredContacts()}
              renderItem={renderFriendItem}
              keyExtractor={(item: any) => item.id}
              style={styles.friendsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  {loadingContacts ? (
                    <>
                      <ActivityIndicator size="large" color="#4A9EFF" />
                      <Text style={styles.emptyText}>Loading contacts...</Text>
                    </>
                  ) : (
                    <Text style={styles.emptyText}>No contacts found</Text>
                  )}
                </View>
              }
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#666',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#FF6B6B',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  dateTimeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
    fontStyle: 'italic',
  },
  calendarIcon: {
    fontSize: 18,
    color: '#4A9EFF',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeGroup: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  categoryDropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#4A9EFF',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    paddingRight: 16,
  },
  locationTextInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  locationIcon: {
    fontSize: 18,
    color: '#4A9EFF',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#4A9EFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#666',
  },
  inviteFriendsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  inviteFriendsText: {
    fontSize: 16,
    color: '#333',
  },
  inviteFriendsIcon: {
    fontSize: 18,
  },
  invitedFriendsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  invitedFriendTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  invitedFriendName: {
    fontSize: 14,
    color: '#1976D2',
    marginRight: 4,
  },
  contactIndicator: {
    fontSize: 12,
    color: '#666',
  },
  removeFriendButton: {
    marginLeft: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeFriendText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalDoneButton: {
    padding: 8,
  },
  modalDoneText: {
    fontSize: 16,
    color: '#4A9EFF',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  contactsPrompt: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  contactsPromptText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 10,
    fontWeight: '500',
  },
  contactsPromptButton: {
    backgroundColor: '#FFC107',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  contactsPromptButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  friendsList: {
    flex: 1,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  friendType: {
    fontSize: 14,
    color: '#666',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#4A9EFF',
    borderColor: '#4A9EFF',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  // Native Date Picker Styles
  datePickerContainer: {
    marginTop: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  datePicker: {
    height: 120,
    width: '100%',
  },
});
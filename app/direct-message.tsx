import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { CUSTOM_MESSAGES } from '../constants/messages';

// Mock profile data for image handling
const mockProfiles = [
  {
    id: 1,
    image: require('../assets/images/profile01.png'),
    name: 'Emma',
  },
  {
    id: 2,
    image: require('../assets/images/profile2.png'),
    name: 'Group',
  },
  {
    id: 3,
    image: require('../assets/images/profile01.png'),
    name: 'Sarah & Mia',
  },
  {
    id: 4,
    image: require('../assets/images/profile2.png'),
    name: 'Alex',
  },
  {
    id: 6,
    image: require('../assets/images/profile01.png'),
    name: 'Maya',
  }
];

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'other' | 'system';
  timestamp: Date;
  senderName?: string;
  imageUri?: string;
  eventData?: {
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    invitedCount: number;
    approvals: number;
    userApproved?: boolean;
    organizer?: string;
  };
};

export default function DirectMessageScreen() {
  const router = useRouter();
  const { profileName, profileId } = useLocalSearchParams();
  // Ensure profileId and profileName are always strings
  const safeProfileId = Array.isArray(profileId) ? profileId[0] : profileId;
  const safeProfileName = Array.isArray(profileName) ? profileName[0] : profileName;
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputText, setInputText] = React.useState('');
  const [isFirstMessage, setIsFirstMessage] = React.useState(true);
  const [isFriend, setIsFriend] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showFriendSelection, setShowFriendSelection] = React.useState(false);
  const [availableFriends, setAvailableFriends] = React.useState<any[]>([]);
  const [selectedFriends, setSelectedFriends] = React.useState<number[]>([]);
  const [conversationParticipants, setConversationParticipants] = React.useState<any[]>([]);
  
  // Add ref for FlatList to control scrolling
  const flatListRef = React.useRef<FlatList>(null);

  // Check if already a friend and load conversation data whenever screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      checkFriendStatus();
      loadConversation();
    }, [profileId])
  );

  const loadConversation = async () => {
    try {
      const conversations = await AsyncStorage.getItem('conversations');
      const conversationData = conversations ? JSON.parse(conversations) : {};
      const conversationKey = `conversation_${safeProfileId}`;
      const groupConversationKey = 'group_main'; // Check for group conversations
      
      let conversation = conversationData[conversationKey];
      
      // If it's a group chat or no direct conversation exists, check for group conversation
      if ((!conversation || conversation.length === 0) && profileName === 'Group') {
        conversation = conversationData[groupConversationKey];
      }
      
      if (conversation && conversation.length > 0) {
        // Parse timestamps back to Date objects
        const parsedMessages = conversation.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
        setIsFirstMessage(false);
      } else {
        // Reset to empty state if no conversation exists
        setMessages([]);
        setIsFirstMessage(true);
      }

      // Load conversation participants
      const participantsData = await AsyncStorage.getItem('conversationParticipants');
      const allParticipants = participantsData ? JSON.parse(participantsData) : {};
      const participants = allParticipants[conversationKey] || [];
      setConversationParticipants(participants);
      
      // Mark any notifications as read when entering the conversation
      const notifications = await AsyncStorage.getItem('conversationNotifications');
      if (notifications) {
        const notificationData = JSON.parse(notifications);
        
        // Mark the specific conversation notification as read
        const specificNotificationKey = `notification_${profileId}_conversation_${profileId}`;
        if (notificationData[specificNotificationKey] && !notificationData[specificNotificationKey].read) {
          notificationData[specificNotificationKey].read = true;
          await AsyncStorage.setItem('conversationNotifications', JSON.stringify(notificationData));
        }
      }
    } catch (error) {
      console.log('Error loading conversation:', error);
      // Reset to default state on error
      setMessages([]);
      setIsFirstMessage(true);
      setConversationParticipants([]);
    }
  };

  const checkFriendStatus = async () => {
    try {
      const friends = await AsyncStorage.getItem('friends');
      const friendsList = friends ? JSON.parse(friends) : [];
      const isAlreadyFriend = friendsList.some((friend: any) => friend.id.toString() === profileId);
      setIsFriend(isAlreadyFriend);
    } catch (error) {
      console.log('Error checking friend status:', error);
    }
  };

  const handleEventApproval = React.useCallback((messageId: string, approved: boolean) => {
    setMessages(prevMessages => 
      prevMessages.map(message => {
        if (message.id === messageId && message.eventData) {
          const updatedEventData = {
            ...message.eventData,
            userApproved: approved,
            approvals: approved && !message.eventData.userApproved 
              ? message.eventData.approvals + 1 
              : !approved && message.eventData.userApproved 
                ? message.eventData.approvals - 1 
                : message.eventData.approvals
          };
          return {
            ...message,
            eventData: updatedEventData
          };
        }
        return message;
      })
    );
  }, []);

  // Track if this is the initial load of messages
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  // Mark initial load as complete after messages are loaded
  React.useEffect(() => {
    if (messages.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [messages.length, isInitialLoad]);

  // Pre-populate with a pleasant intro message only on first visit
  React.useEffect(() => {
    if (isFirstMessage && messages.length === 0) {
      const introMessage = CUSTOM_MESSAGES.UNIVERSAL_INTRO;
      setInputText(introMessage);
    } else if (!isFirstMessage) {
      // Clear the input text after first message is sent
      setInputText('');
    }
  }, [profileName, isFirstMessage, messages.length]);

  const pickImage = async () => {
    try {
      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission required', 'Please allow access to your photo library to share images.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // Send image as message
        const newMessage = {
          id: Date.now().toString(),
          text: '',
          sender: 'user' as const,
          timestamp: new Date(),
          imageUri: result.assets[0].uri,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        // Save to AsyncStorage
        const conversationKey = `conversation_${profileId}`;
        await AsyncStorage.setItem(conversationKey, JSON.stringify(updatedMessages));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        senderName: 'You',
        timestamp: new Date(),
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputText('');
      setIsFirstMessage(false);
      
      // Save to AsyncStorage
      try {
        const conversations = await AsyncStorage.getItem('conversations');
        const conversationData = conversations ? JSON.parse(conversations) : {};
        const conversationKey = `conversation_${profileId}`;
        conversationData[conversationKey] = updatedMessages;
        await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
        
        // Trigger message list update for real-time updates
        await AsyncStorage.setItem('messageUpdateTrigger', Date.now().toString());

        // Also save to group conversations for all participants
        if (conversationParticipants.length > 0) {
          for (const participant of conversationParticipants) {
            const participantKey = `conversation_${participant.id}`;
            conversationData[participantKey] = updatedMessages;
          }
          await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
          
          // Trigger message list update for group conversations too
          await AsyncStorage.setItem('messageUpdateTrigger', Date.now().toString());
          
          // Simulate participant replies after a delay (for demo purposes)
          setTimeout(() => {
            simulateParticipantReply();
          }, 2000 + Math.random() * 3000);
        }
      } catch (error) {
        console.log('Error saving conversation:', error);
      }
    }
  };

  const simulateParticipantReply = async () => {
    if (conversationParticipants.length === 0) return;
    
    const replies = [
      "That sounds great! Count me in 🎉",
      "I'm interested! What time?",
      "Love this idea! When are we meeting?",
      "Perfect! I'll be there 👍",
      "Awesome! Can't wait to join you all",
      "This is going to be fun! 🎵"
    ];
    
    const randomParticipant = conversationParticipants[Math.floor(Math.random() * conversationParticipants.length)];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    const participantMessage: Message = {
      id: Date.now().toString(),
      text: randomReply,
      sender: 'other',
      senderName: randomParticipant.name,
      timestamp: new Date(),
    };
    
    try {
      const conversations = await AsyncStorage.getItem('conversations');
      const conversationData = conversations ? JSON.parse(conversations) : {};
      const conversationKey = `conversation_${profileId}`;
      const currentMessages = conversationData[conversationKey] || [];
      const updatedMessages = [...currentMessages, participantMessage];
      
      // Update messages for all participants
      conversationData[conversationKey] = updatedMessages;
      for (const participant of conversationParticipants) {
        const participantKey = `conversation_${participant.id}`;
        conversationData[participantKey] = updatedMessages;
      }
      
      await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
      
      // Trigger message list update for participant replies\n      await AsyncStorage.setItem('messageUpdateTrigger', Date.now().toString());\n      
      // Update local state if still on this screen
      setMessages(updatedMessages);
    } catch (error) {
      console.log('Error adding participant reply:', error);
    }
  };

  const addFriend = async () => {
    try {
      const friends = await AsyncStorage.getItem('friends');
      const friendsList = friends ? JSON.parse(friends) : [];
      
      if (!isFriend) {
        // Find the profile data to get the correct image
        const profileData = mockProfiles.find(p => p.id.toString() === profileId);
        
        // Add friend with proper image handling
        const newFriend = {
          id: parseInt(profileId as string),
          name: profileName,
          image: profileData ? profileData.image : 'https://via.placeholder.com/100',
          isLocalImage: profileData && typeof profileData.image !== 'string'
        };
        friendsList.push(newFriend);
        await AsyncStorage.setItem('friends', JSON.stringify(friendsList));
        setIsFriend(true);
        Alert.alert('Friend Added', `${profileName} has been added to your friends!`);
      } else {
        // Remove friend
        const updatedFriends = friendsList.filter((friend: any) => friend.id.toString() !== profileId);
        await AsyncStorage.setItem('friends', JSON.stringify(updatedFriends));
        setIsFriend(false);
        Alert.alert('Friend Removed', `${profileName} has been removed from your friends.`);
      }
    } catch (error) {
      console.log('Error managing friend:', error);
      Alert.alert('Error', 'Could not update friend status.');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddFriendsToConversation = async () => {
    setShowDropdown(false);
    try {
      const friends = await AsyncStorage.getItem('friends');
      const friendsList = friends ? JSON.parse(friends) : [];
      
      // Get current participant IDs to filter them out
      const participantIds = conversationParticipants.map(p => p.id.toString());
      
      // Filter out the current conversation participant and already added participants
      const available = friendsList.filter((friend: any) => 
        friend.id.toString() !== profileId && !participantIds.includes(friend.id.toString())
      );
      
      if (available.length === 0) {
        Alert.alert('No Available Friends', 'All your friends are already in this conversation or you have no friends to add.');
        return;
      }
      
      setAvailableFriends(available);
      setSelectedFriends([]);
      setShowFriendSelection(true);
    } catch (error) {
      console.log('Error loading friends:', error);
      Alert.alert('Error', 'Could not load friends list.');
    }
  };

  const handleCreateEvent = () => {
    setShowDropdown(false);
    // Pass current chat context to create-event screen
    router.push(`/create-event?fromChatId=${safeProfileId}&fromChatName=${encodeURIComponent(safeProfileName || '')}&participants=${encodeURIComponent(JSON.stringify(conversationParticipants))}`);
  };

  const handleStartGame = () => {
    setShowDropdown(false);
    Alert.alert('Start a Game', 'Start a game feature coming soon!');
  };

  const handleRenameMessage = () => {
    setShowDropdown(false);
    Alert.alert('Rename Message', 'Rename conversation feature coming soon!');
  };

  const handleUnfriend = async () => {
    setShowDropdown(false);
    Alert.alert(
      'Delete Message',
      `Are you sure you want to delete this conversation with ${profileName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove conversation data
              const conversations = await AsyncStorage.getItem('conversations');
              let conversationData = conversations ? JSON.parse(conversations) : {};
              const conversationKey = `conversation_${profileId}`;
              delete conversationData[conversationKey];
              
              // Also remove conversation data for all participants
              if (conversationParticipants.length > 0) {
                for (const participant of conversationParticipants) {
                  const participantKey = `conversation_${participant.id}`;
                  delete conversationData[participantKey];
                }
              }
              await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
              
              // Remove participants data
              const participantsData = await AsyncStorage.getItem('conversationParticipants');
              let allParticipants = participantsData ? JSON.parse(participantsData) : {};
              delete allParticipants[conversationKey];
              await AsyncStorage.setItem('conversationParticipants', JSON.stringify(allParticipants));
              
              // Remove related notifications
              const notifications = await AsyncStorage.getItem('conversationNotifications');
              if (notifications) {
                let notificationData = JSON.parse(notifications);
                Object.keys(notificationData).forEach(key => {
                  if (key.includes(`_conversation_${profileId}`) || key.includes(`notification_${profileId}_`)) {
                    delete notificationData[key];
                  }
                });
                await AsyncStorage.setItem('conversationNotifications', JSON.stringify(notificationData));
              }
              
              // Clear local state
              setMessages([]);
              setConversationParticipants([]);
              setIsFirstMessage(true);
              
              // Navigate back to messages list
              router.back();
            } catch (error) {
              console.log('Error deleting message:', error);
            }
          }
        }
      ]
    );
  };

  const handleBlock = () => {
    setShowDropdown(false);
    Alert.alert(
      'Block User',
      `Are you sure you want to block ${profileName}? This will remove them from your friends and prevent future messages.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Block', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Blocked', `${profileName} has been blocked`);
            // In a real app, you would handle blocking logic here
          }
        }
      ]
    );
  };

  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const addSelectedFriendsToConversation = async () => {
    if (selectedFriends.length === 0) {
      Alert.alert('No Selection', 'Please select at least one friend to add.');
      return;
    }
    
    try {
      // Double-check to ensure no duplicates (additional safety measure)
      const participantIds = conversationParticipants.map(p => p.id);
      const newParticipants = availableFriends.filter(friend => 
        selectedFriends.includes(friend.id) && !participantIds.includes(friend.id)
      );
      
      if (newParticipants.length === 0) {
        Alert.alert('Already Added', 'The selected friends are already in this conversation.');
        setShowFriendSelection(false);
        return;
      }
      
      const updatedParticipants = [...conversationParticipants, ...newParticipants];
      setConversationParticipants(updatedParticipants);
      
      // Save participants to AsyncStorage
      const participantsData = await AsyncStorage.getItem('conversationParticipants');
      const allParticipants = participantsData ? JSON.parse(participantsData) : {};
      const conversationKey = `conversation_${profileId}`;
      allParticipants[conversationKey] = updatedParticipants;
      await AsyncStorage.setItem('conversationParticipants', JSON.stringify(allParticipants));
      
      // Share existing messages with new participants
      if (messages.length > 0) {
        const conversations = await AsyncStorage.getItem('conversations');
        const conversationData = conversations ? JSON.parse(conversations) : {};
        
        for (const participant of newParticipants) {
          const participantKey = `conversation_${participant.id}`;
          conversationData[participantKey] = messages;
        }
        await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
      }
      
      // Add system message to conversation (only in the current conversation)
      const selectedNames = newParticipants.map(friend => friend.name).join(', ');
      const systemMessage: Message = {
        id: Date.now().toString(),
        text: `${selectedNames} ${newParticipants.length === 1 ? 'has' : 'have'} been added to the conversation`,
        sender: 'system',
        senderName: 'System',
        timestamp: new Date(),
      };
      
      const updatedMessages = [...messages, systemMessage];
      setMessages(updatedMessages);
      
      // Save updated messages with system message (only to current conversation)
      const conversations2 = await AsyncStorage.getItem('conversations');
      const conversationData2 = conversations2 ? JSON.parse(conversations2) : {};
      conversationData2[conversationKey] = updatedMessages;
      await AsyncStorage.setItem('conversations', JSON.stringify(conversationData2));
      
      // Create notification indicators for new participants
      const notifications = await AsyncStorage.getItem('conversationNotifications');
      const notificationData = notifications ? JSON.parse(notifications) : {};
      
      for (const participant of newParticipants) {
        // Create a specific notification for this conversation only
        const participantNotificationKey = `notification_${participant.id}_conversation_${profileId}`;
        notificationData[participantNotificationKey] = {
          type: 'group_added',
          conversationId: profileId,
          conversationName: profileName,
          timestamp: new Date().toISOString(),
          read: false
        };
      }
      await AsyncStorage.setItem('conversationNotifications', JSON.stringify(notificationData));
      
      setShowFriendSelection(false);
    } catch (error) {
      console.log('Error adding participants:', error);
      Alert.alert('Error', 'Could not add friends to conversation.');
    }
  };

  const formatTime = React.useCallback((date: Date) => {
    try {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'now';
    }
  }, []);

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.sender === 'system') {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{item.text}</Text>
          <Text style={styles.systemMessageTime}>{formatTime(item.timestamp)}</Text>
        </View>
      );
    }

    // Render event message if message has event data
    if (item.eventData) {
      const eventText = `📅 ${item.eventData.date}\n⏰ ${item.eventData.time}\n📍 ${item.eventData.location}${item.eventData.description ? `\n${item.eventData.description}` : ''}`;
      
      // Mock attending friends for display (in real app, this would come from event data)
      const attendingFriends = [
        { id: 1, image: require('../assets/images/profile01.png') },
        { id: 2, image: require('../assets/images/profile2.png') },
        { id: 3, image: require('../assets/images/profile01.png') },
      ].slice(0, item.eventData.approvals);
      
      return (
        <View style={[
          styles.messageContainer,
          styles.eventMessage
        ]}>
          <Text style={styles.eventSenderName}>{item.eventData.organizer || item.senderName || 'Someone'} proposed a meetup</Text>
          <Text style={styles.eventTitleBold}>🎉 {item.eventData.title}</Text>
          <Text style={styles.eventMessageText}>
            {eventText}
          </Text>
          
          {/* Attendee avatars */}
          <View style={styles.attendeeSection}>
            <View style={styles.attendeeAvatars}>
              {attendingFriends.map((friend, index) => (
                <Image 
                  key={friend.id}
                  source={friend.image}
                  style={[styles.attendeeAvatar, { marginLeft: index > 0 ? -8 : 0, zIndex: attendingFriends.length - index }]}
                />
              ))}
              {item.eventData.approvals > 3 && (
                <View style={[styles.attendeeAvatar, styles.moreAttendeesAvatar, { marginLeft: -8, zIndex: 1 }]}>
                  <Text style={styles.moreAttendeesText}>+{item.eventData.approvals - 3}</Text>
                </View>
              )}
            </View>
            <Text style={styles.attendeeCount}>{item.eventData.approvals} attending • {item.eventData.invitedCount} invited</Text>
          </View>
          <View style={styles.eventActions}>
            <TouchableOpacity 
              style={styles.eventActionButton}
              onPress={() => handleEventApproval(item.id, true)}
            >
              <Text style={styles.eventActionText}>✓ Going</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.eventActionButton, styles.eventDeclineAction]}
              onPress={() => handleEventApproval(item.id, false)}
            >
              <Text style={[styles.eventActionText, styles.eventDeclineText]}>✗ No</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.timestamp}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      );
    }
    
    // Render image message if message has imageUri
    if (item.imageUri) {
      return (
        <View style={[
          styles.messageContainer,
          item.sender === 'user' ? styles.userMessage : styles.otherMessage
        ]}>
          {conversationParticipants.length > 0 && item.sender !== 'user' && item.senderName && (
            <Text style={styles.senderName}>{item.senderName}</Text>
          )}
          <Image source={{ uri: item.imageUri }} style={styles.messageImage} />
          <Text style={[
            styles.timestamp,
            item.sender === 'user' ? styles.userTimestamp : styles.otherTimestamp
          ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      );
    }
    
    return (
      <View style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.otherMessage
      ]}>
        {conversationParticipants.length > 0 && item.sender !== 'user' && item.senderName && (
          <Text style={styles.senderName}>{item.senderName}</Text>
        )}
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.otherMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp,
          item.sender === 'user' ? styles.userTimestamp : styles.otherTimestamp
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
        <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{profileName || 'Unknown'}</Text>
          {conversationParticipants.length > 0 && (
            <View style={styles.participantsContainer}>
              {conversationParticipants.slice(0, 3).map((participant, index) => {
                // Create a stable unique key without timestamp
                const uniqueKey = `conv-${profileId}-participant-${participant.id || participant.name}-${index}`;
                return (
                  <Image
                    key={uniqueKey}
                    source={participant.image}
                    style={[styles.participantAvatar, { marginLeft: index > 0 ? -8 : 0 }]}
                  />
                );
              })}
              {conversationParticipants.length > 3 && (
                <View key={`conv-${profileId}-more-participants`} style={[styles.participantAvatar, styles.moreParticipants]}>
                  <Text style={styles.moreParticipantsText}>+{conversationParticipants.length - 3}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.friendButton} onPress={addFriend}>
          <Ionicons 
            name={isFriend ? "person" : "person-add"} 
            size={24} 
            color={isFriend ? "#A2CCF2" : "#999"} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton} onPress={toggleDropdown}>
          <Ionicons name="ellipsis-vertical" size={24} color="#666" />
        </TouchableOpacity>
        
        {/* Dropdown Menu */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleAddFriendsToConversation}>
              <Ionicons name="person-add" size={18} color="#333" />
              <Text style={styles.dropdownText}>Add friends to conversation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleCreateEvent}>
              <Ionicons name="calendar" size={18} color="#333" />
              <Text style={styles.dropdownText}>Create an event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleStartGame}>
              <Ionicons name="game-controller" size={18} color="#333" />
              <Text style={styles.dropdownText}>Start a game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleUnfriend}>
              <Ionicons name="trash" size={18} color="#ff6b6b" />
              <Text style={[styles.dropdownText, { color: '#ff6b6b' }]}>Delete message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleBlock}>
              <Ionicons name="ban" size={18} color="#ff4444" />
              <Text style={[styles.dropdownText, { color: '#ff4444' }]}>Block</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Messages */}
      {messages.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={[styles.messagesContent, { paddingBottom: 80 }]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={500}
          initialNumToRender={3}
          windowSize={1}
          scrollEventThrottle={64}
          decelerationRate="fast"
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubble-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>Start the conversation!</Text>
          <Text style={styles.emptySubtitle}>
            Send a message to connect with {profileName} at the event
          </Text>
        </View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachButton} onPress={pickImage}>
            <Ionicons name="add" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={[styles.textInput, isFirstMessage && styles.textInputHighlighted]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            multiline
            maxLength={500}
            selectTextOnFocus={isFirstMessage}
          />
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? "#fff" : "#999"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      
      {/* Friend Selection Modal */}
      <Modal
        visible={showFriendSelection}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFriendSelection(false)}>
              <Text style={styles.modalCancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Friends</Text>
            <TouchableOpacity onPress={addSelectedFriendsToConversation}>
              <Text style={styles.modalDoneButton}>Add ({selectedFriends.length})</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={availableFriends}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.friendItem}
                onPress={() => toggleFriendSelection(item.id)}
              >
                <Image 
                  source={item.isLocalImage ? item.image : { uri: item.image }}
                  style={styles.friendAvatar}
                />
                <Text style={styles.friendName}>{item.name}</Text>
                <View style={styles.checkboxContainer}>
                  {selectedFriends.includes(item.id) && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </View>
              </TouchableOpacity>
            )}
            removeClippedSubviews={true}
            maxToRenderPerBatch={8}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={8}
            ListEmptyComponent={
              <View style={styles.emptyFriends}>
                <Text style={styles.emptyFriendsText}>No friends available to add</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 8,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  friendButton: {
    padding: 8,
    marginRight: 4,
  },
  moreButton: {
    padding: 12,
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalCancelButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  // Removed duplicate modalTitle style (fontSize: 18)
  modalDoneButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFriends: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyFriendsText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  messagesList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherTimestamp: {
    color: '#999',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  textInputHighlighted: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#007AFF',
  },
  // Image message styles
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  participantAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  moreParticipants: {
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreParticipantsText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
    textAlign: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  systemMessageTime: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 4,
  },
  // Lightweight Event Message Styles
  eventMessage: {
    backgroundColor: '#F0F8FF',
    alignSelf: 'flex-start',
    maxWidth: '85%',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventSenderName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 6,
  },
  eventTitleBold: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventMessageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  eventActions: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  eventActionButton: {
    backgroundColor: '#4A9EFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  eventDeclineAction: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  eventActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  eventDeclineText: {
    color: '#666',
  },
  attendeeSection: {
    marginTop: 8,
  },
  attendeeAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  attendeeAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreAttendeesAvatar: {
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAttendeesText: {
    fontSize: 8,
    color: '#666',
    fontWeight: '500',
  },
  attendeeCount: {
    fontSize: 11,
    color: '#999',
  },
// Modal styles
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});
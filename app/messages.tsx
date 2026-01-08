import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

// Mock profile data to get correct images
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
  id: number;
  name: string;
  image: any;
  lastMessage: string;
  timestamp: string;
  rawTimestamp?: Date;
  unread: boolean;
  isLocalImage?: boolean;
  participants?: any[];
};

export default function MessagesScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFriendSelection, setShowFriendSelection] = useState(false);
  const [availableFriends, setAvailableFriends] = useState<any[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [addedFriends, setAddedFriends] = useState<any[]>([]);

  // Load friends and create mock messages
  useFocusEffect(
    useCallback(() => {
      loadMessages();
    }, [])
  );

  // Add real-time polling for messages when screen is focused
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let lastTrigger = '';
    
    const checkForUpdates = async () => {
      try {
        const trigger = await AsyncStorage.getItem('messageUpdateTrigger');
        if (trigger && trigger !== lastTrigger) {
          lastTrigger = trigger;
          loadMessages();
        }
      } catch (error) {
        console.log('Error checking message updates:', error);
      }
    };
    
    // Check for updates every 1 second for better real-time feel
    interval = setInterval(checkForUpdates, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const loadMessages = async () => {
    try {
      const friends = await AsyncStorage.getItem('friends');
      let friendsList = friends ? JSON.parse(friends) : [];
      
      // Remove Concert Crew (id: 5) from friends list
      friendsList = friendsList.filter((friend: any) => friend.id !== 5);
      
      // Update friends list without Concert Crew
      await AsyncStorage.setItem('friends', JSON.stringify(friendsList));
      
      // Get actual conversation data
      const conversations = await AsyncStorage.getItem('conversations');
      let conversationData = conversations ? JSON.parse(conversations) : {};
      
      // Remove Concert Crew conversation
      delete conversationData['conversation_5'];
      await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
      
      // Get conversation participants
      const participantsData = await AsyncStorage.getItem('conversationParticipants');
      let allParticipants = participantsData ? JSON.parse(participantsData) : {};
      
      // Remove Concert Crew participants
      delete allParticipants['conversation_5'];
      await AsyncStorage.setItem('conversationParticipants', JSON.stringify(allParticipants));
      
      const messagesList: Message[] = [];
      const processedConversations = new Set(); // Track processed conversations to avoid duplicates
      
      // First, process conversations from friends list
      for (const friend of friendsList) {
        const conversationKey = `conversation_${friend.id}`;
        
        // Skip if we've already processed this conversation
        if (processedConversations.has(conversationKey)) {
          continue;
        }
        
        const conversation = conversationData[conversationKey];
        const participants = allParticipants[conversationKey] || [];
        
        if (conversation && conversation.length > 0) {
          const lastMessage = conversation[conversation.length - 1];
          const timestamp = new Date(lastMessage.timestamp);
          
          // Check for notifications specific to this conversation (group additions)
          const notifications = await AsyncStorage.getItem('conversationNotifications');
          const notificationData = notifications ? JSON.parse(notifications) : {};
          
          // Check if this specific conversation has an unread group addition notification
          const specificNotificationKey = `notification_${friend.id}_conversation_${friend.id}`;
          const hasNotification = notificationData[specificNotificationKey] && !notificationData[specificNotificationKey].read;
          
          // Check for regular unread messages
          const hasUnreadMessage = lastMessage.sender === 'other' && !lastMessage.read;
          
          messagesList.push({
            id: friend.id,
            name: friend.name,
            image: friend.image,
            lastMessage: lastMessage.text,
            timestamp: formatTimestamp(timestamp),
            rawTimestamp: timestamp, // Keep raw timestamp for sorting
            unread: hasUnreadMessage || hasNotification,
            isLocalImage: friend.isLocalImage,
            participants: participants
          });
          
          // Mark this conversation as processed
          processedConversations.add(conversationKey);
        }
      }
      
      // Also check for any conversations that might exist without corresponding friends
      // This handles cases where conversations were created from interest-map or map
      Object.keys(conversationData).forEach(conversationKey => {
        if (conversationKey.startsWith('conversation_') && !processedConversations.has(conversationKey)) {
          const conversation = conversationData[conversationKey];
          if (conversation && conversation.length > 0) {
            const profileId = parseInt(conversationKey.replace('conversation_', ''));
            const lastMessage = conversation[conversation.length - 1];
            const timestamp = new Date(lastMessage.timestamp);
            
            // Try to find friend info, or create a placeholder
            const friendInfo = friendsList.find((f: any) => f.id === profileId);
            const participants = allParticipants[conversationKey] || [];
            
            if (friendInfo) {
              const hasUnreadMessage = lastMessage.sender === 'other' && !lastMessage.read;
              
              messagesList.push({
                id: friendInfo.id,
                name: friendInfo.name,
                image: friendInfo.image,
                lastMessage: lastMessage.text,
                timestamp: formatTimestamp(timestamp),
                rawTimestamp: timestamp, // Keep raw timestamp for sorting
                unread: hasUnreadMessage,
                isLocalImage: friendInfo.isLocalImage,
                participants: participants
              });
            }
          }
        }
      });
      
      // Sort by most recent message timestamp
      messagesList.sort((a, b) => {
        const timeA = a.rawTimestamp ? new Date(a.rawTimestamp).getTime() : 0;
        const timeB = b.rawTimestamp ? new Date(b.rawTimestamp).getTime() : 0;
        
        // Sort by descending order (most recent first)
        return timeB - timeA;
      });

      setMessages(messagesList);
    } catch (error) {
      console.log('Error loading messages:', error);
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) {
      return 'now';
    } else if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
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
      setAvailableFriends(friendsList);
      setSelectedFriends([]);
      setShowFriendSelection(true);
    } catch (error) {
      console.log('Error loading friends:', error);
    }
  };

  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const createGroupConversation = () => {
    if (selectedFriends.length === 0) {
      return;
    }
    
    const selectedFriendObjects = availableFriends.filter(friend => selectedFriends.includes(friend.id));
    const selectedNames = selectedFriendObjects.map(friend => friend.name).join(', ');
    
    // Add selected friends to the added friends list
    setAddedFriends(prev => [...prev, ...selectedFriendObjects]);
    setShowFriendSelection(false);
    setSelectedFriends([]);
    
    Alert.alert(
      'Group Created', 
      `Group conversation with ${selectedNames} created!\n\nNote: Group conversations feature coming soon!`
    );
  };

  // Shared function to delete conversation data
  const deleteConversationData = async (profileId: string | number, participantsList: any[] = []) => {
    try {
      // Remove conversation data
      const conversations = await AsyncStorage.getItem('conversations');
      let conversationData = conversations ? JSON.parse(conversations) : {};
      const conversationKey = `conversation_${profileId}`;
      delete conversationData[conversationKey];
      
      // Also remove conversation data for all participants
      if (participantsList.length > 0) {
        for (const participant of participantsList) {
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
        // Remove notifications for this conversation
        Object.keys(notificationData).forEach(key => {
          if (key.includes(`_conversation_${profileId}`) || key.includes(`notification_${profileId}_`)) {
            delete notificationData[key];
          }
        });
        await AsyncStorage.setItem('conversationNotifications', JSON.stringify(notificationData));
      }
      
      return true;
    } catch (error) {
      console.log('Error deleting conversation:', error);
      return false;
    }
  };

  const handleDeleteMessage = (message: Message) => {
    setSelectedMessage(message);
    setShowDeleteModal(true);
  };

  const confirmDeleteMessage = async () => {
    if (!selectedMessage) return;
    
    const success = await deleteConversationData(selectedMessage.id, selectedMessage.participants);
    
    if (success) {
      // Reload messages to reflect the changes
      await loadMessages();
      setShowDeleteModal(false);
      setSelectedMessage(null);
    } else {
      Alert.alert('Error', 'Could not delete conversation.');
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    return (
      <TouchableOpacity 
        style={styles.messageItem}
        onPress={() => {
          router.push(`/direct-message?profileName=${encodeURIComponent(item.name)}&profileId=${item.id}`);
        }}
        onLongPress={() => handleDeleteMessage(item)}
      >
        <View style={styles.avatarContainer}>
          {item.isLocalImage ? (
            <Image source={item.image} style={styles.avatar} />
          ) : (
            <Image source={{ uri: item.image }} style={styles.avatar} />
          )}
          {item.unread && <View style={styles.unreadBadge} />}
        </View>
        
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={[styles.name, item.unread && styles.unreadName]}>{item.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          {item.participants && item.participants.length > 0 && (
            <View style={styles.participantsContainer}>
              {item.participants.slice(0, 3).map((participant, index) => {
                const uniqueKey = `msg-${item.id}-participant-${participant.id || participant.name}-${index}`;
                return (
                  <Image
                    key={uniqueKey}
                    source={participant.image}
                    style={[styles.participantAvatar, { marginLeft: index > 0 ? -6 : 0 }]}
                  />
                );
              })}
              {item.participants.length > 3 && (
                <View key={`msg-${item.id}-more-participants`} style={[styles.participantAvatar, styles.moreParticipants]}>
                  <Text style={styles.moreParticipantsText}>+{item.participants.length - 3}</Text>
                </View>
              )}
            </View>
          )}
          <Text style={[styles.lastMessage, item.unread && styles.unreadMessage]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="chatbubble-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No Messages</Text>
      <Text style={styles.emptySubtitle}>
        Start connecting with people at events to begin messaging!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Messages</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.moreButton} onPress={toggleDropdown}>
                <Ionicons name="ellipsis-vertical" size={24} color="#666" />
              </TouchableOpacity>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity style={styles.dropdownItem} onPress={handleAddFriendsToConversation}>
                    <Ionicons name="person-add" size={18} color="#333" />
                    <Text style={styles.dropdownText}>Start group conversation</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Added Friends Display */}
          {addedFriends.length > 0 && (
            <View style={styles.addedFriendsContainer}>
              <Text style={styles.addedFriendsLabel}>Group Members:</Text>
              <View style={styles.addedFriendsRow}>
                {addedFriends.map((friend, index) => (
                  <View key={friend.id} style={styles.addedFriendItem}>
                    <Image 
                      source={friend.isLocalImage ? friend.image : { uri: friend.image }}
                      style={styles.addedFriendAvatar}
                    />
                    <Text style={styles.addedFriendName} numberOfLines={1}>{friend.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Messages List */}
          {messages.length > 0 ? (
            <FlatList
              data={messages}
              renderItem={renderMessageItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.messagesList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyState()
          )}
        </View>
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
            <Text style={styles.modalTitle}>Start Group Chat</Text>
            <TouchableOpacity onPress={createGroupConversation}>
              <Text style={styles.modalDoneButton}>Create ({selectedFriends.length})</Text>
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
            ListEmptyComponent={
              <View style={styles.emptyFriends}>
                <Text style={styles.emptyFriendsText}>No friends available</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.deleteModalOverlay}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalTitle}>Delete Conversation</Text>
            <Text style={styles.deleteModalMessage}>
              Are you sure you want to delete your conversation with {selectedMessage?.name}? This action cannot be undone.
            </Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity 
                style={[styles.deleteModalButton, styles.cancelButton]}
                onPress={() => {
                  setShowDeleteModal(false);
                  setSelectedMessage(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.deleteModalButton, styles.deleteButton]}
                onPress={confirmDeleteMessage}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    position: 'relative',
  },
  moreButton: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
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
  addedFriendsContainer: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  addedFriendsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  addedFriendsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  addedFriendItem: {
    alignItems: 'center',
    width: 60,
  },
  addedFriendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 4,
  },
  addedFriendName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  unreadName: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 14,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 15,
    color: '#8E8E93',
  },
  unreadMessage: {
    color: '#333',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  participantAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  moreParticipants: {
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreParticipantsText: {
    fontSize: 8,
    color: '#666',
    fontWeight: '500',
  },
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  deleteModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  deleteModalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  deleteModalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
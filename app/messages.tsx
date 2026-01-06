import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
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
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
    name: 'Sarah & Mia',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    name: 'Alex',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    name: 'Concert Crew',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    name: 'Maya',
  }
];

type Message = {
  id: number;
  name: string;
  image: any;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isLocalImage?: boolean;
  participants?: any[];
};

export default function MessagesScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
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

  const loadMessages = async () => {
    try {
      const friends = await AsyncStorage.getItem('friends');
      const friendsList = friends ? JSON.parse(friends) : [];
      
      // Get actual conversation data
      const conversations = await AsyncStorage.getItem('conversations');
      const conversationData = conversations ? JSON.parse(conversations) : {};
      
      // Get conversation participants
      const participantsData = await AsyncStorage.getItem('conversationParticipants');
      const allParticipants = participantsData ? JSON.parse(participantsData) : {};
      
      const messagesList: Message[] = [];
      
      for (const friend of friendsList) {
        const conversationKey = `conversation_${friend.id}`;
        const conversation = conversationData[conversationKey];
        const participants = allParticipants[conversationKey] || [];
        
        if (conversation && conversation.length > 0) {
          const lastMessage = conversation[conversation.length - 1];
          const timestamp = new Date(lastMessage.timestamp);
          
          messagesList.push({
            id: friend.id,
            name: friend.name,
            image: friend.image,
            lastMessage: lastMessage.text,
            timestamp: formatTimestamp(timestamp),
            unread: lastMessage.sender === 'other' && !lastMessage.read,
            isLocalImage: friend.isLocalImage,
            participants: participants
          });
        }
      }
      
      // Sort by most recent message
      messagesList.sort((a, b) => {
        // Since timestamps are now strings, we need to convert them back to dates for sorting
        // For now, just sort by order added (most recent conversations first)
        return b.id - a.id;
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

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity 
      style={styles.messageItem}
      onPress={() => router.push(`/direct-message?profileName=${encodeURIComponent(item.name)}&profileId=${item.id}`)}
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
            {item.participants.slice(0, 3).map((participant, index) => (
              <Image
                key={participant.id}
                source={participant.image}
                style={[styles.participantAvatar, { marginLeft: index > 0 ? -6 : 0 }]}
              />
            ))}
            {item.participants.length > 3 && (
              <View style={[styles.participantAvatar, styles.moreParticipants]}>
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
              renderItem={renderMessage}
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
});
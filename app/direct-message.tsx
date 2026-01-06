import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

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
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
};

export default function DirectMessageScreen() {
  const router = useRouter();
  const { profileName, profileId } = useLocalSearchParams();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputText, setInputText] = React.useState('');
  const [isFirstMessage, setIsFirstMessage] = React.useState(true);
  const [isFriend, setIsFriend] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showFriendSelection, setShowFriendSelection] = React.useState(false);
  const [availableFriends, setAvailableFriends] = React.useState<any[]>([]);
  const [selectedFriends, setSelectedFriends] = React.useState<number[]>([]);
  const [conversationParticipants, setConversationParticipants] = React.useState<any[]>([]);

  // Check if already a friend
  React.useEffect(() => {
    checkFriendStatus();
    loadConversation();
  }, [profileId]);

  const loadConversation = async () => {
    try {
      const conversations = await AsyncStorage.getItem('conversations');
      const conversationData = conversations ? JSON.parse(conversations) : {};
      const conversationKey = `conversation_${profileId}`;
      const conversation = conversationData[conversationKey];
      
      if (conversation && conversation.length > 0) {
        setMessages(conversation);
        setIsFirstMessage(false);
      }

      // Load conversation participants
      const participantsData = await AsyncStorage.getItem('conversationParticipants');
      const allParticipants = participantsData ? JSON.parse(participantsData) : {};
      const participants = allParticipants[conversationKey] || [];
      setConversationParticipants(participants);
    } catch (error) {
      console.log('Error loading conversation:', error);
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

  // Pre-populate with a pleasant intro message only on first visit
  React.useEffect(() => {
    if (isFirstMessage && messages.length === 0) {
      const introMessage = `Hey ${profileName}! I saw we have some shared interests. Would love to connect at the event! 🎵`;
      setInputText(introMessage);
    } else if (!isFirstMessage) {
      // Clear the input text after first message is sent
      setInputText('');
    }
  }, [profileName, isFirstMessage, messages.length]);

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
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

        // Also save to group conversations for all participants
        if (conversationParticipants.length > 0) {
          for (const participant of conversationParticipants) {
            const participantKey = `conversation_${participant.id}`;
            conversationData[participantKey] = updatedMessages;
          }
          await AsyncStorage.setItem('conversations', JSON.stringify(conversationData));
        }
      } catch (error) {
        console.log('Error saving conversation:', error);
      }
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
      // Filter out the current conversation participant
      const available = friendsList.filter((friend: any) => friend.id.toString() !== profileId);
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
    Alert.alert('Create Event', 'Create event feature coming soon!');
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
    try {
      const friends = await AsyncStorage.getItem('friends');
      const friendsList = friends ? JSON.parse(friends) : [];
      const updatedFriends = friendsList.filter((friend: any) => friend.id.toString() !== profileId);
      await AsyncStorage.setItem('friends', JSON.stringify(updatedFriends));
      setIsFriend(false);
      Alert.alert('Unfriended', `You have unfriended ${profileName}`);
    } catch (error) {
      console.log('Error unfriending:', error);
    }
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
      const newParticipants = availableFriends.filter(friend => selectedFriends.includes(friend.id));
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
      
      const selectedNames = newParticipants.map(friend => friend.name).join(', ');
      setShowFriendSelection(false);
      Alert.alert(
        'Friends Added', 
        `${selectedNames} have been added to the conversation! They can now see and reply to messages.`
      );
    } catch (error) {
      console.log('Error adding participants:', error);
      Alert.alert('Error', 'Could not add friends to conversation.');
    }
  };

  const formatTime = (date: Date) => {
    try {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'now';
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.otherMessage
    ]}>
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

  return (
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
              {conversationParticipants.slice(0, 3).map((participant, index) => (
                <Image
                  key={participant.id}
                  source={participant.image}
                  style={[styles.participantAvatar, { marginLeft: index > 0 ? -8 : 0 }]}
                />
              ))}
              {conversationParticipants.length > 3 && (
                <View style={[styles.participantAvatar, styles.moreParticipants]}>
                  <Text style={styles.moreParticipantsText}>+{conversationParticipants.length - 3}</Text>
                </View>
              )}
            </View>
          )}
          {isFirstMessage && messages.length === 0 && conversationParticipants.length === 0 && (
            <Text style={styles.headerStatus}>Start a conversation</Text>
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
            <TouchableOpacity style={styles.dropdownItem} onPress={handleRenameMessage}>
              <Ionicons name="pencil" size={18} color="#333" />
              <Text style={styles.dropdownText}>Rename message</Text>
            </TouchableOpacity>
            {isFriend && (
              <TouchableOpacity style={styles.dropdownItem} onPress={handleUnfriend}>
                <Ionicons name="person-remove" size={18} color="#ff6b6b" />
                <Text style={[styles.dropdownText, { color: '#ff6b6b' }]}>Unfriend</Text>
              </TouchableOpacity>
            )}
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
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
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
          <TouchableOpacity style={styles.attachButton}>
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
            ListEmptyComponent={
              <View style={styles.emptyFriends}>
                <Text style={styles.emptyFriendsText}>No friends available to add</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
    </TouchableWithoutFeedback>
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
});
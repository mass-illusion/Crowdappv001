import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

  // Check if already a friend
  React.useEffect(() => {
    checkFriendStatus();
  }, [profileId]);

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
    if (isFirstMessage) {
      const introMessage = `Hey ${profileName}! I saw we have some shared interests. Would love to connect at the event! 🎵`;
      setInputText(introMessage);
    }
  }, [profileName, isFirstMessage]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsFirstMessage(false);
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{profileName || 'Unknown'}</Text>
          <Text style={styles.headerStatus}>Start a conversation</Text>
        </View>
        <TouchableOpacity style={styles.friendButton} onPress={addFriend}>
          <Ionicons 
            name={isFriend ? "person" : "person-add"} 
            size={24} 
            color={isFriend ? "#A2CCF2" : "#999"} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#666" />
        </TouchableOpacity>
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
    </SafeAreaView>
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
    padding: 8,
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
});
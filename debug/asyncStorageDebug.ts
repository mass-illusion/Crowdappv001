import AsyncStorage from '@react-native-async-storage/async-storage';

// Debug function to log all AsyncStorage data
export const debugAsyncStorage = async () => {
  try {
    console.log('=== AsyncStorage Debug ===');
    
    const keys = [
      'friends',
      'conversations', 
      'conversationParticipants',
      'conversationNotifications',
      'eventMessages',
      'messageUpdateTrigger',
      'conversationDeletedTrigger'
    ];
    
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      console.log(`${key}:`, value ? JSON.parse(value) : null);
    }
    
    console.log('=== End Debug ===');
  } catch (error) {
    console.error('Debug error:', error);
  }
};

// Function to clear all message-related data
export const clearAllMessageData = async () => {
  try {
    await AsyncStorage.multiRemove([
      'friends',
      'conversations',
      'conversationParticipants', 
      'conversationNotifications',
      'eventMessages',
      'messageUpdateTrigger',
      'conversationDeletedTrigger'
    ]);
    console.log('All message data cleared');
  } catch (error) {
    console.error('Clear data error:', error);
  }
};
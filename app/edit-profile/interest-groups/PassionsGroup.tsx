
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const PASSION_INTERESTS = [
  { id: 'music', label: 'Music', emoji: '🎧' },
  { id: 'business', label: 'Business', emoji: '📈' },
  { id: 'sports', label: 'Sports', emoji: '🏀' },
  { id: 'raves', label: 'Raving', emoji: '🕺' },
  { id: 'fitness', label: 'Fitness', emoji: '🏋️' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'parenting', label: 'Parenting', emoji: '👶' },
  { id: 'filmContent', label: 'Content', emoji: '🎬' },
  { id: 'dj', label: 'DJ', emoji: '🎧' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'pets', label: 'Animals', emoji: '🐶' },
  { id: 'photography', label: 'Photos', emoji: '📷' },
  { id: 'reading', label: 'Reading', emoji: '📚' },
  { id: 'anime', label: 'Anime', emoji: '👾' },
  { id: 'singing', label: 'Singing', emoji: '🎤' },
  { id: 'technology', label: 'Tech', emoji: '📱' },
  { id: 'travel', label: 'Travel', emoji: '🗺️' },
  { id: 'writing', label: 'Writing', emoji: '📝' },
  { id: 'cooking', label: 'Cooking', emoji: '🍳' },
  { id: 'cinema', label: 'Cinema', emoji: '🎬' },
  { id: 'investing', label: 'Investing', emoji: '💰' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'cars', label: 'Cars', emoji: '🏎️' },
  { id: 'hiking', label: 'Hiking', emoji: '🥾' },
  { id: 'art', label: 'Art', emoji: '🎨' },
  { id: 'boardGames', label: 'Chess', emoji: '♟️' },
  { id: 'musicians', label: 'Jammin', emoji: '🎻' },
  { id: 'partying', label: 'Partying', emoji: '🎉' },
  { id: 'lgbtRights', label: 'LGBT', emoji: '🏳️‍🌈' },
  { id: 'disney', label: 'Disney', emoji: '🏰' },
  { id: 'concerts', label: 'Concerts', emoji: '🎤' },
  { id: 'ai', label: 'AI', emoji: '🤖' },
  { id: 'godFearing', label: 'God', emoji: '🙏' },
  { id: 'motorcycles', label: 'Motorcycles', emoji: '🏍️' },
  { id: 'beauty', label: 'Beauty', emoji: '💄' },
  { id: 'politics', label: 'Politics', emoji: '👨‍💼' },
  { id: 'conspiracies', label: 'Conspiracies', emoji: '👁️' },
  { id: 'founders', label: 'Founders', emoji: '💼' },
  { id: 'skating', label: 'Skate', emoji: '🛹' },
  { id: 'popCulture', label: 'Culture', emoji: '📱' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'food', label: 'Food', emoji: '🍔' },
  { id: 'running', label: 'Running', emoji: '🏃' },
  { id: 'camping', label: 'Camping', emoji: '🏕️' },
  { id: 'snowboarding', label: 'Snow', emoji: '🏂' }
];

export default function PassionsGroup() {
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);
  const [customPassionInput, setCustomPassionInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedPassions');
      if (saved) setSelectedPassions(JSON.parse(saved));
    })();
  }, []);

  const togglePassion = (id: string) => {
    setSelectedPassions(prev => {
      const updated = prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id];
      AsyncStorage.setItem('selectedPassions', JSON.stringify(updated));
      return updated;
    });
  };

  const addCustomPassion = () => {
    if (customPassionInput.trim() && !selectedPassions.includes(customPassionInput.trim())) {
      setSelectedPassions(prev => [...prev, customPassionInput.trim()]);
      setCustomPassionInput('');
      setTimeout(() => AsyncStorage.setItem('selectedPassions', JSON.stringify([...selectedPassions, customPassionInput.trim()])), 100);
    }
  };

  return (
    <>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {PASSION_INTERESTS.map(({ id, label, emoji }) => (
          <TouchableOpacity
            key={id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedPassions.includes(id) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => togglePassion(id)}
          >
            <Text style={{ fontSize: 18, marginRight: 6 }}>{emoji}</Text>
            <Text style={{ fontSize: 16 }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customPassionInput}
          onChangeText={setCustomPassionInput}
          placeholder="Add your own interest"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomPassion}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomPassion}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

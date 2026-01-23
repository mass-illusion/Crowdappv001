import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const VIDEO_GAMES_GENRES = [
  'Action', 'Adventure', 'RPG', 'Shooter', 'Strategy', 'Simulation', 'Sports', 'Racing',
  'Puzzle', 'Platformer', 'Fighting', 'MMO', 'Indie', 'Horror', 'Sandbox', 'Survival',
  'Rhythm', 'Card', 'Board', 'Party', 'Trivia', 'Visual Novel', 'Roguelike', 'Stealth',
  'Open World', 'Battle Royale', 'Co-op', 'Multiplayer', 'Singleplayer', 'Retro', 'Mobile',
  'Esports', 'VR', 'AR', 'Idle', 'Metroidvania', 'Soulslike', 'MOBA', 'Tower Defense'
];

export default function VideoGamesGroup() {
  const [selectedVideoGames, setSelectedVideoGames] = useState<string[]>([]);
  const [customVideoGamesInput, setCustomVideoGamesInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedVideoGames');
      if (saved) setSelectedVideoGames(JSON.parse(saved));
    })();
  }, []);

  const toggleVideoGames = (genre: string) => {
    setSelectedVideoGames(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedVideoGames', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomVideoGames = () => {
    if (customVideoGamesInput.trim() && !selectedVideoGames.includes(customVideoGamesInput.trim())) {
      setSelectedVideoGames(prev => [...prev, customVideoGamesInput.trim()]);
      setCustomVideoGamesInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedVideoGames', JSON.stringify([...selectedVideoGames, customVideoGamesInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Video Games</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {VIDEO_GAMES_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedVideoGames.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleVideoGames(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom video games entries as pills */}
      {selectedVideoGames.filter(genre => !VIDEO_GAMES_GENRES.includes(genre)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Video Games</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedVideoGames
              .filter(genre => !VIDEO_GAMES_GENRES.includes(genre))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`videogames-${index}`}
                  style={{
                    backgroundColor: '#d1e7dd',
                    borderRadius: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    margin: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSelectedVideoGames(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedVideoGames', JSON.stringify(selectedVideoGames.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new video games */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customVideoGamesInput}
          onChangeText={setCustomVideoGamesInput}
          placeholder="Add your own video game genre"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomVideoGames}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomVideoGames}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

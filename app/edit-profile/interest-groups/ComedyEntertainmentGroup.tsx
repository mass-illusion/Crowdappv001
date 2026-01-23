import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const COMEDY_ENTERTAINMENT_GENRES = [
  'Stand-up Comedy', 'Improv', 'Sketch Comedy', 'Satire', 'Parody', 'Sitcoms',
  'Late Night Shows', 'Comedy Films', 'Cartoons', 'Memes', 'Viral Videos',
  'Podcasts', 'YouTube', 'Streaming', 'Game Shows', 'Magic', 'Circus',
  'Drag Shows', 'Musical Comedy', 'Roasts', 'Pranks', 'Talent Shows', 'Street Performers'
];

export default function ComedyEntertainmentGroup() {
  const [selectedComedyEntertainment, setSelectedComedyEntertainment] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedComedyEntertainment');
      if (saved) setSelectedComedyEntertainment(JSON.parse(saved));
    })();
  }, []);

  const toggleComedyEntertainment = (genre: string) => {
    setSelectedComedyEntertainment(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedComedyEntertainment', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Comedy & Entertainment</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {COMEDY_ENTERTAINMENT_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedComedyEntertainment.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleComedyEntertainment(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

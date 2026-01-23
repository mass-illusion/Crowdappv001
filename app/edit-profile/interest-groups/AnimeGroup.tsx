import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const ANIME_GENRES = [
  'NARUTO', 'ONE PIECE', 'DRAGON BALL', 'ATTACK ON TITAN', 'DEMON SLAYER',
  'MY HERO ACADEMIA', 'DEATH NOTE', 'ONE PUNCH MAN', 'SPIRITED AWAY', 'POKEMON',
  'SAILOR MOON', 'COWBOY BEBOP', 'FULLMETAL ALCHEMIST', 'HUNTER X HUNTER', 'BLEACH',
  'JUJUTSU KAISEN', 'CHAINSAW MAN', 'SPY X FAMILY', "JOJO'S BIZARRE ADVENTURE", 'AKIRA'
];

export default function AnimeGroup() {
  const [selectedAnime, setSelectedAnime] = useState<string[]>([]);
  const [customAnimeInput, setCustomAnimeInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedAnime');
      if (saved) setSelectedAnime(JSON.parse(saved));
    })();
  }, []);

  const toggleAnimeGenre = (genre: string) => {
    setSelectedAnime(prev => {
      const newAnime = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedAnime', JSON.stringify(newAnime));
      }, 100);
      return newAnime;
    });
  };

  const addCustomAnime = () => {
    if (customAnimeInput.trim() && !selectedAnime.includes(customAnimeInput.trim())) {
      setSelectedAnime(prev => [...prev, customAnimeInput.trim()]);
      setCustomAnimeInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedAnime', JSON.stringify([...selectedAnime, customAnimeInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Anime</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {ANIME_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedAnime.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleAnimeGenre(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom anime entries as pills */}
      {selectedAnime.filter(anime => !ANIME_GENRES.includes(anime)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Anime</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedAnime
              .filter(anime => !ANIME_GENRES.includes(anime))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`anime-${index}`}
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
                    setSelectedAnime(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedAnime', JSON.stringify(selectedAnime.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                  <Ionicons name="close-circle" size={16} color="#007AFF" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new anime */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customAnimeInput}
          onChangeText={setCustomAnimeInput}
          placeholder="Add your favorite anime"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomAnime}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomAnime}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

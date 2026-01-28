import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const MUSIC_GENRES = [
  'Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'EDM', 'Country', 'Reggae', 'Blues',
  'R&B', 'Soul', 'Funk', 'Metal', 'Punk', 'Folk', 'Indie', 'K-Pop', 'J-Pop', 'Latin',
  'World', 'Gospel', 'Opera', 'Soundtracks', 'Acoustic', 'Alternative', 'Trap', 'House',
  'Techno', 'Trance', 'Dubstep', 'Drum & Bass', 'Ambient', 'Chill', 'Lo-fi', 'Ska', 'Disco'
];

export default function MusicGroup() {
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const [customMusicInput, setCustomMusicInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedMusic');
      if (saved) setSelectedMusic(JSON.parse(saved));
    })();
  }, []);

  const toggleMusic = (genre: string) => {
    setSelectedMusic(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedMusic', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomMusic = () => {
    if (customMusicInput.trim() && !selectedMusic.includes(customMusicInput.trim())) {
      setSelectedMusic(prev => [...prev, customMusicInput.trim()]);
      setCustomMusicInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedMusic', JSON.stringify([...selectedMusic, customMusicInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Music</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {MUSIC_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedMusic.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleMusic(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom music entries as pills */}
      {selectedMusic.filter(genre => !MUSIC_GENRES.includes(genre)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Music</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedMusic
              .filter(genre => !MUSIC_GENRES.includes(genre))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`music-${index}`}
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
                    setSelectedMusic(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedMusic', JSON.stringify(selectedMusic.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new music */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customMusicInput}
          onChangeText={setCustomMusicInput}
          placeholder="Add your own music genre"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomMusic}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomMusic}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

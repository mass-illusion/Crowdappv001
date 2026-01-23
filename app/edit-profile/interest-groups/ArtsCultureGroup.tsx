import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const ARTS_CULTURE_GENRES = [
  'Painting', 'Sculpture', 'Photography', 'Theater', 'Dance', 'Opera', 'Classical Music',
  'Jazz', 'Street Art', 'Graffiti', 'Poetry', 'Literature', 'Film', 'Architecture',
  'Design', 'Fashion', 'Calligraphy', 'Ceramics', 'Comics', 'Animation', 'Museums',
  'Art History', 'Performance Art', 'Installations', 'Crafts', 'Digital Art'
];

export default function ArtsCultureGroup() {
  const [selectedArtsCulture, setSelectedArtsCulture] = useState<string[]>([]);
  const [customArtsCultureInput, setCustomArtsCultureInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedArtsCulture');
      if (saved) setSelectedArtsCulture(JSON.parse(saved));
    })();
  }, []);

  const toggleArtsCulture = (genre: string) => {
    setSelectedArtsCulture(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedArtsCulture', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomArtsCulture = () => {
    if (customArtsCultureInput.trim() && !selectedArtsCulture.includes(customArtsCultureInput.trim())) {
      setSelectedArtsCulture(prev => [...prev, customArtsCultureInput.trim()]);
      setCustomArtsCultureInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedArtsCulture', JSON.stringify([...selectedArtsCulture, customArtsCultureInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Arts & Culture</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {ARTS_CULTURE_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedArtsCulture.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleArtsCulture(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom arts & culture entries as pills */}
      {selectedArtsCulture.filter(genre => !ARTS_CULTURE_GENRES.includes(genre)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Arts & Culture</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedArtsCulture
              .filter(genre => !ARTS_CULTURE_GENRES.includes(genre))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`artsculture-${index}`}
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
                    setSelectedArtsCulture(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedArtsCulture', JSON.stringify(selectedArtsCulture.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new arts & culture */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customArtsCultureInput}
          onChangeText={setCustomArtsCultureInput}
          placeholder="Add your own arts/culture"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomArtsCulture}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomArtsCulture}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const TECHNOLOGY_GENRES = [
  'AI', 'Machine Learning', 'Blockchain', 'Web Development', 'Mobile Apps', 'Cloud Computing',
  'Cybersecurity', 'Gaming', 'AR/VR', 'IoT', 'Robotics', 'Data Science', 'UI/UX',
  'Startups', 'Crypto', 'Open Source', '3D Printing', 'Wearables', 'Smart Home',
  'Quantum Computing', 'BioTech', 'EdTech', 'FinTech', 'HealthTech', 'SpaceTech'
];

export default function TechnologyGroup() {
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
  const [customTechnologyInput, setCustomTechnologyInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedTechnology');
      if (saved) setSelectedTechnology(JSON.parse(saved));
    })();
  }, []);

  const toggleTechnology = (genre: string) => {
    setSelectedTechnology(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedTechnology', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomTechnology = () => {
    if (customTechnologyInput.trim() && !selectedTechnology.includes(customTechnologyInput.trim())) {
      setSelectedTechnology(prev => [...prev, customTechnologyInput.trim()]);
      setCustomTechnologyInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedTechnology', JSON.stringify([...selectedTechnology, customTechnologyInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Technology</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {TECHNOLOGY_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedTechnology.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleTechnology(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom technology entries as pills */}
      {selectedTechnology.filter(genre => !TECHNOLOGY_GENRES.includes(genre)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Technology</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedTechnology
              .filter(genre => !TECHNOLOGY_GENRES.includes(genre))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`tech-${index}`}
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
                    setSelectedTechnology(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedTechnology', JSON.stringify(selectedTechnology.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new technology */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customTechnologyInput}
          onChangeText={setCustomTechnologyInput}
          placeholder="Add your own technology"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomTechnology}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomTechnology}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

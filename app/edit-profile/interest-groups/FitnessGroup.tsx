import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const FITNESS_GENRES = [
  'Running', 'Cycling', 'Yoga', 'Pilates', 'CrossFit', 'Weightlifting', 'HIIT',
  'Swimming', 'Boxing', 'Martial Arts', 'Dance Fitness', 'Zumba', 'Rowing',
  'Climbing', 'Hiking', 'Walking', 'Stretching', 'Meditation', 'Team Sports',
  'Personal Training', 'Nutrition', 'Wellness', 'Bodybuilding', 'Powerlifting', 'Triathlon'
];

export default function FitnessGroup() {
  const [selectedFitness, setSelectedFitness] = useState<string[]>([]);
  const [customFitnessInput, setCustomFitnessInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedFitness');
      if (saved) setSelectedFitness(JSON.parse(saved));
    })();
  }, []);

  const toggleFitness = (genre: string) => {
    setSelectedFitness(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedFitness', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomFitness = () => {
    if (customFitnessInput.trim() && !selectedFitness.includes(customFitnessInput.trim())) {
      setSelectedFitness(prev => [...prev, customFitnessInput.trim()]);
      setCustomFitnessInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedFitness', JSON.stringify([...selectedFitness, customFitnessInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Fitness</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {FITNESS_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedFitness.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleFitness(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom fitness entries as pills */}
      {selectedFitness.filter(genre => !FITNESS_GENRES.includes(genre)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Fitness</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedFitness
              .filter(genre => !FITNESS_GENRES.includes(genre))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`fitness-${index}`}
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
                    setSelectedFitness(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedFitness', JSON.stringify(selectedFitness.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new fitness */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customFitnessInput}
          onChangeText={setCustomFitnessInput}
          placeholder="Add your own fitness"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomFitness}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomFitness}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

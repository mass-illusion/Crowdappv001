import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const INFLUENCES_LIST = [
  'Oprah', 'Elon Musk', 'Steve Jobs', 'Beyoncé', 'Kanye West', 'Taylor Swift',
  'Barack Obama', 'Serena Williams', 'LeBron James', 'Bill Gates', 'Rihanna',
  'Jay-Z', 'Michelle Obama', 'Jeff Bezos', 'Malala', 'Zendaya', 'Greta Thunberg',
  'Virgil Abloh', 'Anna Wintour', 'Shonda Rhimes', 'Quincy Jones', 'Ava DuVernay',
  'Pharrell', 'Shakira', 'David Attenborough', 'Miyamoto Musashi', 'Banksy',
  'Ai Weiwei', 'Frida Kahlo', 'Picasso', 'Da Vinci', 'Satoshi Nakamoto', 'Marie Curie',
  'Ada Lovelace', 'Nikola Tesla', 'Stephen Hawking', 'Jane Goodall', 'Maya Angelou',
  'Bruce Lee', 'Nelson Mandela', 'Mother Teresa', 'Walt Disney', 'Stan Lee',
  'J.K. Rowling', 'George Lucas', 'Steven Spielberg', 'Quentin Tarantino', 'Hayao Miyazaki'
];

export default function InfluencesGroup() {
  const [selectedInfluences, setSelectedInfluences] = useState<string[]>([]);
  const [customInfluenceInput, setCustomInfluenceInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedInfluences');
      if (saved) setSelectedInfluences(JSON.parse(saved));
    })();
  }, []);

  const toggleInfluence = (influence: string) => {
    setSelectedInfluences(prev => {
      const newArr = prev.includes(influence)
        ? prev.filter(g => g !== influence)
        : [...prev, influence];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedInfluences', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomInfluence = () => {
    if (customInfluenceInput.trim() && !selectedInfluences.includes(customInfluenceInput.trim())) {
      setSelectedInfluences(prev => [...prev, customInfluenceInput.trim()]);
      setCustomInfluenceInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedInfluences', JSON.stringify([...selectedInfluences, customInfluenceInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Influences</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {INFLUENCES_LIST.map((influence, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedInfluences.includes(influence) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleInfluence(influence)}
          >
            <Text style={{ fontSize: 16 }}>{influence}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom influences entries as pills */}
      {selectedInfluences.filter(inf => !INFLUENCES_LIST.includes(inf)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Influences</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedInfluences
              .filter(inf => !INFLUENCES_LIST.includes(inf))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`influence-${index}`}
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
                    setSelectedInfluences(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedInfluences', JSON.stringify(selectedInfluences.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new influence */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customInfluenceInput}
          onChangeText={setCustomInfluenceInput}
          placeholder="Add your own influence"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomInfluence}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomInfluence}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

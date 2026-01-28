import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const FAMILY_KIDS_GENRES = [
  'Parenting', 'Family Events', 'Kids Activities', 'Child Development', 'Education',
  'Playdates', 'Family Travel', 'Adoption', 'Foster Care', 'Special Needs',
  'Homeschooling', 'Parent Support', 'Work-Life Balance', 'Single Parenting',
  'Blended Families', 'Grandparenting', 'Pregnancy', 'Baby Care', 'Teen Parenting'
];

export default function FamilyKidsGroup() {
  const [selectedFamilyKids, setSelectedFamilyKids] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedFamilyKids');
      if (saved) setSelectedFamilyKids(JSON.parse(saved));
    })();
  }, []);

  const toggleFamilyKids = (genre: string) => {
    setSelectedFamilyKids(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedFamilyKids', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Family & Kids</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {FAMILY_KIDS_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedFamilyKids.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleFamilyKids(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

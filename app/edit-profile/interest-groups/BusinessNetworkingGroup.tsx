import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const BUSINESS_NETWORKING_GENRES = [
  'Entrepreneurship', 'Startups', 'Investing', 'Finance', 'Marketing', 'Sales',
  'Consulting', 'Leadership', 'Networking Events', 'Public Speaking', 'Mentorship',
  'Real Estate', 'E-Commerce', 'Venture Capital', 'Angel Investing', 'Small Business',
  'Business Development', 'Strategy', 'Operations', 'Product Management', 'Branding',
  'Pitching', 'Fundraising', 'Growth Hacking', 'Corporate', 'Nonprofit'
];

export default function BusinessNetworkingGroup() {
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
  const [customBusinessInput, setCustomBusinessInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedBusiness');
      if (saved) setSelectedBusiness(JSON.parse(saved));
    })();
  }, []);

  const toggleBusiness = (genre: string) => {
    setSelectedBusiness(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedBusiness', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomBusiness = () => {
    if (customBusinessInput.trim() && !selectedBusiness.includes(customBusinessInput.trim())) {
      setSelectedBusiness(prev => [...prev, customBusinessInput.trim()]);
      setCustomBusinessInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedBusiness', JSON.stringify([...selectedBusiness, customBusinessInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Business & Networking</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {BUSINESS_NETWORKING_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedBusiness.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleBusiness(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom business/networking entries as pills */}
      {selectedBusiness.filter(genre => !BUSINESS_NETWORKING_GENRES.includes(genre)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Business/Networking</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedBusiness
              .filter(genre => !BUSINESS_NETWORKING_GENRES.includes(genre))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`business-${index}`}
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
                    setSelectedBusiness(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedBusiness', JSON.stringify(selectedBusiness.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new business/networking */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customBusinessInput}
          onChangeText={setCustomBusinessInput}
          placeholder="Add your own business/networking"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomBusiness}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomBusiness}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const OUTDOORS_ADVENTURES_ACTIVITIES = [
  'Hiking', 'Camping', 'Backpacking', 'Rock Climbing', 'Kayaking', 'Surfing', 'Snowboarding',
  'Skiing', 'Mountain Biking', 'Trail Running', 'Fishing', 'Bird Watching', 'Stargazing',
  'Caving', 'Horseback Riding', 'Sailing', 'Scuba Diving', 'Windsurfing', 'Paragliding',
  'Ziplining', 'Wildlife Photography', 'Nature Walks', 'Foraging', 'Geocaching', 'Paddleboarding'
];

export default function OutdoorsAdventureGroup() {
  const [selectedOutdoors, setSelectedOutdoors] = useState<string[]>([]);
  const [customOutdoorsInput, setCustomOutdoorsInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedOutdoors');
      if (saved) setSelectedOutdoors(JSON.parse(saved));
    })();
  }, []);

  const toggleOutdoors = (activity: string) => {
    setSelectedOutdoors(prev => {
      const newArr = prev.includes(activity)
        ? prev.filter(g => g !== activity)
        : [...prev, activity];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedOutdoors', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomOutdoors = () => {
    if (customOutdoorsInput.trim() && !selectedOutdoors.includes(customOutdoorsInput.trim())) {
      setSelectedOutdoors(prev => [...prev, customOutdoorsInput.trim()]);
      setCustomOutdoorsInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedOutdoors', JSON.stringify([...selectedOutdoors, customOutdoorsInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Outdoors & Adventure</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {OUTDOORS_ADVENTURES_ACTIVITIES.map((activity, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedOutdoors.includes(activity) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleOutdoors(activity)}
          >
            <Text style={{ fontSize: 16 }}>{activity}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom outdoors entries as pills */}
      {selectedOutdoors.filter(activity => !OUTDOORS_ADVENTURES_ACTIVITIES.includes(activity)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Outdoors/Adventure</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedOutdoors
              .filter(activity => !OUTDOORS_ADVENTURES_ACTIVITIES.includes(activity))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`outdoors-${index}`}
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
                    setSelectedOutdoors(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedOutdoors', JSON.stringify(selectedOutdoors.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new outdoors/adventure */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customOutdoorsInput}
          onChangeText={setCustomOutdoorsInput}
          placeholder="Add your own outdoors/adventure"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomOutdoors}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomOutdoors}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

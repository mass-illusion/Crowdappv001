import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const FOOD_DRINKS_GENRES = [
  'Coffee', 'Tea', 'Wine', 'Beer', 'Cocktails', 'Vegan', 'Vegetarian', 'BBQ', 'Seafood',
  'Sushi', 'Pizza', 'Burgers', 'Desserts', 'Fine Dining', 'Street Food', 'Brunch',
  'Baking', 'Cooking', 'Food Festivals', 'Farmers Markets', 'Craft Beer', 'Whiskey',
  'Juicing', 'Smoothies', 'Ethnic Cuisine', 'Tasting Menus', 'Food Trucks', 'Cheese',
  'Chocolate', 'Ice Cream', 'Healthy Eating', 'Gluten-Free', 'Paleo', 'Keto'
];

export default function FoodDrinksGroup() {
  const [selectedFoodDrinks, setSelectedFoodDrinks] = useState<string[]>([]);
  const [customFoodDrinksInput, setCustomFoodDrinksInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedFoodDrinks');
      if (saved) setSelectedFoodDrinks(JSON.parse(saved));
    })();
  }, []);

  const toggleFoodDrinks = (genre: string) => {
    setSelectedFoodDrinks(prev => {
      const newArr = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedFoodDrinks', JSON.stringify(newArr));
      }, 100);
      return newArr;
    });
  };

  const addCustomFoodDrinks = () => {
    if (customFoodDrinksInput.trim() && !selectedFoodDrinks.includes(customFoodDrinksInput.trim())) {
      setSelectedFoodDrinks(prev => [...prev, customFoodDrinksInput.trim()]);
      setCustomFoodDrinksInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedFoodDrinks', JSON.stringify([...selectedFoodDrinks, customFoodDrinksInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Food & Drinks</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {FOOD_DRINKS_GENRES.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedFoodDrinks.includes(genre) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleFoodDrinks(genre)}
          >
            <Text style={{ fontSize: 16 }}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom food/drinks entries as pills */}
      {selectedFoodDrinks.filter(genre => !FOOD_DRINKS_GENRES.includes(genre)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Your Food/Drinks</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedFoodDrinks
              .filter(genre => !FOOD_DRINKS_GENRES.includes(genre))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`fooddrinks-${index}`}
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
                    setSelectedFoodDrinks(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedFoodDrinks', JSON.stringify(selectedFoodDrinks.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new food/drinks */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customFoodDrinksInput}
          onChangeText={setCustomFoodDrinksInput}
          placeholder="Add your own food/drink"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomFoodDrinks}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomFoodDrinks}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

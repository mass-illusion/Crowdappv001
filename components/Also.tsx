import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, FlatList, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import SvgFindMyCrowdWhite from '../assets/images/findmycrowdwhite.svg';

const Also: React.FC = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('Girl Friends');
  const [location, setLocation] = useState('Select or enable location');
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([28, 38]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  type CitySuggestion = {
    id: number;
    name: string;
    fullName: string;
    displayName: string;
  };
  
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const requestLocation = async () => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      
      // Get address from coordinates (reverse geocoding)
      let address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address.length > 0) {
        const { city, region } = address[0];
        const locationString = city && region ? `${city}, ${region}` : 'Current Location';
        setLocation(locationString);
        // Save to AsyncStorage for use in other screens
        try {
          await AsyncStorage.setItem('userLocation', locationString);
        } catch (error) {
          console.error('Error saving user location:', error);
        }
      } else {
        const fallbackLocation = 'Current Location';
        setLocation(fallbackLocation);
        // Save fallback to AsyncStorage
        try {
          await AsyncStorage.setItem('userLocation', fallbackLocation);
        } catch (error) {
          console.error('Error saving user location:', error);
        }
      }
      
      setShowLocationModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
      console.error('Location error:', error);
    }
  };

  const enableManualEntry = () => {
    setIsManualEntry(true);
    setLocation('');
    setShowLocationModal(false);
  };

  const searchCities = async (query: string) => {
    if (query.length < 2) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=10&featuretype=city&countrycodes=us`,
        { 
          headers: {
            'User-Agent': 'CrowdApp/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const cities = (data as Array<{
        place_id: number;
        display_name: string;
        address: {
          city?: string;
          town?: string;
          village?: string;
          state?: string;
          country?: string;
        };
      }>)
        .filter((item) => 
          item.address && 
          (item.address.city || item.address.town || item.address.village) &&
          item.address.country === 'United States'
        )
        .map((item) => {
          const city = item.address.city || item.address.town || item.address.village || '';
          const state = item.address.state;
          return {
            id: item.place_id,
            name: city,
            fullName: state ? `${city}, ${state}` : city,
            displayName: item.display_name
          };
        })
        .slice(0, 5);

      setCitySuggestions(cities);
      setShowSuggestions(cities.length > 0);
    } catch (error) {
      console.error('Error fetching cities:', error);
      // Don't show suggestions on error, but don't alert the user
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationChange = async (text: string) => {
    setLocation(text);
    // Save manually entered location to AsyncStorage
    if (text && text !== 'Select or enable location') {
      try {
        await AsyncStorage.setItem('userLocation', text);
      } catch (error) {
        console.error('Error saving user location:', error);
      }
    }
    searchCities(text);
  };

  const selectCity = async (city: { id: number; name: string; fullName: string; displayName: string }) => {
    setLocation(city.fullName);
    // Save selected city to AsyncStorage
    try {
      await AsyncStorage.setItem('userLocation', city.fullName);
    } catch (error) {
      console.error('Error saving user location:', error);
    }
    setCitySuggestions([]);
    setShowSuggestions(false);
  };

  const sliderRef = useRef<View>(null);
  const ageSliderRef = useRef<View>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingAge, setIsDraggingAge] = useState(false);
  const [activeAgeThumb, setActiveAgeThumb] = useState<'min' | 'max' | null>(null);
  
  const handleDistanceSliderTouch = (event: any) => {
    if (sliderRef.current) {
      sliderRef.current.measure((x, y, width, height, pageX, pageY) => {
        const touchX = event.nativeEvent.pageX - pageX;
        const percentage = Math.max(0, Math.min(1, touchX / width));
        const newDistance = Math.round(percentage * 100);
        
        if (Math.abs(newDistance - distance) >= 1) {
          setDistance(newDistance);
        }
      });
    }
  };

  const handleSliderStart = (event: any) => {
    setIsDragging(true);
    handleDistanceSliderTouch(event);
  };

  const handleSliderEnd = () => {
    setIsDragging(false);
  };

  const handleAgeSliderTouch = (event: any) => {
    if (ageSliderRef.current) {
      ageSliderRef.current.measure((x, y, width, height, pageX, pageY) => {
        const touchX = event.nativeEvent.pageX - pageX;
        const percentage = Math.max(0, Math.min(1, touchX / width));
        const newAge = Math.round(18 + percentage * (65 - 18)); // 18-65 age range
        
        // Determine which thumb to move based on proximity or active thumb
        const [minAge, maxAge] = ageRange;
        const minDistance = Math.abs(newAge - minAge);
        const maxDistance = Math.abs(newAge - maxAge);
        
        let targetThumb = activeAgeThumb;
        if (!targetThumb) {
          targetThumb = minDistance < maxDistance ? 'min' : 'max';
        }
        
        if (targetThumb === 'min' && newAge < maxAge) {
          setAgeRange([newAge, maxAge]);
        } else if (targetThumb === 'max' && newAge > minAge) {
          setAgeRange([minAge, newAge]);
        }
      });
    }
  };

  const handleAgeSliderStart = (event: any) => {
    setIsDraggingAge(true);
    
    // Determine which thumb is closer to the touch point
    if (ageSliderRef.current) {
      ageSliderRef.current.measure((x, y, width, height, pageX, pageY) => {
        const touchX = event.nativeEvent.pageX - pageX;
        const percentage = touchX / width;
        const touchAge = 18 + percentage * (65 - 18);
        
        const [minAge, maxAge] = ageRange;
        const minDistance = Math.abs(touchAge - minAge);
        const maxDistance = Math.abs(touchAge - maxAge);
        
        setActiveAgeThumb(minDistance < maxDistance ? 'min' : 'max');
      });
    }
    
    handleAgeSliderTouch(event);
  };

  const handleAgeSliderEnd = () => {
    setIsDraggingAge(false);
    setActiveAgeThumb(null);
  };

  const distancePercentage = distance / 100;
  const minAgePercentage = (ageRange[0] - 18) / (65 - 18);
  const maxAgePercentage = (ageRange[1] - 18) / (65 - 18);
  const ageProgressWidth = (maxAgePercentage - minAgePercentage) * 100;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backArrow} 
        onPress={() => router.replace('/LookingForScreen')}
      >
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>I'm looking for...</Text>
      <Text style={styles.subtext}>Get specific! You can always change this later.</Text>
      <View style={styles.tabContainer}>
        {['Girl Friends', 'Guy Friends', 'Both'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabSelected]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextSelected]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Location</Text>
        {isManualEntry ? (
          <View style={styles.locationInputContainer}>
            <TextInput
              style={styles.locationTextInput}
              value={location}
              onChangeText={handleLocationChange}
              placeholder="Enter your city"
              placeholderTextColor="#C7C7CC"
              onFocus={() => setShowSuggestions(citySuggestions.length > 0)}
            />
            {showSuggestions && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={citySuggestions}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => selectCity(item)}
                    >
                      <Text style={styles.suggestionText}>{item.fullName}</Text>
                    </TouchableOpacity>
                  )}
                  style={styles.suggestionsList}
                />
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity style={styles.locationInputRow} onPress={() => setShowLocationModal(true)}>
            <Text style={styles.locationInput}>{location}</Text>
            <View style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Distance</Text>
        <Text style={styles.sliderValue}>{distance} ml</Text>
        <View 
          style={styles.sliderContainer}
          ref={sliderRef}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleSliderStart}
          onResponderMove={isDragging ? handleDistanceSliderTouch : undefined}
          onResponderRelease={handleSliderEnd}
          onResponderTerminate={handleSliderEnd}
        >
          <View style={styles.sliderTrack} />
          <View 
            style={[styles.sliderProgress, { width: `${distancePercentage * 100}%` }]}
            pointerEvents="none"
          />
          <View 
            style={[styles.sliderThumb, { left: `${distancePercentage * 100}%` }]}
            pointerEvents="none"
          />
        </View>
      </View>
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Age</Text>
        <Text style={styles.sliderValue}>{ageRange[0]}-{ageRange[1]}</Text>
        <View 
          style={styles.sliderContainer}
          ref={ageSliderRef}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleAgeSliderStart}
          onResponderMove={isDraggingAge ? handleAgeSliderTouch : undefined}
          onResponderRelease={handleAgeSliderEnd}
          onResponderTerminate={handleAgeSliderEnd}
        >
          <View style={styles.sliderTrack} />
          <View 
            style={[
              styles.sliderProgress, 
              { 
                left: `${minAgePercentage * 100}%`, 
                width: `${ageProgressWidth}%` 
              }
            ]}
            pointerEvents="none"
          />
          <View 
            style={[styles.sliderThumb, { left: `${minAgePercentage * 100}%` }]}
            pointerEvents="none"
          />
          <View 
            style={[styles.sliderThumb, { left: `${maxAgePercentage * 100}%` }]}
            pointerEvents="none"
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.findButton} onPress={() => router.replace('/interests')}>
          <SvgFindMyCrowdWhite width={width * 0.85} height={80} />
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowLocationModal(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            
            <View style={styles.locationIcon}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>📍</Text>
              </View>
            </View>
            
            <Text style={styles.modalTitle}>Enable{'\n'}Location</Text>
            
            <TouchableOpacity style={styles.allowButton} onPress={requestLocation}>
              <Text style={styles.allowButtonText}>📍 Allow Location Access</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.manualButton}
              onPress={enableManualEntry}
            >
              <Text style={styles.manualButtonText}>Enter Location Manually</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 70,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backArrowText: {
    fontSize: 24,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A2CCF2',
    marginBottom: 8,
    marginLeft: 12,
  },
  subtext: {
    fontSize: 16,
    color: '#AAB8C2',
    marginBottom: 32,
    marginLeft: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
    marginHorizontal: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  tabSelected: {
    backgroundColor: '#8CC7FF',
  },
  tabText: {
    color: '#8E8E93',
    fontWeight: '500',
    fontSize: 14,
  },
  tabTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  locationContainer: {
    marginBottom: 32,
  },
  locationInputContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  locationLabel: {
    color: '#8E8E93',
    fontSize: 13,
    marginBottom: 8,
  },
  locationInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 44,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#C7C7CC',
  },
  locationTextInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    height: 44,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxHeight: 200,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#C7C7CC',
    marginLeft: 8,
  },
  sliderSection: {
    marginBottom: 32,
    position: 'relative',
  },
  sliderLabel: {
    fontWeight: '600',
    fontSize: 17,
    color: '#000',
    marginBottom: 16,
  },
  sliderValue: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#8E8E93',
    fontWeight: '400',
    fontSize: 17,
  },
  sliderContainer: {
    height: 30,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
  },
  sliderProgress: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#8CC7FF',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8CC7FF',
    top: -8,
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  findButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: '75%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#8E8E93',
    fontWeight: '300',
  },
  locationIcon: {
    marginBottom: 15,
    marginTop: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 32,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 34,
  },
  allowButton: {
    backgroundColor: '#8CC7FF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    width: '90%',
    alignItems: 'center',
  },
  allowButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  manualButton: {
    paddingVertical: 10,
    paddingBottom: 20,
  },
  manualButtonText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Also;

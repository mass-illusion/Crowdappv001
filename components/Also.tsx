import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Alert, Keyboard, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import SvgFindMyCrowdWhite from '../assets/images/findmycrowdwhite.svg';

const Also: React.FC = () => {
  const { width } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState('Girl Friends');
  const [location, setLocation] = useState('Select or enable location');
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([28, 38]);
  const [showLocationModal, setShowLocationModal] = useState(false);

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
      } else {
        setLocation('Current Location');
      }
      
      setShowLocationModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
      console.error('Location error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.locationInputRow} onPress={() => setShowLocationModal(true)}>
          <Text style={styles.locationInput}>{location}</Text>
          <View style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Distance</Text>
        <Text style={styles.sliderValue}>{distance} ml</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTrack} />
          <View style={[styles.sliderProgress, { width: '60%' }]} />
          <View style={[styles.sliderThumb, { left: '58%' }]} />
        </View>
      </View>
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Age</Text>
        <Text style={styles.sliderValue}>{ageRange[0]}-{ageRange[1]}</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTrack} />
          <View style={[styles.sliderProgress, { left: '20%', width: '40%' }]} />
          <View style={[styles.sliderThumb, { left: '18%' }]} />
          <View style={[styles.sliderThumb, { left: '58%' }]} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.findButton}>
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
              onPress={() => setShowLocationModal(false)}
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

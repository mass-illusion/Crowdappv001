import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Also: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Guy Friends');
  const [location, setLocation] = useState('Chicago, USA');
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([28, 38]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Also...</Text>
      <Text style={styles.subtext}>Increase compatibility by sharing!</Text>
      <View style={styles.tabContainer}>
        {['Girl Friends', 'Guy Friends', 'Both', 'Locals Only'].map(tab => (
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
        <View style={styles.locationInputRow}>
          <TextInput
            style={styles.locationInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            placeholderTextColor="#AAB8C2"
          />
          <View style={styles.dropdownIcon} />
        </View>
      </View>
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Distance</Text>
        <Text style={styles.sliderValue}>{distance} ml</Text>
        {/* Replace below with a real slider in your app */}
        <View style={styles.sliderMock} />
      </View>
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Age</Text>
        <Text style={styles.sliderValue}>{ageRange[0]}-{ageRange[1]}</Text>
        {/* Replace below with a real range slider in your app */}
        <View style={styles.sliderMock} />
      </View>
      <TouchableOpacity style={styles.findButton}>
        <Text style={styles.findButtonText}>Find My Crowd</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A2CCF2',
    marginBottom: 4,
  },
  subtext: {
    color: '#AAB8C2',
    fontSize: 15,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FB',
    borderRadius: 24,
    padding: 6,
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#B0B8C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#E6E9ED',
  },
  tabSelected: {
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#A2CCF2',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabText: {
    color: '#979797',
    fontWeight: '600',
    fontSize: 16,
  },
  tabTextSelected: {
    color: '#A2CCF2',
  },
  locationContainer: {
    marginBottom: 24,
  },
  locationLabel: {
    color: '#AAB8C2',
    fontSize: 13,
    marginBottom: 4,
  },
  locationInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E6E9ED',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dropdownIcon: {
    width: 18,
    height: 18,
    backgroundColor: '#E6E9ED',
    borderRadius: 9,
    marginLeft: 8,
  },
  sliderSection: {
    marginBottom: 24,
  },
  sliderLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  sliderValue: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#979797',
    fontWeight: '600',
    fontSize: 15,
  },
  sliderMock: {
    height: 8,
    backgroundColor: '#E6E9ED',
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 8,
  },
  findButton: {
    marginTop: 32,
    alignSelf: 'center',
    width: '90%',
    height: 48,
    backgroundColor: '#F8F9FB',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B0B8C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
  },
  findButtonText: {
    color: '#A2CCF2',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Also;

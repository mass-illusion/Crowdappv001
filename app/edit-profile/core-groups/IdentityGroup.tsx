import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

const genderOptions = ['Male', 'Female', 'Non-binary'];
const ethnicityOptions = [
  'White/Caucasian',
  'Hispanic/Latino',
  'Black/African American',
  'Asian',
  'Native American',
  'Middle Eastern',
  'Mixed/Multiracial',
  'Other',
  'Prefer not to say'
];

const IdentityGroup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [ethnicity, setEthnicity] = useState('');
  const [showEthnicityDropdown, setShowEthnicityDropdown] = useState(false);
  const [location, setLocation] = useState('');
  const [showOnProfile, setShowOnProfile] = useState(true);
  const [importantCulture, setImportantCulture] = useState(false);

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Identity</Text>
      {/* Full Name */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      {/* User Name */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      {/* Age */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      {/* Don't show on profile checkbox */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}
          onPress={() => setShowOnProfile(!showOnProfile)}
        >
          <View style={{
            width: 18,
            height: 18,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: showOnProfile ? '#fff' : '#007AFF',
            marginRight: 6
          }}>
            {!showOnProfile && <Ionicons name="checkmark" size={12} color="#fff" />}
          </View>
          <Text style={{ color: '#666' }}>Don't show on profile</Text>
        </TouchableOpacity>
      </View>
      {/* Gender Dropdown */}
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        onPress={() => setShowGenderDropdown(true)}
      >
        <Text style={{ color: gender ? '#000' : '#999' }}>{gender || 'Select Gender'}</Text>
      </TouchableOpacity>
      <Modal visible={showGenderDropdown} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setShowGenderDropdown(false)}>
          <View style={{ backgroundColor: '#fff', margin: 40, borderRadius: 8, padding: 16 }}>
            <FlatList
              data={genderOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12 }}
                  onPress={() => {
                    setGender(item);
                    setShowGenderDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Ethnicity Dropdown */}
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        onPress={() => setShowEthnicityDropdown(true)}
      >
        <Text style={{ color: ethnicity ? '#000' : '#999' }}>{ethnicity || 'Select Ethnicity'}</Text>
      </TouchableOpacity>
      <Modal visible={showEthnicityDropdown} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setShowEthnicityDropdown(false)}>
          <View style={{ backgroundColor: '#fff', margin: 40, borderRadius: 8, padding: 16 }}>
            <FlatList
              data={ethnicityOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12 }}
                  onPress={() => {
                    setEthnicity(item);
                    setShowEthnicityDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
        {/* Show me people that share my culture checkbox */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}
            onPress={() => setImportantCulture(!importantCulture)}
          >
            <View style={{
              width: 18,
              height: 18,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: importantCulture ? '#007AFF' : '#fff',
              marginRight: 6
            }}>
              {importantCulture && <Ionicons name="checkmark" size={12} color="#fff" />}
            </View>
            <Text style={{ color: '#666' }}>Show me people that share my culture</Text>
          </TouchableOpacity>
        </View>
      {/* Location */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
    </View>
  );
};

export default IdentityGroup;

import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

const industryOptions = [
  'Technology', 'Healthcare & Medicine', 'Finance & Banking', 'Education', 'Retail', 'Customer Service',
  'Manufacturing', 'Real Estate', 'Professional Services', 'Media & Entertainment', 'Transportation & Logistics',
  'Food & Beverage', 'Construction', 'Energy & Utilities', 'Government & Public Sector', 'Non-Profit',
  'Agriculture', 'Hospitality & Tourism', 'Automotive', 'Telecommunications', 'Insurance',
  'Legal Services', 'Consulting', 'Marketing & Advertising', 'Aerospace & Defense', 'Pharmaceuticals', 'Other'
];
const religionOptions = [
  'Christianity', 'Catholic', 'Baptist', 'Protestant', 'Orthodox', 'Judaism', 'Islam', 'Hinduism',
  'Buddhism', 'Sikhism', 'Atheist', 'Agnostic', 'Spiritual', 'Other', 'Prefer not to say'
];

export default function AboutGroup() {
  const [aboutMe, setAboutMe] = useState('');
  const [occupation, setOccupation] = useState('');
  const [industry, setIndustry] = useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [religion, setReligion] = useState('');
  const [showReligionDropdown, setShowReligionDropdown] = useState(false);

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>About Me</Text>
      {/* About Me */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8, minHeight: 60 }}
        placeholder="About Me"
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
      />
      {/* Occupation */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      {/* Industry Dropdown */}
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        onPress={() => setShowIndustryDropdown(true)}
      >
        <Text style={{ color: industry ? '#000' : '#999' }}>{industry || 'Select Industry'}</Text>
      </TouchableOpacity>
      <Modal visible={showIndustryDropdown} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setShowIndustryDropdown(false)}>
          <View style={{ backgroundColor: '#fff', margin: 40, borderRadius: 8, padding: 16 }}>
            <FlatList
              data={industryOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12 }}
                  onPress={() => {
                    setIndustry(item);
                    setShowIndustryDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Religion Dropdown */}
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        onPress={() => setShowReligionDropdown(true)}
      >
        <Text style={{ color: religion ? '#000' : '#999' }}>{religion || 'Select Religion'}</Text>
      </TouchableOpacity>
      <Modal visible={showReligionDropdown} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setShowReligionDropdown(false)}>
          <View style={{ backgroundColor: '#fff', margin: 40, borderRadius: 8, padding: 16 }}>
            <FlatList
              data={religionOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12 }}
                  onPress={() => {
                    setReligion(item);
                    setShowReligionDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

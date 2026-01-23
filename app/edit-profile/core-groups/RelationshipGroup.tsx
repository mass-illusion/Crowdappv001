import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

const relationshipStatusOptions = [
  'Single', 'In a relationship', 'Married', 'Divorced', 'Widowed', 'Open relationship', 'It’s complicated', 'Prefer not to say'
];

export default function RelationshipGroup() {
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [socialGoals, setSocialGoals] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [specificallyLookingFor, setSpecificallyLookingFor] = useState('');

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Relationship & Goals</Text>
      {/* Relationship Status Dropdown */}
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        onPress={() => setShowRelationshipDropdown(true)}
      >
        <Text style={{ color: relationshipStatus ? '#000' : '#999' }}>{relationshipStatus || 'Select Relationship Status'}</Text>
      </TouchableOpacity>
      <Modal visible={showRelationshipDropdown} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setShowRelationshipDropdown(false)}>
          <View style={{ backgroundColor: '#fff', margin: 40, borderRadius: 8, padding: 16 }}>
            <FlatList
              data={relationshipStatusOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12 }}
                  onPress={() => {
                    setRelationshipStatus(item);
                    setShowRelationshipDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Social & Friendship Goals */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        placeholder="Social & Friendship Goals"
        value={socialGoals}
        onChangeText={setSocialGoals}
      />
      {/* Primary Goal */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
        placeholder="Primary Goal"
        value={primaryGoal}
        onChangeText={setPrimaryGoal}
      />
      {/* Specifically looking for... */}
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }}
        placeholder="Specifically looking for..."
        value={specificallyLookingFor}
        onChangeText={setSpecificallyLookingFor}
      />
    </View>
  );
}

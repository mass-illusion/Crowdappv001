import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

interface IdealHangoutsGroupProps {
  showIdealHangoutsExpanded: boolean;
  setShowIdealHangoutsExpanded: (show: boolean) => void;
  idealHangoutsOptions: string[];
  idealHangouts: string[];
  toggleIdealHangout: (hangout: string) => void;
  customHangoutInput: string;
  setCustomHangoutInput: (val: string) => void;
  addCustomHangout: () => void;
  saveProfileData: () => void;
  styles: any;
}

const IdealHangoutsGroup: React.FC<IdealHangoutsGroupProps> = ({
  showIdealHangoutsExpanded,
  setShowIdealHangoutsExpanded,
  idealHangoutsOptions,
  idealHangouts,
  toggleIdealHangout,
  customHangoutInput,
  setCustomHangoutInput,
  addCustomHangout,
  saveProfileData,
  styles
}) => {
  return (
    <View style={styles.socialSection}>
      <TouchableOpacity 
        style={styles.musicHeader}
        onPress={() => setShowIdealHangoutsExpanded(!showIdealHangoutsExpanded)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Text style={styles.fieldLabel}>Ideal Hangouts</Text>
          {/* Ionicons chevron icon should be rendered by parent for consistency */}
        </View>
      </TouchableOpacity>
      {showIdealHangoutsExpanded && (
        <View style={[styles.expandedContent, { paddingHorizontal: 0 }]}> 
          <View style={{ height: 20 }} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {idealHangoutsOptions.map((hangout, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.hangoutButton,
                  idealHangouts.includes(hangout) && styles.hangoutButtonActive
                ]}
                onPress={() => toggleIdealHangout(hangout)}
              >
                <Text style={[
                  styles.hangoutText,
                  idealHangouts.includes(hangout) && styles.hangoutTextActive
                ]}>{hangout}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Display custom hangout entries as pills above the input */}
          {idealHangouts.filter(hangout => !idealHangoutsOptions.includes(hangout)).length > 0 && (
            <View style={styles.customMusicSection}>
              <View style={styles.genreGrid}>
                {idealHangouts
                  .filter(hangout => !idealHangoutsOptions.includes(hangout))
                  .map((customEntry, index) => (
                  <TouchableOpacity
                    key={`hangout-${index}`}
                    style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                    onPress={() => {
                      // Remove custom entry
                      // This should be handled by parent toggle or a remove handler
                    }}
                  >
                    <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.customInput}
              value={customHangoutInput}
              onChangeText={setCustomHangoutInput}
              placeholder="Add your favorite hangout"
              placeholderTextColor="#999"
              onSubmitEditing={addCustomHangout}
            />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={addCustomHangout}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default IdealHangoutsGroup;

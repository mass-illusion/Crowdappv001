
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IdentifyAsGroupProps {
  showIdentitiesExpanded: boolean;
  setShowIdentitiesExpanded: (show: boolean) => void;
  IDENTITY_OPTIONS: string[];
  selectedIdentities: string[];
  toggleIdentity: (identity: string) => void;
  styles: any;
}

const IdentifyAsGroup: React.FC<IdentifyAsGroupProps> = ({
  showIdentitiesExpanded,
  setShowIdentitiesExpanded,
  IDENTITY_OPTIONS,
  selectedIdentities,
  toggleIdentity,
  styles
}) => {
  return (
    <View style={styles.interestCategory}>
      <TouchableOpacity 
        style={styles.musicHeader}
        onPress={() => setShowIdentitiesExpanded(!showIdentitiesExpanded)}
      >
        <Text style={styles.fieldLabel}>Identify As</Text>
        {/* Ionicons chevron icon should be rendered by parent for consistency */}
      </TouchableOpacity>
      {showIdentitiesExpanded && (
        <View style={[styles.expandedContent, { paddingHorizontal: 8 }]}> 
          <View style={{ height: 12 }} />
          <View style={styles.genreGrid}>
            {IDENTITY_OPTIONS.map((identity, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.musicGenreButton,
                  selectedIdentities.includes(identity) && styles.genreButtonActive
                ]}
                onPress={() => toggleIdentity(identity)}
              >
                <Text style={[
                  styles.genreText,
                  selectedIdentities.includes(identity) && styles.genreTextActive
                ]}>
                  {identity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default IdentifyAsGroup;

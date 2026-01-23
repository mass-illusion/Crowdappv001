import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface FriendGroupProps {
  showFriendGroupExpanded: boolean;
  setShowFriendGroupExpanded: (show: boolean) => void;
  FRIEND_GROUP_OPTIONS: string[];
  selectedFriendGroup: string[];
  toggleFriendGroup: (role: string) => void;
  styles: any;
}

const FriendGroup: React.FC<FriendGroupProps> = ({
  showFriendGroupExpanded,
  setShowFriendGroupExpanded,
  FRIEND_GROUP_OPTIONS,
  selectedFriendGroup,
  toggleFriendGroup,
  styles
}) => {
  // Emoji mapping for friend group roles
  const roleEmojis: Record<string, string> = {
    'The Planner': '🗓️',
    'Mom/Dad': '🧑‍🍼',
    'The Therapist': '🧠',
    'The Joker': '🤣',
    'The Party Animal': '🍻',
    'The Bookworm': '📚',
    'The Chill One': '😎',
    'The Overachiever': '🏆',
    'The Outsider': '👤',
    'The Emotional One': '😭', // or 🥹 for second row
  };

  const half = Math.ceil(FRIEND_GROUP_OPTIONS.length / 2);

  return (
    <View style={styles.fieldGroup}>
      <TouchableOpacity 
        style={styles.musicHeader}
        onPress={() => setShowFriendGroupExpanded(!showFriendGroupExpanded)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Text style={styles.fieldLabel}>In the Friend Group, I'm</Text>
          {/* Ionicons chevron icon should be rendered by parent for consistency */}
        </View>
      </TouchableOpacity>
      {showFriendGroupExpanded && (
        <View style={[styles.expandedContent, { paddingHorizontal: 8, marginTop: 12 }]}> 
          <View style={{ flexDirection: 'column' }}>
            {/* First row */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: 'row' }}>
                {FRIEND_GROUP_OPTIONS.slice(0, half).map((role, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.musicGenreButton,
                      selectedFriendGroup.includes(role) && styles.genreButtonActive,
                      { marginRight: 12, marginBottom: 10 }
                    ]}
                    onPress={() => toggleFriendGroup(role)}
                  >
                    <Text style={[
                      styles.genreText,
                      selectedFriendGroup.includes(role) && styles.genreTextActive
                    ]}>
                      {roleEmojis[role] ? `${roleEmojis[role]} ` : ''}{role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            {/* Second row */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                {FRIEND_GROUP_OPTIONS.slice(half).map((role, index) => (
                  <TouchableOpacity
                    key={index + half}
                    style={[
                      styles.musicGenreButton,
                      selectedFriendGroup.includes(role) && styles.genreButtonActive,
                      { marginRight: 12, marginBottom: 8 }
                    ]}
                    onPress={() => toggleFriendGroup(role)}
                  >
                    <Text style={[
                      styles.genreText,
                      selectedFriendGroup.includes(role) && styles.genreTextActive
                    ]}>
                      {/* Use 🥹 for 'The Emotional One' in second row */}
                      {role === 'The Emotional One' ? '🥹 ' : (roleEmojis[role] ? `${roleEmojis[role]} ` : '')}{role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default FriendGroup;

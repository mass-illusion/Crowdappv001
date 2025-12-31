import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from 'expo-router';

const PREFERENCES = [
  { key: 'realFriends', label: 'Real Friends', icon: require('../assets/images/realfriends.png') },
  { key: 'eventBuddies', label: 'Event Buddies', icon: require('../assets/images/eventbuddies.png') },
  { key: 'industryPeers', label: 'Industry Peers', icon: require('../assets/images/industrypeers.png') },
  { key: 'sharedPassions', label: 'Shared Passions', icon: require('../assets/images/sharedpassion.png') },
  { key: 'friendGroups', label: 'Friend Groups', icon: require('../assets/images/friendgroups.png') },
  { key: 'microCommunity', label: 'Micro Community', icon: require('../assets/images/microcomunities.png') },
];

const LookingForScreen: React.FC = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const toggle = (key: string) => {
    setSelected(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrowButton} onPress={() => router.replace('/Upload')}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>I'm looking for...</Text>
      <Text style={styles.subtext}>Get specific! You can always change this later.</Text>
      <View style={styles.boxShadowWrap}>
        <View style={styles.prefBox}>
          <View style={styles.prefRow}>
            {PREFERENCES.slice(0, 3).map((item, idx) => (
              <Pressable
                key={item.key}
                style={[styles.prefItem, selected[item.key] && styles.prefItemSelected]}
                onPress={() => toggle(item.key)}
              >
                <Image
                  source={item.icon}
                  style={[
                    styles.prefIcon,
                    item.key === 'eventBuddies' && { marginBottom: 18 },
                    !selected[item.key] && styles.prefIconGrey
                  ]}
                />
                <View style={styles.prefLabelWrap}>
                  <Text style={[styles.prefLabel, selected[item.key] && styles.prefLabelSelected]}>
                    {item.key === 'realFriends'
                      ? 'Real\nFriends'
                      : item.key === 'friendGroups'
                      ? 'Friend\nGroups'
                      : item.label}
                  </Text>
                </View>
                {selected[item.key] && <View style={styles.checkCircle}><View style={styles.checkDot} /></View>}
              </Pressable>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.prefRow}>
            {PREFERENCES.slice(3).map((item, idx) => (
              <Pressable
                key={item.key}
                style={[styles.prefItem, selected[item.key] && styles.prefItemSelected]}
                onPress={() => toggle(item.key)}
              >
                <Image source={item.icon} style={styles.prefIcon} />
                <View style={styles.prefLabelWrap}>
                  <Text style={[styles.prefLabel, selected[item.key] && styles.prefLabelSelected]}>
                    {item.key === 'friendGroups' ? 'Friend\nGroups' : item.label}
                  </Text>
                </View>
                {selected[item.key] && <View style={styles.checkCircle}><View style={styles.checkDot} /></View>}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backArrowButton: {
    position: 'absolute',
    top: 70,
    left: 32,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 10,
  },
  backArrowText: {
    fontSize: 32,
    color: '#e0e0e0',
    textShadowColor: '#e0e0e0',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7CA6D9',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 32,
  },
  subtext: {
    fontSize: 16,
    color: '#AAB8C2',
    marginBottom: 32,
    alignSelf: 'flex-start',
    marginLeft: 32,
  },
  boxShadowWrap: {
    marginTop: 32,
    borderRadius: 24,
    shadowColor: '#B0B8C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  prefBox: {
    backgroundColor: '#F8F9FB',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    gap: 0,
  },
  prefItem: {
    width: 104,
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    borderRadius: 16,
    marginHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
    position: 'relative',
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
  },
    prefLabelWrap: {
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  prefItemSelected: {
    opacity: 1,
    backgroundColor: '#E6F0FB',
  },
  prefIcon: {
    width: 36,
    height: 36,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  prefIconGrey: {
    tintColor: '#D3D6DB',
  },
  prefLabel: {
    fontSize: 16,
    color: '#AAB8C2',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  prefLabelSelected: {
    color: '#5A90D8',
  },
  checkCircle: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#5A90D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5A90D8',
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#E6E9ED',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
});

export default LookingForScreen;

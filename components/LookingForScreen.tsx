import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SvgEventbuddies from '../assets/images/eventbuddies.svg';
import SvgFriendgroup from '../assets/images/friendgroup.svg';
import SvgMicrocommunity from '../assets/images/microcommunity.svg';
import SvgRealfriends from '../assets/images/realfriends.svg';
import SvgSharedpassion from '../assets/images/sharedpassion.svg';

const PREFERENCES = [
  { key: 'realFriends', label: 'Real\nFriends', icon: SvgRealfriends },
  { key: 'eventBuddies', label: 'Event\nBuddies', icon: SvgEventbuddies },
  { key: 'industryPeers', label: 'Industry\nPeers', icon: null },
  { key: 'sharedPassions', label: 'Shared\nPassions', icon: SvgSharedpassion },
  { key: 'friendGroups', label: 'Friend\nGroups', icon: SvgFriendgroup },
  { key: 'microCommunity', label: 'Micro\nCommunity', icon: SvgMicrocommunity },
];

interface LookingForScreenProps {
  onComplete?: () => void;
}

const LookingForScreen: React.FC<LookingForScreenProps> = ({ onComplete }) => {
  const router = useRouter();
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const toggle = (key: string) => {
    setSelected(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
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
                {item.icon ? <item.icon width={36} height={36} style={styles.prefIcon} /> : null}
                <Text style={[styles.prefLabel, selected[item.key] && styles.prefLabelSelected]}>{item.label}</Text>
                {selected[item.key] && <View style={styles.checkCircle}><View style={styles.checkDot} /></View>}
              </Pressable>
            ))}
          </View>
          <View style={styles.prefRow}>
            {PREFERENCES.slice(3).map((item, idx) => (
              <Pressable
                key={item.key}
                style={[styles.prefItem, selected[item.key] && styles.prefItemSelected]}
                onPress={() => toggle(item.key)}
              >
                {item.icon ? <item.icon width={36} height={36} style={styles.prefIcon} /> : null}
                <Text style={[styles.prefLabel, selected[item.key] && styles.prefLabelSelected]}>{item.label}</Text>
                {selected[item.key] && <View style={styles.checkCircle}><View style={styles.checkDot} /></View>}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => { if (onComplete) onComplete(); }} style={{marginTop: 32}}>
        <Text style={{fontSize: 20, color: '#5A90D8'}}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backArrowButton} onPress={() => router.replace('/Upload')}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 32}} onPress={() => router.replace('/also')}>
        <Text style={{fontSize: 20, color: '#5A90D8'}}>Go to Also Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backArrowButton: {
    position: 'absolute',
    top: 40,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  prefItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 2,
    position: 'relative',
  },
  prefItemSelected: {
    opacity: 1,
    backgroundColor: '#E6F0FB',
  },
  prefIcon: {
    width: 36,
    height: 36,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  prefLabel: {
    fontSize: 15,
    color: '#AAB8C2',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 0,
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
    marginVertical: 8,
  },
});

export default LookingForScreen;

import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import SvgEventbuddies from '../assets/images/eventbuddies.svg';
import SvgFindMyCrowdWhite from '../assets/images/findmycrowdwhite.svg';
import SvgFriendgroup from '../assets/images/friendgroup.svg';
import SvgIndustrypeers from '../assets/images/industrypeers.svg';
import SvgMicrocommunity from '../assets/images/microcommunity.svg';
import SvgPineapple2 from '../assets/images/pineapple2.svg';
import SvgRealfriends from '../assets/images/realfriends.svg';
import SvgSharedpassion from '../assets/images/sharedpassion.svg';

const PREFERENCES = [
  { key: 'realFriends', label: 'Real Friends', icon: SvgRealfriends },
  { key: 'eventBuddies', label: 'Event Buddies', icon: SvgEventbuddies },
  { key: 'industryPeers', label: 'Industry Peers', icon: SvgIndustrypeers },
  { key: 'sharedPassions', label: 'Shared Passions', icon: SvgSharedpassion },
  { key: 'friendGroups', label: 'Friend Groups', icon: SvgFriendgroup },
  { key: 'microCommunity', label: 'Micro Community', icon: SvgMicrocommunity },
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

  const { width } = useWindowDimensions();
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
                {item.icon ? <item.icon width={36} height={36} style={[
                  styles.prefIcon,
                  item.key === 'realFriends' && { marginTop: 6 }
                ]} /> : null}
                <View style={styles.prefLabelWrap}>
                  <Text
                    style={[
                      styles.prefLabel,
                      selected[item.key] && styles.prefLabelSelected
                    ]}
                  >
                    {item.key === 'sharedPassions' ? 'Shared\nPassions'
                      : item.key === 'friendGroups' ? 'Friend\nGroups'
                      : item.key === 'microCommunity' ? 'Micro\nCommunity'
                      : item.label.split(' ').join('\n')}
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
                {item.icon ? <item.icon width={36} height={36} style={styles.prefIcon} /> : null}
                <View style={styles.prefLabelWrap}>
                  <Text
                    style={[
                      styles.prefLabel,
                      selected[item.key] && styles.prefLabelSelected
                    ]}
                  >
                    {item.key === 'sharedPassions' ? 'Shared\nPassions'
                      : item.key === 'friendGroups' ? 'Friend\nGroups'
                      : item.key === 'microCommunity' ? 'Micro\nCommunity'
                      : item.label.split(' ').join('\n')}
                  </Text>
                </View>
                {selected[item.key] && <View style={styles.checkCircle}><View style={styles.checkDot} /></View>}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <SvgPineapple2 width={width * 0.8} height={170} style={styles.bunnyFriends} />
        <TouchableOpacity style={styles.findMyCrowdButton} onPress={() => router.replace('/also')}>
          <SvgFindMyCrowdWhite width={width * 0.8} height={80} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Removed duplicate export default
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
    color: '#A2CCF2',
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
    marginTop: 8,
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
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 0,
    width: 284,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 0,
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
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E6E9ED',
  },
  prefLabelWrap: {
    marginTop: 8,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  prefItemSelected: {
    opacity: 1,
    backgroundColor: '#E6F0FB',
    borderColor: '#5A90D8',
    borderRightWidth: 2,
    borderBottomWidth: 2,
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
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 18,
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
    marginTop: 12,
    marginBottom: 12,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  findMyCrowdButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 8,
  },
  bunnyFriends: {
    marginBottom: -12,
    marginTop: 300,
  },
});

export default LookingForScreen;

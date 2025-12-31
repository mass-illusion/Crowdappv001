import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SittingMascot from '../assets/images/sitting.svg';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Non-binary', value: 'nonbinary' },
];

interface GenderScreenProps {
  onNext: (gender: string) => void;
  onMascotPress?: () => void;
  onSwipeRight?: () => void;
}

const GenderScreen: React.FC<GenderScreenProps> = ({ onNext, onMascotPress, onSwipeRight }) => {
  const [selected, setSelected] = useState<string>('female');
  let startX: number | null = null;

  return (
    <View
      style={styles.container}
      onTouchStart={e => { startX = e.nativeEvent.pageX; }}
      onTouchEnd={e => {
        if (startX !== null && e.nativeEvent.pageX - startX > 60 && onSwipeRight) {
          onSwipeRight();
        }
        startX = null;
      }}
    >
      <View style={styles.card}>
        {genderOptions.map(option => (
          <Text
            key={option.value}
            style={[
              styles.option,
              selected === option.value && styles.selectedOption,
              { backgroundColor: '#fafbfc' },
            ]}
            onPress={() => setSelected(option.value)}
            suppressHighlighting={true}
          >
            {option.label}
          </Text>
        ))}
        <Text style={styles.header}>Gender</Text>
      </View>
      <TouchableOpacity onPress={onMascotPress} activeOpacity={0.7}>
        <SittingMascot width={275} height={275} style={mascotStyle} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrowButton} onPress={() => onNext(selected)}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fafbfc',
    borderRadius: 32,
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: -20, // Restore previous space between card and mascot
    marginTop: 200, // Even more top margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  option: {
    fontSize: 38,
    color: '#bbb',
    fontWeight: '500',
    marginVertical: 8,
    textAlign: 'center',
  },
  selectedOption: {
    color: '#222',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 56,
    color: '#D3D3D3',
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 12,
    textShadowColor: '#bbb',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  arrowButton: {
    position: 'absolute',
    top: 40,
    right: 32,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 10,
  },
  arrowText: {
    fontSize: 32,
    color: '#e0e0e0', // lighter grey
    textShadowColor: '#e0e0e0',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

const mascotStyle = {
  marginTop: 10,
  marginBottom: 48, // Increased bottom margin for more spacing
  alignSelf: 'center' as const,
  width: 275,
  height: 275,
  marginLeft: 24, // Move mascot slightly to the right
};

export default GenderScreen;

import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SittingMascot from '../assets/images/sitting.svg';

const { height } = Dimensions.get('window');

const ITEM_HEIGHT = 48;

const AGE_MIN = 18;
const AGE_MAX = 99;
const ages = Array.from({ length: AGE_MAX - AGE_MIN + 1 }, (_, i) => AGE_MIN + i);

const AgeScreen: React.FC = () => {
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState<number>(25);
  const flatListRef = React.useRef<FlatList<number>>(null);

  const handleNext = () => {
    // Navigate to upload screen
    router.replace('/Upload');
  };

  const handleBack = () => {
    router.replace('/gender');
  };

  const handleMascotPress = () => {
    handleNext();
  };



  // Scroll to initial selected age on mount only
  React.useEffect(() => {
    const index = ages.indexOf(selectedAge);
    if (flatListRef.current && index >= 0) {
      flatListRef.current.scrollToOffset({
        offset: (index - 2) * ITEM_HEIGHT,
        animated: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrowButton} onPress={handleBack}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.pickerContainer}>
          <FlatList
            ref={flatListRef}
            data={ages}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
            getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
            renderItem={({ item }) => (
              <Text style={[styles.ageOption, item === selectedAge && styles.selectedAge]}>{item}</Text>
            )}
            onScroll={e => {
              const offsetY = e.nativeEvent.contentOffset.y;
              let index = Math.round(offsetY / ITEM_HEIGHT);
              // Clamp index to valid range
              if (index < 0) index = 0;
              if (index > ages.length - 1) index = ages.length - 1;
              setSelectedAge(ages[index]);
            }}
            onMomentumScrollEnd={e => {
              const offsetY = e.nativeEvent.contentOffset.y;
              let index = Math.round(offsetY / ITEM_HEIGHT);
              // Clamp index to valid range
              if (index < 0) index = 0;
              if (index > ages.length - 1) index = ages.length - 1;
              setSelectedAge(ages[index]);
            }}
            onScrollBeginDrag={() => {
              // Optional: Could add haptic feedback here
            }}
            scrollEventThrottle={1}
            initialScrollIndex={ages.indexOf(selectedAge) - 2}
          />
        </View>
        <Text style={styles.ageLabel}>Age</Text>
      </View>
      <TouchableOpacity onPress={handleMascotPress} activeOpacity={0.7}>
        <SittingMascot width={275} height={275} style={styles.mascot} />
      </TouchableOpacity>
    </View>
  );
}

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
    color: '#e0e0e0', // lighter grey to match right arrow
    textShadowColor: '#e0e0e0',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  card: {
    width: '92%',
    backgroundColor: 'transparent',
    borderRadius: 32,
    alignItems: 'center',
    paddingTop: 96, // Increased top padding to push content down
    paddingBottom: 24,
    marginTop: 64, // Keep card in place
  },
  pickerContainer: {
    height: ITEM_HEIGHT * 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
  },
  ageOption: {
    fontSize: 32,
    color: '#bbb',
    height: ITEM_HEIGHT,
    textAlign: 'center',
    lineHeight: ITEM_HEIGHT,
  },
  selectedAge: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 38,
  },
  ageLabel: {
    fontSize: 56,
    color: '#D3D3D3',
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    textShadowColor: '#bbb',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    alignSelf: 'center',
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
  mascot: {
    marginTop: -24, // Move SVG even closer to Age text
    marginBottom: 40, // Reduced bottom margin to bring mascot closer to card
    alignSelf: 'center',
    width: 275,
    height: 275,
    marginLeft: 24, // Move mascot slightly to the right
  },

});

export default AgeScreen;

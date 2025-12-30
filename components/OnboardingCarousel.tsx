import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Onboarding1 from '../assets/onboarding1.svg';
import Onboarding2 from '../assets/onboarding2.svg';
import Onboarding3 from '../assets/onboarding3.svg';

const { width, height } = Dimensions.get('window');

interface OnboardingCarouselProps {
  onComplete: () => void;
  onBack?: () => void;
}

export default function OnboardingCarousel({ onComplete, onBack }: OnboardingCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: 'Event Buddies',
      description: "Attending a Live Event? See who's going before. Let us automate the social introductions.",
      SvgComponent: Onboarding1,
    },
    {
      title: 'Real Friends',
      description: "Don't force it! Let AI find people that are passionate about the same things as you.",
      SvgComponent: Onboarding2,
    },
    {
      title: 'Friend Groups',
      description: 'Create a friend group. Start a group chat directly in the app, and start your adventure!',
      SvgComponent: Onboarding3,
    },
  ];

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const currentSlide = onboardingData[currentPage];
  const SvgComponent = currentSlide.SvgComponent;
  const imageWidth = currentPage === 0 ? width * 0.65 : currentPage === 1 ? width * 0.6 : width * 0.75;
  const imageHeight = currentPage === 0 ? height * 0.36 : currentPage === 1 ? height * 0.33 : height * 0.42;

  return (
    <View style={styles.container}>
      <View style={[styles.page, currentPage === 0 && styles.pageFirst]}>
        <View style={[
          styles.imageContainer, 
          currentPage === 0 && styles.imageContainerFirst,
          currentPage === 1 && styles.imageContainerSecond
        ]}>
          <SvgComponent width={imageWidth} height={imageHeight} />
        </View>
        <Text style={[styles.title, currentPage === 1 && styles.titleSecond, currentPage === 2 && styles.titleThird]}>{currentSlide.title}</Text>
        <Text style={[styles.description, currentPage === 1 && styles.descriptionSecond, currentPage === 2 && styles.descriptionThird]}>{currentSlide.description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.centerControls}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.pagination}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentPage === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  pageFirst: {
    paddingTop: 120,
  },
  imageContainer: {
    marginBottom: -70,
  },
  imageContainerFirst: {
    marginBottom: -30,
    marginTop: -40,
  },
  imageContainerSecond: {
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
    marginBottom: 40,
  },
  titleContainer: {
    height: 60,
    marginBottom: 10,
    width: '100%',
  },
  titleGradient: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#A2CCF2',
    textAlign: 'left',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  titleSecond: {
    textAlign: 'center',
    marginLeft: 0,
    paddingHorizontal: 0,
    alignSelf: 'center',
    width: '100%',
    fontSize: 36,
    marginBottom: 10,
  },
  titleThird: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 18,
    color: '#A2CCF2',
    textAlign: 'left',
    lineHeight: 28,
    paddingLeft: 20,
    paddingRight: 8,
  },
  descriptionSecond: {
    paddingLeft: 30,
    paddingRight: 8,
    width: '100%',
    textAlign: 'left',
    lineHeight: 28,
    fontSize: 18,
  },
  descriptionThird: {
    paddingLeft: 30,
    paddingRight: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  skipText: {
    fontSize: 18,
    color: '#A2CCF2',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#666',
  },
  disabledButton: {
    backgroundColor: '#F5F5F5',
    opacity: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: '#A2CCF2',
    width: 30,
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextIcon: {
    fontSize: 24,
    color: '#666',
  },
});

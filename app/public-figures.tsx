import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FindMyCrowdWhite from '../assets/images/findmycrowdwhite.svg';

const PUBLIC_FIGURES = [
  { name: 'Alex Hormozi', emoji: '📈' },
  { name: 'Theo Von', emoji: '🤣' },
  { name: 'Cardi B', emoji: '👜' },
  { name: 'Gary Vee', emoji: '📱' },
  { name: 'Alex Earl', emoji: '🎙️' },
  { name: 'Joe Rogan', emoji: '🦬' },
  { name: 'Ryan Trahan', emoji: '🚗' },
  { name: 'Ralph Barbosa', emoji: '😂' },
  { name: 'Kardashians', emoji: '💄' },
  { name: 'Tom Holland', emoji: '🎭' },
  { name: 'Sam Sulek', emoji: '🏋️' },
  { name: 'Chloe Shih', emoji: '💻' },
  { name: 'Emma Chamberlin', emoji: '☕' },
  { name: 'Daniel Mac', emoji: '🕶️' },
  { name: 'garbo.zhu', emoji: '🎨' },
  { name: 'Kristy Sarah', emoji: '😊' },
  { name: 'IShowSpeed', emoji: '🏎️' },
  { name: 'rafaeltats', emoji: '🖼️' },
  { name: 'Steven Bartlett', emoji: '🎙️' },
  { name: 'POV Husband', emoji: '🥘' },
  { name: 'Jake Paul', emoji: '🥊' },
  { name: 'Kai Cenat', emoji: '📹' },
  { name: 'Vanilla Mace', emoji: '💅' },
  { name: 'Blue Face', emoji: '🔹' },
];

interface PublicFiguresProps {
  onComplete?: () => void;
}

const PublicFigures: React.FC<PublicFiguresProps> = ({ onComplete }) => {
  const router = useRouter();
  const [selectedFigures, setSelectedFigures] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFigure = (figureName: string) => {
    setSelectedFigures(prev => 
      prev.includes(figureName) 
        ? prev.filter(name => name !== figureName)
        : [...prev, figureName]
    );
  };

  const filteredFigures = PUBLIC_FIGURES.filter(figure =>
    figure.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedFigures.length >= 1) {
      // Navigate to homepage
      router.replace('/homepage');
      console.log('Selected figures:', selectedFigures);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace('/interests')}
        activeOpacity={0.7}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Public Figures</Text>
      <Text style={styles.subtext}>
        Share people you follow. We'll get an idea of content you enjoy and find people to share it with.
      </Text>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search public figure"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#C7C7CC"
          />
        </View>
      </View>

      <View style={styles.selectionInfo}>
        <Text style={styles.selectionText}>Select at least 1 interest</Text>
        <Text style={styles.selectionCount}>{selectedFigures.length} out of 1 selected</Text>
      </View>

      <ScrollView style={styles.figuresContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.figuresGrid}>
          {filteredFigures.map((figure) => (
            <TouchableOpacity
              key={figure.name}
              activeOpacity={0.7}
              style={[
                styles.figureButton,
                selectedFigures.includes(figure.name) && styles.figureButtonSelected
              ]}
              onPress={() => toggleFigure(figure.name)}
            >
              {figure.emoji && <Text style={styles.figureEmoji}>{figure.emoji}</Text>}
              <Text style={[
                styles.figureText,
                selectedFigures.includes(figure.name) && styles.figureTextSelected
              ]}>
                {figure.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: selectedFigures.length >= 1 ? 1 : 0.5 }
          ]}
          onPress={handleNext}
          disabled={selectedFigures.length < 1}
        >
          <FindMyCrowdWhite width={300} height={75} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginTop: -10,
    marginBottom: 8,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A2CCF2',
    marginBottom: 16,
  },
  subtext: {
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 22,
    marginBottom: 32,
  },
  searchContainer: {
    marginBottom: 32,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  selectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectionText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  selectionCount: {
    fontSize: 16,
    color: '#8E8E93',
  },
  figuresContainer: {
    flex: 1,
  },
  figuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  figureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    width: '48%',
  },
  figureButtonSelected: {
    backgroundColor: '#8CC7FF',
    borderColor: '#8CC7FF',
  },
  figureEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  figureText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  figureTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PublicFigures;
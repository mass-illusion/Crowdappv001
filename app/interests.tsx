import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import SvgFindMyCrowdWhite from '../assets/images/findmycrowdwhite.svg';

const INTERESTS = [
  { id: 'music', label: 'Music', emoji: '🎧' },
  { id: 'business', label: 'Business', emoji: '📈' },
  { id: 'sports', label: 'Sports', emoji: '🏀' },
  { id: 'raves', label: 'Raving', emoji: '🕺' },
  { id: 'fitness', label: 'Fitness', emoji: '🏋️' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'parenting', label: 'Parenting', emoji: '👶' },
  { id: 'filmContent', label: 'Content', emoji: '🎬' },
  { id: 'dj', label: 'DJ', emoji: '🎧' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'pets', label: 'Animals', emoji: '🐶' },
  { id: 'photography', label: 'Photos', emoji: '📷' },
  { id: 'reading', label: 'Reading', emoji: '📚' },
  { id: 'anime', label: 'Anime', emoji: '👾' },
  { id: 'singing', label: 'Singing', emoji: '🎤' },
  { id: 'technology', label: 'Tech', emoji: '📱' },
  { id: 'travel', label: 'Travel', emoji: '🗺️' },
  { id: 'writing', label: 'Writing', emoji: '📝' },
  { id: 'cooking', label: 'Cooking', emoji: '🍳' },
  { id: 'cinema', label: 'Cinema', emoji: '🎬' },
  { id: 'investing', label: 'Investing', emoji: '💰' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'cars', label: 'Cars', emoji: '🏎️' },
  { id: 'hiking', label: 'Hiking', emoji: '🥾' },
  { id: 'art', label: 'Art', emoji: '🎨' },
  { id: 'boardGames', label: 'Chess', emoji: '♟️' },
  { id: 'musicians', label: 'Jammin', emoji: '🎻' },
  { id: 'partying', label: 'Partying', emoji: '🎉' },
  { id: 'lgbtRights', label: 'LGBT', emoji: '🏳️‍🌈' },
  { id: 'disney', label: 'Disney', emoji: '🏰' },
  { id: 'concerts', label: 'Concerts', emoji: '🎤' },
  { id: 'ai', label: 'AI', emoji: '🤖' },
  { id: 'godFearing', label: 'God', emoji: '🙏' },
  { id: 'motorcycles', label: 'Motorcycles', emoji: '🏍️' },
  { id: 'beauty', label: 'Beauty', emoji: '💄' },
  { id: 'politics', label: 'Politics', emoji: '👨‍💼' },
  { id: 'conspiracies', label: 'Conspiracies', emoji: '👁️' },
  { id: 'founders', label: 'Founders', emoji: '💼' },
  { id: 'skating', label: 'Skate', emoji: '🛹' },
  { id: 'popCulture', label: 'Culture', emoji: '📱' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'food', label: 'Food', emoji: '🍔' },
  { id: 'running', label: 'Running', emoji: '🏃' },
  { id: 'camping', label: 'Camping', emoji: '🏕️' },
  { id: 'snowboarding', label: 'Snow', emoji: '🏂' },
];

const MUSIC_CATEGORIES = [
  'POP', 'EDM', 'ROCK', 'METAL', 'JAZZ',
  'R&B', 'HIP HOP', 'PUNK', '90s', 'K-POP',
  'INDIE', 'GOSPEL', 'CUMBIA', 'FOLK', '80s',
  'REGGAE', 'REGGAETON', 'CLASSICAL', '2000s', '60 & 70s',
  'CHILL', 'MUSICAL', 'SPANISH', 'WORLD', 'PROGRESSIVE',
  'COUNTRY', 'BLUES', 'EASY LISTENING', 'HOUSE', 'TRANCE', 'TECHNO', 'TRAP'
];

const EDM_GENRES = [
  'HOUSE', 'TECHNO', 'TECH HOUSE', 'DnB',
  'DUBSTEP', 'BASS', 'BASS HOUSE', 'TRAP',
  'HARDSTYLE', 'FUTURE BASS', 'AMBIENT', 'DEEP HOUSE',
  'MINIMAL', 'MAIN STAGE', 'PSY-TRANCE', 'TRANCE',
  'UK GARAGE', 'NU DISCO', 'MELODIC HOUSE', 'MELODIC TECHNO',
  'DOWNTEMPO', 'GRIME', 'BREAKBEAT', 'HARD TECHNO'
];

const SPORTS_TEAMS = [
  { id: 'nfl', label: 'NFL', emoji: '🏈' },
  { id: 'nba', label: 'NBA', emoji: '🏀' },
  { id: 'mlb', label: 'MLB', emoji: '⚾' },
  { id: 'nhl', label: 'NHL', emoji: '🏒' },
  { id: 'ufc', label: 'UFC', emoji: '🥊' }
];

const InterestsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [selectedMusicCategories, setSelectedMusicCategories] = useState<string[]>([]);
  const [showSportsModal, setShowSportsModal] = useState(false);
  const [selectedSportsTeams, setSelectedSportsTeams] = useState<string[]>([]);
  const [showEDMModal, setShowEDMModal] = useState(false);
  const [selectedEDMGenres, setSelectedEDMGenres] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    if (interestId === 'music') {
      setShowMusicModal(true);
      return;
    }
    
    if (interestId === 'sports') {
      setShowSportsModal(true);
      return;
    }
    
    if (interestId === 'raves') {
      setShowEDMModal(true);
      return;
    }
    
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const toggleMusicCategory = (category: string) => {
    setSelectedMusicCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const handleMusicModalClose = () => {
    if (selectedMusicCategories.length > 0) {
      setSelectedInterests(prev => 
        prev.includes('music') 
          ? prev
          : [...prev, 'music']
      );
    }
    setShowMusicModal(false);
  };

  const toggleSportsTeam = (teamId: string) => {
    setSelectedSportsTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSportsModalClose = () => {
    if (selectedSportsTeams.length > 0) {
      setSelectedInterests(prev => 
        prev.includes('sports') 
          ? prev
          : [...prev, 'sports']
      );
    }
    setShowSportsModal(false);
  };

  const toggleEDMGenre = (genre: string) => {
    setSelectedEDMGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleEDMModalClose = () => {
    setShowEDMModal(false);
    if (selectedEDMGenres.length > 0) {
      setSelectedInterests(prev => 
        prev.includes('raves') 
          ? prev
          : [...prev, 'raves']
      );
    }
  };


  const filteredInterests = INTERESTS.filter(interest =>
    interest.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedInterests.length >= 5) {
      // Navigate to public figures screen
      router.replace('/public-figures');
      console.log('Selected interests:', selectedInterests);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity 
        style={styles.backArrow} 
        onPress={() => router.replace('/also')}
      >
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Share your Passions</Text>
      <Text style={styles.subtext}>
        Share your interests, passions, and hobbies. We'll connect you with people who share your enthusiasm.
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search interest"
          placeholderTextColor="#C7C7CC"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Select at least 5 interest</Text>
        <Text style={styles.selectionCount}>{selectedInterests.length} out of 5 selected</Text>
      </View>

      <ScrollView style={styles.interestsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.interestsGrid}>
          {filteredInterests.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              activeOpacity={0.7}
              style={[
                styles.interestButton,
                interest.id === 'art' && styles.artButton,
                interest.id === 'ai' && styles.aiButton,
                interest.id === 'godFearing' && styles.godFearingButton,
                interest.id === 'concerts' && styles.concertsButton,
                interest.id === 'partying' && styles.partyingButton,
                interest.id === 'business' && styles.businessButton,
                interest.id === 'parenting' && styles.parentingButton,
                interest.id === 'investing' && styles.investingButton,
                interest.id === 'shopping' && styles.shoppingButton,
                interest.id === 'motorcycles' && styles.motorcyclesButton,
                interest.id === 'food' && styles.foodButton,
                interest.id === 'politics' && styles.politicsButton,
                interest.id === 'conspiracies' && styles.conspiraciesButton,
                interest.id === 'beauty' && styles.beautyButton,
                interest.id === 'founders' && styles.foundersButton,
                interest.id === 'skating' && styles.skatingButton,
                interest.id === 'camping' && styles.campingButton,
                selectedInterests.includes(interest.id) && styles.interestButtonSelected
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text style={styles.interestEmoji}>{interest.emoji}</Text>
              <Text style={[
                styles.interestText,
                selectedInterests.includes(interest.id) && styles.interestTextSelected
              ]}>
                {interest.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.findButton,
            { opacity: selectedInterests.length >= 5 ? 1 : 0.5 }
          ]}
          onPress={handleNext}
          disabled={selectedInterests.length < 5}
        >
          <SvgFindMyCrowdWhite width={width * 0.85} height={80} />
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={showMusicModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.musicModalContainer}>
            <View style={styles.musicModalHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowMusicModal(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              
              <Text style={styles.musicModalTitle}>Your Music</Text>
              <Text style={styles.musicModalSubtext}>Pick all the styles you love</Text>
            </View>
            
            <ScrollView style={styles.musicCategoriesContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.musicCategoriesGrid}>
                {MUSIC_CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.musicCategoryButton,
                      selectedMusicCategories.includes(category) && styles.musicCategoryButtonSelected
                    ]}
                    onPress={() => toggleMusicCategory(category)}
                  >
                    <Text style={[
                      styles.musicCategoryText,
                      selectedMusicCategories.includes(category) && styles.musicCategoryTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.musicModalBottom}>
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={handleMusicModalClose}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </Modal>

        {/* Sports Teams Modal */}
        <Modal
        visible={showSportsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleSportsModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.musicModalContainer}>
            <View style={styles.musicModalHeader}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowSportsModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              
              <Text style={styles.musicModalTitle}>Your Sport</Text>
              <Text style={styles.musicModalSubtext}>Select your teams when completing your profile</Text>
            </View>
            
            <View style={styles.sportsTeamsContainer}>
              {SPORTS_TEAMS.map((team) => (
                <TouchableOpacity
                  key={team.id}
                  activeOpacity={0.7}
                  style={[
                    styles.sportsTeamButton,
                    selectedSportsTeams.includes(team.id) && styles.sportsTeamButtonSelected
                  ]}
                  onPress={() => toggleSportsTeam(team.id)}
                >
                  <Text style={styles.sportsTeamEmoji}>{team.emoji}</Text>
                  <Text style={styles.sportsTeamText}>{team.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.musicModalBottom}>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleSportsModalClose}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* EDM Genres Modal */}
      <Modal
        visible={showEDMModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleEDMModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.musicModalContainer}>
            <View style={styles.musicModalHeader}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowEDMModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              
              <Text style={styles.musicModalTitle}>EDM GENRES</Text>
            </View>
            
            <ScrollView style={styles.edmGenresContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.edmGenresGrid}>
                {EDM_GENRES.map((genre) => (
                  <TouchableOpacity
                    key={genre}
                    activeOpacity={0.7}
                    style={[
                      styles.edmGenreButton,
                      selectedEDMGenres.includes(genre) && styles.edmGenreButtonSelected
                    ]}
                    onPress={() => toggleEDMGenre(genre)}
                  >
                    <Text style={styles.edmGenreText}>{genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.musicModalBottom}>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleEDMModalClose}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  progressContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  backArrow: {
    position: 'absolute',
    top: 70,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backArrowText: {
    fontSize: 24,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A2CCF2',
    marginBottom: 16,
    marginTop: 40,
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  selectionCount: {
    fontSize: 16,
    color: '#8E8E93',
  },
  interestsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    width: '31%',
  },
  artButton: {
    width: '23%',
  },
  aiButton: {
    width: '25%',
    paddingHorizontal: 16,
  },
  concertsButton: {
    width: '38%',
    paddingHorizontal: 16,
  },
  partyingButton: {
    width: '31%',
  },
  businessButton: {
    width: '36%',
  },
  parentingButton: {
    width: '36%',
  },
  investingButton: {
    width: '36%',
  },
  shoppingButton: {
    width: '35%',
  },
  motorcyclesButton: {
    width: '42%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  foodButton: {
    width: '26%',
  },
  politicsButton: {
    width: '28%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  conspiraciesButton: {
    width: '40%',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  beautyButton: {
    width: '28%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  foundersButton: {
    width: '32%',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  skatingButton: {
    width: '28%',
  },
  campingButton: {
    width: '35%',
  },
  godFearingButton: {
    width: '25%',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  interestButtonSelected: {
    backgroundColor: '#8CC7FF',
    borderColor: '#8CC7FF',
  },
  interestEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  interestText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  interestTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  findButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  musicModalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '85%',
    paddingTop: 20,
  },
  musicModalHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#8E8E93',
    fontWeight: '300',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Removed duplicate backArrowText style to fix object literal error
  placeholder: {
    width: 30,
    height: 30,
  },
  musicModalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A2CCF2',
    marginBottom: 8,
  },
  musicModalSubtext: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  musicCategoriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  musicCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  musicCategoryButton: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
  },
  musicCategoryButtonSelected: {
    backgroundColor: '#8CC7FF',
    borderColor: '#8CC7FF',
  },
  sportsTeamsContainer: {
    marginBottom: 20,
    marginTop: 30,
    alignSelf: 'center',
    width: '100%',
  },
  sportsTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 25,
    paddingHorizontal: 4,
    paddingVertical: 10,
    marginBottom: 20,
    width: 200,
    alignSelf: 'center',
  },
  sportsTeamButtonSelected: {
    backgroundColor: '#8CC7FF',
    borderColor: '#8CC7FF',
  },
  sportsTeamEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  sportsTeamText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  edmGenresContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  edmGenresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  edmGenreButton: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  edmGenreButtonSelected: {
    backgroundColor: '#8CC7FF',
    borderColor: '#8CC7FF',
  },
  edmGenreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  musicCategoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  musicCategoryTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  musicModalBottom: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  nextButton: {
    backgroundColor: '#A2CCF2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InterestsScreen;
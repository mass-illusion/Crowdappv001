import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function EditProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Core');
  const [userProfileImage, setUserProfileImage] = useState('https://via.placeholder.com/80');
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [dreamIs, setDreamIs] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const genderOptions = ['Male', 'Female', 'Non-binary'];
  const [ethnicity, setEthnicity] = useState('');
  const [showEthnicityDropdown, setShowEthnicityDropdown] = useState(false);
  const [importantCulture, setImportantCulture] = useState(false);
  const ethnicityOptions = [
    'Caucasian',
    'Latino',
    'African American',
    'Asian',
    'Native American',
    'Middle Eastern',
    'Multiracial',
    'Other',
    'Prefer not to say'
  ];
  const [occupation, setOccupation] = useState('');
  const [industry, setIndustry] = useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const industryOptions = [
    'Technology',
    'Healthcare & Medicine',
    'Finance & Banking',
    'Education',
    'Retail',
    'Customer Service',
    'Manufacturing',
    'Real Estate',
    'Sales',
    'Media & Entertainment',
    'Transportation & Logistics',
    'Food & Beverage',
    'Construction',
    'Energy & Utilities',
    'Government & Public Sector',
    'Non-Profit',
    'Agriculture',
    'Hospitality & Tourism',
    'Automotive',
    'Telecommunications',
    'Insurance',
    'Legal Services',
    'Consulting',
    'Marketing & Advertising',
    'Aerospace & Defense',
    'Pharmaceuticals',
    'Other'
  ];
  const [religion, setReligion] = useState('');
  const [showReligionDropdown, setShowReligionDropdown] = useState(false);
  const religionOptions = [
    'Christianity',
    'Catholic',
    'Judaism',
    'Islam',
    'Buddhism',
    'Hinduism',
    'Mormon',
    'Jehovah\'s Witness',
    'Agnostic',
    'Atheist',
    'Spiritual but not religious',
    'Non-denominational',
    'Other',
    'Prefer not to say'
  ];
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [primaryGoals, setPrimaryGoals] = useState<string[]>([]);
  const [socialStyle, setSocialStyle] = useState('');
  const [idealHangouts, setIdealHangouts] = useState<string[]>([]);
  const [customHangoutInput, setCustomHangoutInput] = useState('');
  const [showIdealHangoutsExpanded, setShowIdealHangoutsExpanded] = useState(false);
  const [showSocialGoals, setShowSocialGoals] = useState(false);
  const [showSocialStyle, setShowSocialStyle] = useState(false);
  const [showIdealHangouts, setShowIdealHangouts] = useState(false);
  const relationshipOptions = [
    'Single',
    'In a relationship',
    'Married',
    'Engaged',
    'Situationship',
    'Separated',
    'Divorced',
    'Widowed',
    'Ethical non-monogamy',
    'Prefer not to say'
  ];
  const primaryGoalsOptions = [
    'Find friends in my city',
    'Meet people at events',
    'Join hobby groups',
    'Collaborate professionally',
    'Travel buddies',
    'Deep 1:1 connections'
  ];
  const socialStyleOptions = [
    '👥 Small group',
    '🎉 Large scene',
    '💬 1:1 hangouts'
  ];
  const idealHangoutsOptions = [
    '☕ Coffee',
    '🎵 Concerts',
    '💅 Nails',
    '💪 Workouts',
    '🎮 Game nights',
    '🌿 420',
    '🔥 BBQ',
    '🎨 Creative',
    '🏔️ Outdoors',
    '🛠️ Building something',
    '🎣 Fishing',
    '🍽️ Food & Drinks',
    '🕺 Club',
    '🎬 Movies',
    '🍻 Sports bar',
    '🧳 Weekend getaway',
    '🚙 Offroading',
    '💆‍♀️ Spa Day',
    '🛍️ Shop',
    '🤱 Mom Hangs',
    '🏟️ Sports Game',
    '🍄 Psychedelics',
    '📱 Make Content',
    '🏠 Stay In',
    '💻 Online',
  ];
  const [showOnProfile, setShowOnProfile] = useState(true);

  // Load saved profile data when screen opens
  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [])
  );

  const saveProfileData = async () => {
    try {
      // Save all profile data to AsyncStorage with correct keys
      await AsyncStorage.setItem('fullName', firstName); // Save full name
      await AsyncStorage.setItem('firstName', firstName.split(' ')[0] || firstName); // Save first name for compatibility
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('aboutMe', aboutMe);
      await AsyncStorage.setItem('dreamIs', dreamIs);
      await AsyncStorage.setItem('userLocation', location); // Use userLocation key
      await AsyncStorage.setItem('age', age);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('ethnicity', ethnicity);
      await AsyncStorage.setItem('occupation', occupation);
      await AsyncStorage.setItem('industry', industry);
      await AsyncStorage.setItem('religion', religion);
      await AsyncStorage.setItem('relationshipStatus', relationshipStatus);
      await AsyncStorage.setItem('userProfileImage', userProfileImage);
      await AsyncStorage.setItem('primaryGoals', JSON.stringify(primaryGoals));
      await AsyncStorage.setItem('socialStyle', socialStyle);
      await AsyncStorage.setItem('idealHangouts', JSON.stringify(idealHangouts));
      await AsyncStorage.setItem('energyLevel', energyLevel);
      await AsyncStorage.setItem('socialBattery', socialBattery);
      await AsyncStorage.setItem('conversationStyle', conversationStyle);
      await AsyncStorage.setItem('selectedMusicGenres', JSON.stringify(selectedMusicGenres));
      await AsyncStorage.setItem('selectedRavingPrefs', JSON.stringify(selectedRavingPrefs));
      await AsyncStorage.setItem('selectedMusicActivities', JSON.stringify(selectedMusicActivities));
      await AsyncStorage.setItem('selectedSports', JSON.stringify(selectedSports));
      await AsyncStorage.setItem('selectedNFLTeams', JSON.stringify(selectedNFLTeams));
      await AsyncStorage.setItem('selectedNBATeams', JSON.stringify(selectedNBATeams));
      await AsyncStorage.setItem('selectedMLBTeams', JSON.stringify(selectedMLBTeams));
      await AsyncStorage.setItem('selectedNHLTeams', JSON.stringify(selectedNHLTeams));
      await AsyncStorage.setItem('selectedAnime', JSON.stringify(selectedAnime));
      await AsyncStorage.setItem('selectedVideoGames', JSON.stringify(selectedVideoGames));
      await AsyncStorage.setItem('selectedPassions', JSON.stringify(selectedPassions));
      await AsyncStorage.setItem('selectedArtsCulture', JSON.stringify(selectedArtsCulture));
      await AsyncStorage.setItem('selectedArtsMediums', JSON.stringify(selectedArtsMediums));
      await AsyncStorage.setItem('selectedFoodDrinks', JSON.stringify(selectedFoodDrinks));
      await AsyncStorage.setItem('selectedOutdoors', JSON.stringify(selectedOutdoors));
      await AsyncStorage.setItem('selectedFitness', JSON.stringify(selectedFitness));
      await AsyncStorage.setItem('selectedBusiness', JSON.stringify(selectedBusiness));
      await AsyncStorage.setItem('selectedTechnology', JSON.stringify(selectedTechnology));
      await AsyncStorage.setItem('selectedFamilyKids', JSON.stringify(selectedFamilyKids));
      await AsyncStorage.setItem('selectedComedyEntertainment', JSON.stringify(selectedComedyEntertainment));
      await AsyncStorage.setItem('selectedInfluences', JSON.stringify(selectedInfluences));
      await AsyncStorage.setItem('selectedIdentities', JSON.stringify(selectedIdentities));
      await AsyncStorage.setItem('selectedFriendGroup', JSON.stringify(selectedFriendGroup));
      await AsyncStorage.setItem('selectedPrompts', JSON.stringify(selectedPrompts));
    await AsyncStorage.setItem('promptResponses', JSON.stringify(promptResponses));
      
      // Show success feedback (optional)
      console.log('Profile data saved successfully');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  // Personality tab states
  const [socialEnergy, setSocialEnergy] = useState('Ambivert');
  const [weekendMood, setWeekendMood] = useState('Chill');
  const [energyLevel, setEnergyLevel] = useState('');
  const [socialBattery, setSocialBattery] = useState('');
  const [conversationStyle, setConversationStyle] = useState('');
  const [loveLanguage, setLoveLanguage] = useState('');
  const [selectedIdentities, setSelectedIdentities] = useState<string[]>([]);
  const [showIdentitiesExpanded, setShowIdentitiesExpanded] = useState(false);
  const [selectedFriendGroup, setSelectedFriendGroup] = useState<string[]>([]);
  const [showFriendGroupExpanded, setShowFriendGroupExpanded] = useState(false);
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  const [showPromptsExpanded, setShowPromptsExpanded] = useState(false);
  const [promptResponses, setPromptResponses] = useState<{[key: string]: string}>({});
  const [expandedPromptInput, setExpandedPromptInput] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Identity options array
  const IDENTITY_OPTIONS = [
    'Baddie', 'Nerd', 'Creative', 'Gym Rat', 'Music Head', 'Pop Culture Junkie', 'Sober', 'Soft Girl', 'Chronically Inspired', 'Minimal', 'Unhinged', 'Chill Guy', 'ADHD', 'Aware', 'Tomboy',
    'Career-Focused', 'Entrepreneurial', 'Fashionably Late', 'Sports Fanatic', 'Funny', 'Go-Getter', 'Competitive',
    'Alternative', 'Shy', 'Confident', 'Finance Bro', 'Stoic', 'Corporate', 'Side Hustler', 'Collector', 'Maybe On The Spectrum',
    'Vintage Soul', 'Swiftie', 'Fashionista', 'BeyHive', 'E-girl'
  ];

  const FRIEND_GROUP_OPTIONS = [
    'The Planner', 'Mom/Dad', 'The Therapist', 'The Joker', 'The Party Animal', 'The Bookworm', 'The Chill One', 'The Overachiever', 'The Outsider', 'The Emotional One'
  ];
  
  // Music expansion states
  const [showMusicExpanded, setShowMusicExpanded] = useState(false);
  const [selectedMusicGenres, setSelectedMusicGenres] = useState<string[]>([]);
  const [selectedRavingPrefs, setSelectedRavingPrefs] = useState<string[]>([]);
  const [customMusicInput, setCustomMusicInput] = useState('');
  const [selectedMusicActivities, setSelectedMusicActivities] = useState<string[]>([]);
  
  // Sports expansion states
  const [showSportsExpanded, setShowSportsExpanded] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [customSportsInput, setCustomSportsInput] = useState('');
  const [showNFLModal, setShowNFLModal] = useState(false);
  const [selectedNFLTeams, setSelectedNFLTeams] = useState<string[]>([]);
  const [showNBAModal, setShowNBAModal] = useState(false);
  const [selectedNBATeams, setSelectedNBATeams] = useState<string[]>([]);
  const [showMLBModal, setShowMLBModal] = useState(false);
  const [selectedMLBTeams, setSelectedMLBTeams] = useState<string[]>([]);
  const [showNHLModal, setShowNHLModal] = useState(false);
  const [selectedNHLTeams, setSelectedNHLTeams] = useState<string[]>([]);
  
  // Anime expansion states
  const [showAnimeExpanded, setShowAnimeExpanded] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<string[]>([]);
  const [customAnimeInput, setCustomAnimeInput] = useState('');
  
  // Video Games expansion states
  const [showVideoGamesExpanded, setShowVideoGamesExpanded] = useState(false);
  const [selectedVideoGames, setSelectedVideoGames] = useState<string[]>([]);
  const [customVideoGameInput, setCustomVideoGameInput] = useState('');
  
  // Passion expansion states
  const [showPassionExpanded, setShowPassionExpanded] = useState(false);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);
  const [customPassionInput, setCustomPassionInput] = useState('');
  
  // Arts & Culture expansion states
  const [showArtsCultureExpanded, setShowArtsCultureExpanded] = useState(false);
  const [selectedArtsCulture, setSelectedArtsCulture] = useState<string[]>([]);
  const [selectedArtsMediums, setSelectedArtsMediums] = useState<string[]>([]);
  
  // Food & Drinks expansion states
  const [showFoodDrinksExpanded, setShowFoodDrinksExpanded] = useState(false);
  const [selectedFoodDrinks, setSelectedFoodDrinks] = useState<string[]>([]);
  
  // Influences expansion states
  const [showInfluencesExpanded, setShowInfluencesExpanded] = useState(false);
  const [selectedInfluences, setSelectedInfluences] = useState<string[]>([]);
  
  // Outdoors & Adventures expansion states
  const [showOutdoorsExpanded, setShowOutdoorsExpanded] = useState(false);
  const [selectedOutdoors, setSelectedOutdoors] = useState<string[]>([]);
  const [customOutdoorsInput, setCustomOutdoorsInput] = useState('');
  
  // Fitness expansion states
  const [showFitnessExpanded, setShowFitnessExpanded] = useState(false);
  const [selectedFitness, setSelectedFitness] = useState<string[]>([]);
  const [customFitnessInput, setCustomFitnessInput] = useState('');
  
  // Business & Networking expansion states
  const [showBusinessExpanded, setShowBusinessExpanded] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
  const [customBusinessInput, setCustomBusinessInput] = useState('');
  
  // Technology expansion states
  const [showTechnologyExpanded, setShowTechnologyExpanded] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
  const [customTechnologyInput, setCustomTechnologyInput] = useState('');
  
  // Family & Kids expansion states
  const [showFamilyKidsExpanded, setShowFamilyKidsExpanded] = useState(false);
  const [selectedFamilyKids, setSelectedFamilyKids] = useState<string[]>([]);
  
  // Comedy & Entertainment expansion states
  const [showComedyEntertainmentExpanded, setShowComedyEntertainmentExpanded] = useState(false);
  const [selectedComedyEntertainment, setSelectedComedyEntertainment] = useState<string[]>([]);
  
  const TECHNOLOGY_EVENTS = [
    'Tech Conferences', 'Hackathons', 'Startup Events'
  ];
  
  const FAMILY_KIDS_EVENTS = [
    'Family-Friendly Events'
  ];
  
  const COMEDY_ENTERTAINMENT_EVENTS = [
    'Stand-up Comedy', 'Movie Nights', 'Magic Shows', 'Escape Rooms', 'Virtual Reality'
  ];
  
  // Music genres from interests.tsx
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

  const MUSIC_ACTIVITIES = [
    'Concerts',
    'Music Festivals', 
    'Jamming',
    'Afters'
  ];

  const ARTS_CULTURE_ACTIVITIES = [
    'Art Exhibitions',
    'Theater Plays',
    'Dance Shows'
  ];

  const ARTS_CULTURE_MEDIUMS = [
    'Painting',
    'Sculpture',
    'Drawing',
    'Photography',
    'Film',
    'Graphic Design',
    'Fashion',
    'Architecture',
    'Street Art'
  ];

  const FOOD_DRINKS_ACTIVITIES = [
    'Food Exploration',
    'BBQs',
    'Bar Hopping',
    'Veggie Life',
    'Cooking',
    'Happy Hour'
  ];

  const INFLUENCES = [
    'Alex Hormozi',
    'Theo Von',
    'Cardi B',
    'Gary Vee',
    'Alex Earl',
    'Joe Rogan',
    'Ryan Trahan',
    'Ralph Barbosa',
    'Kardashian',
    'Tom Holland',
    'Sam Sulek',
    'Chloe Shih',
    'Emma Chamberlain',
    'Daniel Mac',
    'garbo.zhu',
    'Kristy Sarah',
    'IShowSpeed',
    'rafaeltats',
    'Steven Bartlett',
    'POV Husband',
    'Jake Paul',
    'Kai Cenat',
    'Vanilla Mace',
    'Blue Face'
  ];

  const INFLUENCE_BRANDS = [
    'Nike',
    'Aritzia',
    'Uniqlo',
    'Patagonia',
    'Skims',
    'Sweetgreen',
    'Erewhon',
    'Trader Joe\'s',
    'Stanley',
    'Apple',
    'Notion',
    'Spotify',
    'Peloton',
    'Alo',
    'Lululemon',
    'Equinox',
    'Not into brands'
  ];

  const OUTDOORS_ADVENTURES_ACTIVITIES = [
    'Hiking',
    'Rock Climbing',
    'Kayaking',
    'Boating',
    'ATVs',
    'White Water Rafting',
    'Beach Days',
    'Camping',
    'Snowboarding',
    'Picnicing',
    'Stargazing',
    'Farmers Markets'
  ];

  const FITNESS_ACTIVITIES = [
    'Weight Training',
    'Run Club',
    'Cycling',
    'Pilates',
    'Yoga',
    'Boxing',
    'Swimming',
    'Pickleball',
    'Jiu Jitsu',
    'Marathons'
  ];

  const BUSINESS_NETWORKING_ACTIVITIES = [
    'Conferences',
    'Networking Events'
  ];
  
  const SPORTS_CATEGORIES = [
    { name: 'NFL', emoji: '🏈' },
    { name: 'NBA', emoji: '🏀' },
    { name: 'MLB', emoji: '⚾' },
    { name: 'NHL', emoji: '🏒' },
    { name: 'UFC', emoji: '🥊' }
  ];
  
  const NFL_TEAMS = [
    'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills',
    'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns',
    'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers',
    'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs',
    'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins',
    'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants',
    'New York Jets', 'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers',
    'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders'
  ];
  
  const NBA_TEAMS = [
    'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets',
    'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets',
    'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers',
    'Los Angeles Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat',
    'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks',
    'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns',
    'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors',
    'Utah Jazz', 'Washington Wizards'
  ];
  
  const MLB_TEAMS = [
    'Arizona Diamondbacks', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox',
    'Chicago Cubs', 'Chicago White Sox', 'Cincinnati Reds', 'Cleveland Guardians',
    'Colorado Rockies', 'Detroit Tigers', 'Houston Astros', 'Kansas City Royals',
    'Los Angeles Angels', 'Los Angeles Dodgers', 'Miami Marlins', 'Milwaukee Brewers',
    'Minnesota Twins', 'New York Mets', 'New York Yankees', 'Oakland Athletics',
    'Philadelphia Phillies', 'Pittsburgh Pirates', 'San Diego Padres', 'San Francisco Giants',
    'Seattle Mariners', 'St. Louis Cardinals', 'Tampa Bay Rays', 'Texas Rangers',
    'Toronto Blue Jays', 'Washington Nationals'
  ];
  
  const NHL_TEAMS = [
    'Anaheim Ducks', 'Arizona Coyotes', 'Boston Bruins', 'Buffalo Sabres',
    'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche',
    'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton Oilers',
    'Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Canadiens',
    'Nashville Predators', 'New Jersey Devils', 'New York Islanders', 'New York Rangers',
    'Ottawa Senators', 'Philadelphia Flyers', 'Pittsburgh Penguins', 'San Jose Sharks',
    'Seattle Kraken', 'St. Louis Blues', 'Tampa Bay Lightning', 'Toronto Maple Leafs',
    'Vancouver Canucks', 'Vegas Golden Knights', 'Washington Capitals', 'Winnipeg Jets'
  ];
  
  const ANIME_GENRES = [
    'NARUTO', 'ONE PIECE', 'DRAGON BALL', 'ATTACK ON TITAN', 'DEMON SLAYER',
    'MY HERO ACADEMIA', 'DEATH NOTE', 'ONE PUNCH MAN', 'SPIRITED AWAY', 'POKEMON',
    'SAILOR MOON', 'COWBOY BEBOP', 'FULLMETAL ALCHEMIST', 'HUNTER X HUNTER', 'BLEACH',
    'JUJUTSU KAISEN', 'CHAINSAW MAN', 'SPY X FAMILY', 'JOJO\'S BIZARRE ADVENTURE', 'AKIRA'
  ];
  
  const VIDEO_GAMES = [
    'Fortnite', 'Call of Duty', 'FIFA', 'NBA 2K', 'League of Legends', 'Minecraft', 'Valorant',
    'Apex Legends', 'Fall Guys', 'Grand Theft Auto', 'Rocket League',
    'Overwatch', 'Among Us', 'Roblox', 'World of Warcraft',
    'Genshin Impact', 'Elden Ring', 'The Witcher 3', 'Cyberpunk 2077', 'Red Dead Redemption',
    'Super Mario', 'Zelda', 'Pokemon', 'Destiny 2', 'Counter-Strike',
    'Dota 2', 'Halo', 'Assassins Creed', 'Battlefield', 'Mortal Kombat'
  ];
  
  const PASSION_INTERESTS = [
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
    { id: 'snowboarding', label: 'Snow', emoji: '🏂' }
  ];
  
  const [qualityTime, setQualityTime] = useState('');
  const [actsOfService, setActsOfService] = useState('');
  const [deepTalk, setDeepTalk] = useState('');
  const [communicationStyle, setCommunicationStyle] = useState('');
  const [conflictStyle, setConflictStyle] = useState('');
  const [friendshipGoals, setFriendshipGoals] = useState('');

  // Interests tab states
  const [interests, setInterests] = useState({
    music: [],
    artsAndCulture: [],
    foodAndDrink: [],
    sportsAndFitness: [],
    businessAndNetworking: [],
    familyAndKids: [],
    technology: [],
    comedyAndEntertainment: [],
    travelAndAdventures: []
  });

  const loadProfileData = async () => {
    try {
      // Load basic profile data from onboarding
      const savedFullName = await AsyncStorage.getItem('fullName');
      const savedUserName = await AsyncStorage.getItem('userName');
      const savedLocation = await AsyncStorage.getItem('userLocation');
      const savedAge = await AsyncStorage.getItem('age');
      const savedGender = await AsyncStorage.getItem('gender');
      const savedProfilePhoto = await AsyncStorage.getItem('profilePhoto');
      
      // Load additional profile data
      const savedAboutMe = await AsyncStorage.getItem('aboutMe');
      const savedDreamIs = await AsyncStorage.getItem('dreamIs');
      const savedEthnicity = await AsyncStorage.getItem('ethnicity');
      const savedOccupation = await AsyncStorage.getItem('occupation');
      const savedIndustry = await AsyncStorage.getItem('industry');
      const savedReligion = await AsyncStorage.getItem('religion');
      const savedRelationshipStatus = await AsyncStorage.getItem('relationshipStatus');
      const savedPrimaryGoals = await AsyncStorage.getItem('primaryGoals');
      const savedSocialStyle = await AsyncStorage.getItem('socialStyle');
      const savedIdealHangouts = await AsyncStorage.getItem('idealHangouts');
      const savedEnergyLevel = await AsyncStorage.getItem('energyLevel');
      const savedSocialBattery = await AsyncStorage.getItem('socialBattery');
      const savedConversationStyle = await AsyncStorage.getItem('conversationStyle');
      const savedMusicGenres = await AsyncStorage.getItem('selectedMusicGenres');
      const savedRavingPrefs = await AsyncStorage.getItem('selectedRavingPrefs');
      const savedSports = await AsyncStorage.getItem('selectedSports');
      const savedNFLTeams = await AsyncStorage.getItem('selectedNFLTeams');
      const savedNBATeams = await AsyncStorage.getItem('selectedNBATeams');
      const savedMLBTeams = await AsyncStorage.getItem('selectedMLBTeams');
      const savedNHLTeams = await AsyncStorage.getItem('selectedNHLTeams');
      const savedAnime = await AsyncStorage.getItem('selectedAnime');
      const savedVideoGames = await AsyncStorage.getItem('selectedVideoGames');
      // Also load from interests.tsx selections
      const savedInterestMusicCategories = await AsyncStorage.getItem('selectedMusicCategories');
      const savedInterestEDMGenres = await AsyncStorage.getItem('selectedEDMGenres');
      const savedInterestSports = await AsyncStorage.getItem('selectedSportsCategories');
      
      // Set the state with saved data
      if (savedFullName) setFirstName(savedFullName);
      if (savedUserName) setUserName(savedUserName);
      if (savedLocation) setLocation(savedLocation);
      if (savedAge) setAge(savedAge);
      if (savedGender) {
        // Normalize gender value to match current options
        const normalizedGender = savedGender.toLowerCase() === 'nonbinary' ? 'Non-binary' : savedGender;
        setGender(normalizedGender);
      }
      if (savedProfilePhoto) setUserProfileImage(savedProfilePhoto);
      if (savedAboutMe) setAboutMe(savedAboutMe);
      if (savedDreamIs) setDreamIs(savedDreamIs);
      if (savedEthnicity) setEthnicity(savedEthnicity);
      if (savedOccupation) setOccupation(savedOccupation);
      if (savedIndustry) setIndustry(savedIndustry);
      if (savedReligion) setReligion(savedReligion);
      if (savedRelationshipStatus) setRelationshipStatus(savedRelationshipStatus);
      if (savedPrimaryGoals) setPrimaryGoals(JSON.parse(savedPrimaryGoals));
      if (savedSocialStyle) setSocialStyle(savedSocialStyle);
      if (savedIdealHangouts) setIdealHangouts(JSON.parse(savedIdealHangouts));
      if (savedEnergyLevel) setEnergyLevel(savedEnergyLevel);
      if (savedSocialBattery) setSocialBattery(savedSocialBattery);
      if (savedConversationStyle) setConversationStyle(savedConversationStyle);
      
      // Load music preferences from edit profile or interests screen
      let musicGenresToLoad = [];
      let ravingPrefsToLoad = [];
      let sportsToLoad = [];
      let nflTeamsToLoad = [];
      let nbaTeamsToLoad = [];
      let mlbTeamsToLoad = [];
      let nhlTeamsToLoad = [];
      
      console.log('Loading music data...');
      console.log('savedMusicGenres:', savedMusicGenres);
      console.log('savedInterestMusicCategories:', savedInterestMusicCategories);
      console.log('savedRavingPrefs:', savedRavingPrefs);
      console.log('savedInterestEDMGenres:', savedInterestEDMGenres);
      
      if (savedMusicGenres) {
        musicGenresToLoad = JSON.parse(savedMusicGenres);
        console.log('Loaded edit profile music genres:', musicGenresToLoad);
      } else if (savedInterestMusicCategories) {
        // Pre-fill from interests.tsx selections
        musicGenresToLoad = JSON.parse(savedInterestMusicCategories);
        console.log('Loaded interests music categories:', musicGenresToLoad);
      }
      
      if (savedRavingPrefs) {
        ravingPrefsToLoad = JSON.parse(savedRavingPrefs);
        console.log('Loaded edit profile raving prefs:', ravingPrefsToLoad);
      } else if (savedInterestEDMGenres) {
        // Pre-fill from interests.tsx EDM selections
        ravingPrefsToLoad = JSON.parse(savedInterestEDMGenres);
        console.log('Loaded interests EDM genres:', ravingPrefsToLoad);
      }
      
      if (savedSports) {
        sportsToLoad = JSON.parse(savedSports);
        console.log('Loaded edit profile sports:', sportsToLoad);
      } else if (savedInterestSports) {
        // Pre-fill from interests.tsx sports selections
        sportsToLoad = JSON.parse(savedInterestSports);
        console.log('Loaded interests sports:', sportsToLoad);
      }
      
      if (savedNFLTeams) {
        nflTeamsToLoad = JSON.parse(savedNFLTeams);
        console.log('Loaded NFL teams:', nflTeamsToLoad);
      }
      
      if (savedNBATeams) {
        nbaTeamsToLoad = JSON.parse(savedNBATeams);
        console.log('Loaded NBA teams:', nbaTeamsToLoad);
      }
      
      if (savedMLBTeams) {
        mlbTeamsToLoad = JSON.parse(savedMLBTeams);
        console.log('Loaded MLB teams:', mlbTeamsToLoad);
      }
      
      if (savedNHLTeams) {
        nhlTeamsToLoad = JSON.parse(savedNHLTeams);
        console.log('Loaded NHL teams:', nhlTeamsToLoad);
      }
      
      // Force state updates
      setSelectedMusicGenres(musicGenresToLoad);
      setSelectedRavingPrefs(ravingPrefsToLoad);
      setSelectedSports(sportsToLoad);
      setSelectedNFLTeams(nflTeamsToLoad);
      setSelectedNBATeams(nbaTeamsToLoad);
      setSelectedMLBTeams(mlbTeamsToLoad);
      setSelectedNHLTeams(nhlTeamsToLoad);
      
      // Load anime and passions
      if (savedAnime) {
        setSelectedAnime(JSON.parse(savedAnime));
      }
      
      if (savedVideoGames) {
        setSelectedVideoGames(JSON.parse(savedVideoGames));
      }
      
      // Load music activities
      const savedMusicActivities = await AsyncStorage.getItem('selectedMusicActivities');
      if (savedMusicActivities) {
        setSelectedMusicActivities(JSON.parse(savedMusicActivities));
      }
      
      // Load arts & culture activities
      const savedArtsCulture = await AsyncStorage.getItem('selectedArtsCulture');
      if (savedArtsCulture) {
        setSelectedArtsCulture(JSON.parse(savedArtsCulture));
      }
      
      // Load arts & culture mediums
      const savedArtsMediums = await AsyncStorage.getItem('selectedArtsMediums');
      if (savedArtsMediums) {
        setSelectedArtsMediums(JSON.parse(savedArtsMediums));
      }
      
      // Load food & drinks activities
      const savedFoodDrinks = await AsyncStorage.getItem('selectedFoodDrinks');
      if (savedFoodDrinks) {
        setSelectedFoodDrinks(JSON.parse(savedFoodDrinks));
      }

      // Load outdoors & adventures activities
      const savedOutdoors = await AsyncStorage.getItem('selectedOutdoors');
      if (savedOutdoors) {
        setSelectedOutdoors(JSON.parse(savedOutdoors));
      }

      // Load fitness activities
      const savedFitness = await AsyncStorage.getItem('selectedFitness');
      if (savedFitness) {
        setSelectedFitness(JSON.parse(savedFitness));
      }

      // Load business & networking activities
      const savedBusiness = await AsyncStorage.getItem('selectedBusiness');
      if (savedBusiness) {
        setSelectedBusiness(JSON.parse(savedBusiness));
      }
      
      // Load technology activities
      const savedTechnology = await AsyncStorage.getItem('selectedTechnology');
      if (savedTechnology) {
        setSelectedTechnology(JSON.parse(savedTechnology));
      }
      
      // Load family & kids activities
      const savedFamilyKids = await AsyncStorage.getItem('selectedFamilyKids');
      if (savedFamilyKids) {
        setSelectedFamilyKids(JSON.parse(savedFamilyKids));
      }
      
      // Load comedy & entertainment activities
      const savedComedyEntertainment = await AsyncStorage.getItem('selectedComedyEntertainment');
      if (savedComedyEntertainment) {
        setSelectedComedyEntertainment(JSON.parse(savedComedyEntertainment));
      }
      
      // Load influences activities
      const savedInfluences = await AsyncStorage.getItem('selectedInfluences');
      if (savedInfluences) {
        setSelectedInfluences(JSON.parse(savedInfluences));
      }
      
      // Load identity selections
      const savedIdentities = await AsyncStorage.getItem('selectedIdentities');
      if (savedIdentities) {
        setSelectedIdentities(JSON.parse(savedIdentities));
      }
      
      // Load friend group selections
      const savedFriendGroup = await AsyncStorage.getItem('selectedFriendGroup');
      if (savedFriendGroup) {
        setSelectedFriendGroup(JSON.parse(savedFriendGroup));
      }
      
      // Load selected prompts
      const savedPrompts = await AsyncStorage.getItem('selectedPrompts');
      if (savedPrompts) {
        setSelectedPrompts(JSON.parse(savedPrompts));
      }
      
      // Load prompt responses
      const savedPromptResponses = await AsyncStorage.getItem('promptResponses');
      if (savedPromptResponses) {
        setPromptResponses(JSON.parse(savedPromptResponses));
      }
      
      // Load passions from edit profile or from interests.tsx
      const savedPassions = await AsyncStorage.getItem('selectedPassions');
      const savedInterests = await AsyncStorage.getItem('selectedInterests');
      console.log('Loading passions - savedPassions:', savedPassions);
      console.log('Loading passions - savedInterests:', savedInterests);
      
      if (savedPassions && savedPassions !== '[]') {
        const passions = JSON.parse(savedPassions);
        console.log('Setting passions from savedPassions:', passions);
        setSelectedPassions(passions);
      } else if (savedInterests && savedInterests !== '[]') {
        // Load from interests.tsx if passions not found
        const interests = JSON.parse(savedInterests);
        console.log('Setting passions from savedInterests:', interests);
        setSelectedPassions(interests);
      } else {
        console.log('No passions or interests found, setting empty array');
        setSelectedPassions([]);
      }
      
      // Auto-expand music section if user has any music selections
      // if (musicGenresToLoad.length > 0 || ravingPrefsToLoad.length > 0) {
      //   setShowMusicExpanded(true);
      //   console.log('Auto-expanding music section');
      // }
      
      // Auto-expand sports section if user has any sports selections
      // if (sportsToLoad.length > 0 || nflTeamsToLoad.length > 0 || nbaTeamsToLoad.length > 0 || mlbTeamsToLoad.length > 0 || nhlTeamsToLoad.length > 0) {
      //   setShowSportsExpanded(true);
      //   console.log('Auto-expanding sports section');
      // }
      
      // Log final state
      setTimeout(() => {
        console.log('Final selectedMusicGenres state:', musicGenresToLoad);
        console.log('Final selectedRavingPrefs state:', ravingPrefsToLoad);
      }, 100);
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [])
  );

  const saveProfile = async () => {
    await saveProfileData();
    router.back();
  };

  const togglePrimaryGoal = (goal: string) => {
    setPrimaryGoals(prev => {
      const newGoals = prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal];
      
      // Auto-save the changes
      setTimeout(() => saveProfileData(), 100);
      return newGoals;
    });
  };

  const toggleIdealHangout = (hangout: string) => {
    setIdealHangouts(prev => {
      const newHangouts = prev.includes(hangout) 
        ? prev.filter(h => h !== hangout)
        : [...prev, hangout];
      
      // Auto-save the changes
      setTimeout(() => saveProfileData(), 100);
      return newHangouts;
    });
  };

  const addCustomHangout = () => {
    if (customHangoutInput.trim() && !idealHangouts.includes(customHangoutInput.trim())) {
      setIdealHangouts(prev => [...prev, customHangoutInput.trim()]);
      setCustomHangoutInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleMusicGenre = (genre: string) => {
    setSelectedMusicGenres(prev => {
      const newGenres = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      
      // Also update the interests.tsx data to keep in sync
      setTimeout(async () => {
        try {
          await AsyncStorage.setItem('selectedMusicCategories', JSON.stringify(newGenres));
          saveProfileData();
        } catch (error) {
          console.error('Error syncing music genres:', error);
        }
      }, 100);
      return newGenres;
    });
  };

  const toggleRavingPref = (pref: string) => {
    setSelectedRavingPrefs(prev => {
      const newPrefs = prev.includes(pref)
        ? prev.filter(p => p !== pref)
        : [...prev, pref];
      
      // Also update the interests.tsx data to keep in sync  
      setTimeout(async () => {
        try {
          await AsyncStorage.setItem('selectedEDMGenres', JSON.stringify(newPrefs));
          saveProfileData();
        } catch (error) {
          console.error('Error syncing raving prefs:', error);
        }
      }, 100);
      return newPrefs;
    });
  };

  const addCustomMusic = () => {
    if (customMusicInput.trim() && !selectedMusicGenres.includes(customMusicInput.trim())) {
      setSelectedMusicGenres(prev => [...prev, customMusicInput.trim()]);
      setCustomMusicInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleMusicActivity = (activity: string) => {
    setSelectedMusicActivities(prev => {
      const newActivities = prev.includes(activity)
        ? prev.filter(item => item !== activity)
        : [...prev, activity];
      
      setTimeout(() => saveProfileData(), 100);
      return newActivities;
    });
  };

  const toggleSports = (sport: string) => {
    if (sport === 'NFL') {
      setShowNFLModal(true);
      return;
    }
    
    if (sport === 'NBA') {
      setShowNBAModal(true);
      return;
    }
    
    if (sport === 'MLB') {
      setShowMLBModal(true);
      return;
    }
    
    if (sport === 'NHL') {
      setShowNHLModal(true);
      return;
    }
    
    setSelectedSports(prev => {
      const newSports = prev.includes(sport)
        ? prev.filter(s => s !== sport)
        : [...prev, sport];
      
      // Also update the interests.tsx data to keep in sync
      setTimeout(async () => {
        try {
          await AsyncStorage.setItem('selectedSportsCategories', JSON.stringify(newSports));
          saveProfileData();
        } catch (error) {
          console.error('Error syncing sports:', error);
        }
      }, 100);
      return newSports;
    });
  };

  const toggleNFLTeam = (team: string) => {
    setSelectedNFLTeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      
      setTimeout(() => saveProfileData(), 100);
      return newTeams;
    });
  };

  const toggleNBATeam = (team: string) => {
    setSelectedNBATeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      
      setTimeout(() => saveProfileData(), 100);
      return newTeams;
    });
  };

  const toggleMLBTeam = (team: string) => {
    setSelectedMLBTeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      
      setTimeout(() => saveProfileData(), 100);
      return newTeams;
    });
  };

  const toggleNHLTeam = (team: string) => {
    setSelectedNHLTeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      
      setTimeout(() => saveProfileData(), 100);
      return newTeams;
    });
  };

  const addCustomSports = () => {
    if (customSportsInput.trim() && !selectedSports.includes(customSportsInput.trim())) {
      setSelectedSports(prev => [...prev, customSportsInput.trim()]);
      setCustomSportsInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleAnimeGenre = (genre: string) => {
    setSelectedAnime(prev => {
      const newAnime = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      
      setTimeout(() => saveProfileData(), 100);
      return newAnime;
    });
  };

  const addCustomAnime = () => {
    if (customAnimeInput.trim() && !selectedAnime.includes(customAnimeInput.trim())) {
      setSelectedAnime(prev => [...prev, customAnimeInput.trim()]);
      setCustomAnimeInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleVideoGame = (game: string) => {
    setSelectedVideoGames(prev => {
      const newGames = prev.includes(game)
        ? prev.filter(g => g !== game)
        : [...prev, game];
      
      setTimeout(() => saveProfileData(), 100);
      return newGames;
    });
  };

  const addCustomVideoGame = () => {
    if (customVideoGameInput.trim() && !selectedVideoGames.includes(customVideoGameInput.trim())) {
      setSelectedVideoGames(prev => [...prev, customVideoGameInput.trim()]);
      setCustomVideoGameInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const togglePassion = (passionId: string) => {
    setSelectedPassions(prev => {
      const newPassions = prev.includes(passionId)
        ? prev.filter(id => id !== passionId)
        : [...prev, passionId];
      
      setTimeout(() => saveProfileData(), 100);
      return newPassions;
    });
  };

  // ID mapping between interests.tsx and PASSION_INTERESTS
  const mapInterestIdToPassionId = (interestId: string): string => {
    const mapping: { [key: string]: string } = {
      'music': 'music',
      'sports': 'sports', 
      'raves': 'raves',
      'dj': 'dj',
      'fashion': 'fashion',
      'pets': 'pets',        // interests.tsx uses 'pets', PASSION_INTERESTS uses 'pets'
      'anime': 'anime',
      'business': 'business',
      'fitness': 'fitness',
      'gaming': 'gaming',
      'parenting': 'parenting',
      'filmContent': 'filmContent',
      'photography': 'photography',
      'reading': 'reading',
      'singing': 'singing',
      'technology': 'technology',
      'travel': 'travel',
      'writing': 'writing',
      'cooking': 'cooking',
      'cinema': 'cinema',
      'investing': 'investing',
      'shopping': 'shopping',
      'cars': 'cars',
      'hiking': 'hiking',
      'art': 'art',
      'boardGames': 'boardGames',
      'musicians': 'musicians',
      'partying': 'partying',
      'lgbtRights': 'lgbtRights',
      'disney': 'disney',
      'concerts': 'concerts',
      'ai': 'ai',
      'godFearing': 'godFearing',
      'motorcycles': 'motorcycles',
      'beauty': 'beauty',
      'politics': 'politics',
      'conspiracies': 'conspiracies',
      'founders': 'founders',
      'skating': 'skating',
      'popCulture': 'popCulture',
      'nature': 'nature',
      'food': 'food',
      'running': 'running',
      'camping': 'camping',
      'snowboarding': 'snowboarding'
    };
    return mapping[interestId] || interestId;
  };

  // Get mapped passions for display (convert from interests.tsx IDs to our PASSION_INTERESTS IDs)
  const getMappedSelectedPassions = (): string[] => {
    return selectedPassions.map(id => mapInterestIdToPassionId(id));
  };

  const addCustomPassion = () => {
    if (customPassionInput.trim() && !selectedPassions.includes(customPassionInput.trim())) {
      setSelectedPassions(prev => [...prev, customPassionInput.trim()]);
      setCustomPassionInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleArtsCulture = (activity: string) => {
    setSelectedArtsCulture(prev => {
      const newActivities = prev.includes(activity)
        ? prev.filter(item => item !== activity)
        : [...prev, activity];
      
      setTimeout(() => saveProfileData(), 100);
      return newActivities;
    });
  };

  const toggleArtsMedium = (medium: string) => {
    setSelectedArtsMediums(prev => {
      const newMediums = prev.includes(medium)
        ? prev.filter(item => item !== medium)
        : [...prev, medium];
      
      setTimeout(() => saveProfileData(), 100);
      return newMediums;
    });
  };

  const toggleFoodDrinks = (activity: string) => {
    setSelectedFoodDrinks(prev => {
      const newActivities = prev.includes(activity)
        ? prev.filter(item => item !== activity)
        : [...prev, activity];
      
      setTimeout(() => saveProfileData(), 100);
      return newActivities;
    });
  };

  const toggleInfluence = (influenceName: string) => {
    setSelectedInfluences(prev => {
      const newInfluences = prev.includes(influenceName)
        ? prev.filter(item => item !== influenceName)
        : [...prev, influenceName];
      
      setTimeout(() => saveProfileData(), 100);
      return newInfluences;
    });
  };

  const toggleIdentity = (identity: string) => {
    setSelectedIdentities(prev => {
      const newIdentities = prev.includes(identity)
        ? prev.filter(item => item !== identity)
        : [...prev, identity];
      
      setTimeout(() => saveProfileData(), 100);
      return newIdentities;
    });
  };

  const toggleFriendGroup = (role: string) => {
    setSelectedFriendGroup(prev => {
      const newRoles = prev.includes(role)
        ? prev.filter(item => item !== role)
        : [...prev, role];
      
      setTimeout(() => saveProfileData(), 100);
      return newRoles;
    });
  };

  const togglePrompt = (prompt: string) => {
    console.log('Toggling prompt:', prompt);
    console.log('Current selectedPrompts:', selectedPrompts);
    
    const hasTextContent = promptResponses[prompt]?.trim().length > 0;
    
    // If clicking the same prompt that's already expanded, close it
    if (expandedPromptInput === prompt) {
      setExpandedPromptInput(null);
      setTimeout(() => saveProfileData(), 100);
      return;
    }
    
    // If button has no text content and user clicks it while it's selected, allow them to unselect/clear it
    if (!hasTextContent && selectedPrompts.includes(prompt) && expandedPromptInput !== prompt) {
      // Clear the prompt response and remove from selected
      setPromptResponses(prev => {
        const newResponses = { ...prev };
        delete newResponses[prompt];
        return newResponses;
      });
      setSelectedPrompts(prev => prev.filter(p => p !== prompt));
      setExpandedPromptInput(null);
      setTimeout(() => saveProfileData(), 100);
      return;
    }
    
    // Open the input for this prompt
    console.log('Setting expandedPromptInput to:', prompt);
    setExpandedPromptInput(prompt);
    
    // Enhanced scrolling behavior for better visibility
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
    
    // Additional scroll after keyboard appears (for iOS)
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 400);
    
    setTimeout(() => saveProfileData(), 100);
  };

  const addCustomOutdoors = () => {
    if (customOutdoorsInput.trim() && !selectedOutdoors.includes(customOutdoorsInput.trim())) {
      setSelectedOutdoors(prev => [...prev, customOutdoorsInput.trim()]);
      setCustomOutdoorsInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleFitness = (activity: string) => {
    setSelectedFitness(prev => {
      const newActivities = prev.includes(activity)
        ? prev.filter(item => item !== activity)
        : [...prev, activity];
      
      setTimeout(() => saveProfileData(), 100);
      return newActivities;
    });
  };

  const addCustomFitness = () => {
    if (customFitnessInput.trim() && !selectedFitness.includes(customFitnessInput.trim())) {
      setSelectedFitness(prev => [...prev, customFitnessInput.trim()]);
      setCustomFitnessInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleBusiness = (activity: string) => {
    setSelectedBusiness(prev => {
      const newActivities = prev.includes(activity)
        ? prev.filter(item => item !== activity)
        : [...prev, activity];
      
      setTimeout(() => saveProfileData(), 100);
      return newActivities;
    });
  };

  const addCustomBusiness = () => {
    if (customBusinessInput.trim() && !selectedBusiness.includes(customBusinessInput.trim())) {
      setSelectedBusiness(prev => [...prev, customBusinessInput.trim()]);
      setCustomBusinessInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleTechnology = (event: string) => {
    setSelectedTechnology(prev => {
      const newEvents = prev.includes(event)
        ? prev.filter(item => item !== event)
        : [...prev, event];
      
      setTimeout(() => saveProfileData(), 100);
      return newEvents;
    });
  };

  const addCustomTechnology = () => {
    if (customTechnologyInput.trim() && !selectedTechnology.includes(customTechnologyInput.trim())) {
      setSelectedTechnology(prev => [...prev, customTechnologyInput.trim()]);
      setCustomTechnologyInput('');
      setTimeout(() => saveProfileData(), 100);
    }
  };

  const toggleFamilyKids = (event: string) => {
    setSelectedFamilyKids(prev => {
      const newEvents = prev.includes(event)
        ? prev.filter(item => item !== event)
        : [...prev, event];
      
      setTimeout(() => saveProfileData(), 100);
      return newEvents;
    });
  };

  const toggleComedyEntertainment = (event: string) => {
    setSelectedComedyEntertainment(prev => {
      const newEvents = prev.includes(event)
        ? prev.filter(item => item !== event)
        : [...prev, event];
      
      setTimeout(() => saveProfileData(), 100);
      return newEvents;
    });
  };

  // --- End of addCustomOutdoors ---

  // Update prompt response function
  const updatePromptResponse = (prompt: string, text: string) => {
    setPromptResponses(prev => {
      const newResponses = { ...prev, [prompt]: text };
      setTimeout(() => saveProfileData(), 100);
      return newResponses;
    });
    
    // Update selectedPrompts based on whether there's text content
    setSelectedPrompts(prev => {
      const hasText = text.trim().length > 0;
      const isCurrentlySelected = prev.includes(prompt);
      
      if (hasText && !isCurrentlySelected) {
        // Add to selected if there's text and not already selected
        return [...prev, prompt];
      } else if (!hasText && isCurrentlySelected) {
        // Remove from selected if no text and currently selected
        return prev.filter(p => p !== prompt);
      }
      
      return prev;
    });
  };

  // Close prompt input handler
  const closePromptInput = () => {
    setExpandedPromptInput(null);
  };

  // Toggle function for Outdoors & Adventures activities
  const toggleOutdoors = (activity: string) => {
    setSelectedOutdoors(prev => {
      const newOutdoors = prev.includes(activity)
        ? prev.filter(item => item !== activity)
        : [...prev, activity];
      setTimeout(() => saveProfileData(), 100);
      return newOutdoors;
    });
  };

  // Core tab rendering function
  const renderCoreTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Identity</Text>
        <Text style={styles.sectionDescription}>
          Sharing help us improve compatibility and personalize matches! Not all details are visible on your profile. Preview and manage visibility at anytime.
        </Text>
        <View style={{ height: 20 }} />
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Full Name</Text>
        <TextInput
          style={[styles.textInput, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Full Name"
        />
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>User Name</Text>
        <View style={[styles.usernameContainer, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}>
          <Text style={styles.atSymbol}>@</Text>
          <TextInput
            style={[styles.textInput, styles.usernameInput]}
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
              saveProfileData();
            }}
            placeholder=""
          />
        </View>
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>About Me</Text>
        <TextInput
          style={[styles.textInput, styles.textArea, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
          value={aboutMe}
          onChangeText={(text) => {
            setAboutMe(text);
            saveProfileData();
          }}
          placeholder="Describe yourself in 1-3 sentences"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Location</Text>
        <TextInput
          style={[styles.textInput, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            saveProfileData();
          }}
          placeholder="Enter your location"
        />
      </View>

      <View style={[styles.row, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <View style={[styles.fieldGroup, styles.halfWidth]}>
          <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Age</Text>
          <TextInput
            style={[styles.textInput, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
            value={age}
            onChangeText={(text) => {
              setAge(text);
              saveProfileData();
            }}
            placeholder="Age"
            keyboardType="numeric"
          />
          <View style={styles.checkboxRow}>
            <TouchableOpacity 
              style={styles.checkboxTouchArea}
              onPress={() => setShowOnProfile(!showOnProfile)}
            >
              <View style={styles.checkbox}>
                {!showOnProfile && <Ionicons name="checkmark" size={12} color="#007AFF" />}
              </View>
              <Text style={[styles.checkboxLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Don't show on profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.fieldGroup, styles.halfWidth]}>
          <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown) && styles.dimmedText]}>Gender</Text>
          <View style={[styles.dropdownContainer, showGenderDropdown && styles.activeDropdownContainer]}>
            <TouchableOpacity 
              style={[styles.dropdownButton, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown) && styles.dimmedInput]}
              onPress={() => setShowGenderDropdown(!showGenderDropdown)}
            >
              <Text style={[styles.dropdownText, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown) && styles.dimmedText]}>{gender || 'Select gender'}</Text>
              <Ionicons name={showGenderDropdown ? "chevron-up" : "chevron-down"} size={20} color={(showEthnicityDropdown || showIndustryDropdown || showReligionDropdown) ? "#ccc" : "#666"} />
            </TouchableOpacity>
            {showGenderDropdown && (
              <>
                <TouchableWithoutFeedback onPress={() => setShowGenderDropdown(false)}>
                  <View style={styles.genderDropdownBackdrop} />
                </TouchableWithoutFeedback>
                <View style={styles.dropdownOverlayUp}>
                  <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                    {genderOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.dropdownItem, index === genderOptions.length - 1 && styles.lastDropdownItem]}
                        onPress={() => {
                          setGender(option);
                          setShowGenderDropdown(false);
                          saveProfileData();
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.fieldGroup, (showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Ethnicity</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowEthnicityDropdown(!showEthnicityDropdown)}
          >
            <Text style={styles.dropdownText}>{ethnicity || 'Select ethnicity'}</Text>
            <Ionicons name={showEthnicityDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666" />
          </TouchableOpacity>
          {showEthnicityDropdown && (
            <>
              <TouchableWithoutFeedback onPress={() => setShowEthnicityDropdown(false)}>
                <View style={styles.dropdownBackdrop} />
              </TouchableWithoutFeedback>
              <View style={styles.dropdownOverlay}>
                <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                  {ethnicityOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.dropdownItem, index === ethnicityOptions.length - 1 && styles.lastDropdownItem]}
                      onPress={() => {
                        setEthnicity(option);
                        setShowEthnicityDropdown(false);
                        saveProfileData();
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <TouchableOpacity 
            style={styles.checkboxTouchArea}
            onPress={() => setImportantCulture(!importantCulture)}
          >
            <View style={styles.checkbox}>
              {importantCulture && <Ionicons name="checkmark" size={12} color="#007AFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Show me people that share my culture</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Occupation</Text>
        <TextInput
          style={[styles.textInput, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
          value={occupation}
          onChangeText={(text) => {
            setOccupation(text);
            saveProfileData();
          }}
          placeholder="Your occupation"
        />
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Industry</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={[styles.dropdownButton, (showEthnicityDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
            onPress={() => setShowIndustryDropdown(!showIndustryDropdown)}
          >
            <Text style={[styles.dropdownText, (showEthnicityDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>{industry || 'Select industry'}</Text>
            <Ionicons name={showIndustryDropdown ? "chevron-up" : "chevron-down"} size={20} color={(showEthnicityDropdown || showReligionDropdown || showGenderDropdown) ? "#ccc" : "#666"} />
          </TouchableOpacity>
          {showIndustryDropdown && (
            <>
              <TouchableWithoutFeedback onPress={() => setShowIndustryDropdown(false)}>
                <View style={styles.dropdownBackdrop} />
              </TouchableWithoutFeedback>
              <View style={styles.dropdownOverlay}>
                <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                  {industryOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.dropdownItem, index === industryOptions.length - 1 && styles.lastDropdownItem]}
                      onPress={() => {
                        setIndustry(option);
                        setShowIndustryDropdown(false);
                        saveProfileData();
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showGenderDropdown) && styles.dimmedText]}>Religion</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={[styles.dropdownButton, (showEthnicityDropdown || showIndustryDropdown || showGenderDropdown) && styles.dimmedInput]}
            onPress={() => setShowReligionDropdown(!showReligionDropdown)}
          >
            <Text style={[styles.dropdownText, (showEthnicityDropdown || showIndustryDropdown || showGenderDropdown) && styles.dimmedText]}>{religion || 'Select religion'}</Text>
            <Ionicons name={showReligionDropdown ? "chevron-up" : "chevron-down"} size={20} color={(showEthnicityDropdown || showIndustryDropdown || showGenderDropdown) ? "#ccc" : "#666"} />
          </TouchableOpacity>
          {showReligionDropdown && (
            <>
              <TouchableWithoutFeedback onPress={() => setShowReligionDropdown(false)}>
                <View style={styles.dropdownBackdrop} />
              </TouchableWithoutFeedback>
              <View style={styles.dropdownOverlay}>
                <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                  {religionOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.dropdownItem, index === religionOptions.length - 1 && styles.lastDropdownItem]}
                      onPress={() => {
                        setReligion(option);
                        setShowReligionDropdown(false);
                        saveProfileData();
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Relationship Status</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={[styles.dropdownButton, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
            onPress={() => setShowRelationshipDropdown(!showRelationshipDropdown)}
          >
            <Text style={[styles.dropdownText, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>{relationshipStatus || 'Select status'}</Text>
            <Ionicons name={showRelationshipDropdown ? "chevron-up" : "chevron-down"} size={20} color={(showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) ? "#ccc" : "#666"} />
          </TouchableOpacity>
          {showRelationshipDropdown && (
            <>
              <TouchableWithoutFeedback onPress={() => setShowRelationshipDropdown(false)}>
                <View style={styles.dropdownBackdrop} />
              </TouchableWithoutFeedback>
              <View style={styles.dropdownOverlay}>
                <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                  {relationshipOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.dropdownItem, index === relationshipOptions.length - 1 && styles.lastDropdownItem]}
                      onPress={() => {
                        setRelationshipStatus(option);
                        setShowRelationshipDropdown(false);
                        saveProfileData();
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={[styles.section, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.sectionTitle, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Social & Friendship Goals</Text>
      </View>
      <View style={styles.socialGoalsContent}>
        <View style={styles.socialSection}>
          <View style={styles.primaryGoalHeader}>
            <View style={styles.primaryGoalTitleContainer}>
              <View style={styles.primaryGoalIconContainer}>
                <Text style={styles.primaryGoalEmoji}>🎯</Text>
              </View>
              <Text style={styles.primaryGoalTitle}>Primary Goal</Text>
            </View>
            <View style={styles.primaryGoalBadge}>
              <Text style={styles.primaryGoalBadgeText}>Pick all that apply</Text>
            </View>
          </View>
          
          <View style={styles.enhancedGoalGrid}>
            {primaryGoalsOptions.map((goal, index) => {
              const isSelected = primaryGoals.includes(goal);
              const goalIcons = {
                'Find friends in my city': '🏙️',
                'Meet people at events': '🎪',
                'Join hobby groups': '🎨',
                'Collaborate professionally': '💼',
                'Travel buddies': '✈️',
                'Deep 1:1 connections': '💬'
              };
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.enhancedGoalButton,
                    isSelected && styles.enhancedGoalButtonActive
                  ]}
                  onPress={() => togglePrimaryGoal(goal)}
                >
                  <View style={styles.goalButtonContent}>
                    <Text style={[
                      styles.goalButtonIcon,
                      isSelected && styles.goalButtonIconActive
                    ]}>
                      {goalIcons[goal as keyof typeof goalIcons]}
                    </Text>
                    <Text style={[
                      styles.enhancedGoalButtonText,
                      isSelected && styles.enhancedGoalButtonTextActive
                    ]}>
                      {goal === 'Find friends in my city'
                        ? 'Find friends in\nmy city'
                        : goal}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
            {/* Specifically looking for... subheader and text box */}
            <View style={{ marginTop: 16 }}>
              <Text style={[styles.sectionTitle, { color: '#000' }]}>Specifically looking for...</Text>
              <TextInput
                style={[styles.textInput, styles.textArea, { width: '100%', minHeight: 60 }]}
                placeholder="Ex: Girlfriends to go on weekend getaways"
                placeholderTextColor="#999"
                multiline
                numberOfLines={2}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderPersonalityTab = () => (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.tabContent}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personality</Text>
        <Text style={styles.sectionDescription}>
          Share your personality so we can connect you with like-minded friends and communities.
        </Text>
        <View style={{ height: 12 }} />
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.musicHeader}
          onPress={() => setShowIdentitiesExpanded(!showIdentitiesExpanded)}
        >
          <Text style={styles.fieldLabel}>Identify As</Text>
          <Ionicons 
            name={showIdentitiesExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666"
            style={{ marginTop: -6, marginLeft: 4 }}
          />
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

      <View style={{ height: 0 }} />
      <View style={styles.fieldGroup}>
        <TouchableOpacity 
          style={styles.musicHeader}
          onPress={() => setShowFriendGroupExpanded(!showFriendGroupExpanded)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.fieldLabel}>In the Friend Group, I'm</Text>
            <Ionicons 
              name={showFriendGroupExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666"
              style={{ marginLeft: 4, marginTop: -2 }}
            />
          </View>
        </TouchableOpacity>
        
        {showFriendGroupExpanded && (
          <View style={[styles.expandedContent, { paddingHorizontal: 8, marginTop: 12 }]}> 
            <View style={{ flexDirection: 'column' }}>
              {/* First row */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                  {FRIEND_GROUP_OPTIONS.slice(0, Math.ceil(FRIEND_GROUP_OPTIONS.length / 2)).map((role, index) => {
                    const roleEmojis: Record<typeof FRIEND_GROUP_OPTIONS[number], string> = {
                      'The Planner': '🗓️',
                      'Mom/Dad': '🧑‍🍼',
                      'The Therapist': '🧠',
                      'The Joker': '🤣',
                      'The Party Animal': '🍻',
                      'The Bookworm': '📚',
                      'The Chill One': '😎',
                      'The Overachiever': '🏆',
                      'The Outsider': '👤',
                      'The Emotional One': '😭'
                    };
                    return (
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
                          {roleEmojis[role as keyof typeof roleEmojis] ? `${roleEmojis[role as keyof typeof roleEmojis]} ` : ''}{role}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
              {/* Second row */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>
                  {FRIEND_GROUP_OPTIONS.slice(Math.ceil(FRIEND_GROUP_OPTIONS.length / 2)).map((role, index) => {
                    const roleEmojis = {
                      'The Planner': '🗓️',
                      'Mom/Dad': '🧑‍🍼',
                      'The Therapist': '🧠',
                      'The Joker': '🤣',
                      'The Party Animal': '🍻',
                      'The Bookworm': '📚',
                      'The Chill One': '😎',
                      'The Overachiever': '🏆',
                      'The Outsider': '👤',
                      'The Emotional One': '🥹'
                    } as const;
                    type RoleKey = keyof typeof roleEmojis;
                    const emoji = roleEmojis[role as RoleKey];
                    return (
                      <TouchableOpacity
                        key={index + Math.ceil(FRIEND_GROUP_OPTIONS.length / 2)}
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
                          {emoji ? `${emoji} ` : ''}{role}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Social Energy</Text>
        <View style={{ height: 6}} />
        <View style={styles.optionGroup}>
          {['Introvert', 'Ambivert', 'Extrovert'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, socialEnergy === option && styles.optionButtonActive]}
              onPress={() => setSocialEnergy(option)}
            >
              <Text style={[styles.optionText, socialEnergy === option && styles.optionTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Weekend Mood</Text>
        <View style={{ height: 2 }} />
        <View style={styles.optionGroup}>
          {[
            { key: 'chill', label: 'Chill', icon: '❄️' },
            { key: 'spontaneous', label: 'Spontaneous', icon: '🎪' },
            { key: 'adventure', label: 'Adventure', icon: '🏔️' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.moodButton, weekendMood === option.label && styles.moodButtonActive]}
              onPress={() => setWeekendMood(option.label)}
            >
              <Text style={styles.moodIcon}>{option.icon}</Text>
              <Text style={[styles.moodText, weekendMood === option.label && styles.moodTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.socialSection}>
        <TouchableOpacity 
          style={styles.musicHeader}
          onPress={() => setShowIdealHangoutsExpanded(!showIdealHangoutsExpanded)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.fieldLabel}>Ideal Hangouts</Text>
            <Ionicons 
              name={showIdealHangoutsExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666"
              style={{ marginLeft: 4, marginTop: -6 }}
            />
          </View>
        </TouchableOpacity>
        
        {showIdealHangoutsExpanded && (
          <View style={[styles.expandedContent, { paddingHorizontal: 0 }]}> 
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {idealHangoutsOptions.map((hangout, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.hangoutButton,
                    idealHangouts.includes(hangout) && styles.hangoutButtonActive
                  ]}
                  onPress={() => toggleIdealHangout(hangout)}
                >
                  <Text style={[
                    styles.hangoutText,
                    idealHangouts.includes(hangout) && styles.hangoutTextActive
                  ]}>{hangout}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Display custom hangout entries as pills above the input */}
            {idealHangouts.filter(hangout => !idealHangoutsOptions.includes(hangout)).length > 0 && (
              <View style={styles.customMusicSection}>
                <View style={styles.genreGrid}>
                  {idealHangouts
                    .filter(hangout => !idealHangoutsOptions.includes(hangout))
                    .map((customEntry, index) => (
                    <TouchableOpacity
                      key={`hangout-${index}`}
                      style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => {
                        setIdealHangouts(prev => prev.filter(item => item !== customEntry));
                        setTimeout(() => saveProfileData(), 100);
                      }}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.customInput}
                value={customHangoutInput}
                onChangeText={setCustomHangoutInput}
                placeholder="Add your favorite hangout"
                placeholderTextColor="#999"
                onSubmitEditing={addCustomHangout}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addCustomHangout}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.socialSection}>
        <View style={styles.socialSectionHeader}>
          <View style={styles.socialSectionTitleContainer}>
            <Text style={styles.socialSectionTitle}>Social Style</Text>
          </View>
        </View>
        
        <View style={styles.socialStyleGrid}>
          {socialStyleOptions.map((style, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.socialStyleButton,
                socialStyle === style && styles.socialStyleButtonActive
              ]}
              onPress={() => setSocialStyle(style)}
            >
              <Text style={[
                styles.socialStyleText,
                socialStyle === style && styles.socialStyleTextActive
              ]}>{style}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Energy Level</Text>
        <View style={styles.optionGroup}>
          {[
            { key: 'morning', label: 'Morning person', icon: '🌅' },
            { key: 'night', label: 'Night owl', icon: '🦉' },
            { key: 'afternoon', label: 'Afternoon peak', icon: '☀️' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.moodButton, energyLevel === option.label && styles.moodButtonActive]}
              onPress={() => {
                setEnergyLevel(option.label);
                saveProfileData();
              }}
            >
              <Text style={styles.moodIcon}>{option.icon}</Text>
              <Text style={[styles.moodText, energyLevel === option.label && styles.moodTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Social Battery</Text>
        <View style={styles.optionGroup}>
          {[
            { key: 'alone', label: 'Recharges alone', icon: '🔋' },
            { key: 'people', label: 'Recharges with people', icon: '⚡' },
            { key: 'mixed', label: 'Mixed', icon: '🔄' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.moodButton, socialBattery === option.label && styles.moodButtonActive]}
              onPress={() => {
                setSocialBattery(option.label);
                saveProfileData();
              }}
            >
              <Text style={styles.moodIcon}>{option.icon}</Text>
              <Text style={[styles.moodText, socialBattery === option.label && styles.moodTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Conversation Style</Text>
        <View style={styles.optionGroup}>
          {[
            { key: 'deep', label: 'Deep diver', icon: '🤿' },
            { key: 'light', label: 'Light & fun', icon: '🎈' },
            { key: 'both', label: 'Mix of both', icon: '🌊' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.moodButton, conversationStyle === option.label && styles.moodButtonActive]}
              onPress={() => {
                setConversationStyle(option.label);
                saveProfileData();
              }}
            >
              <Text style={styles.moodIcon}>{option.icon}</Text>
              <Text style={[styles.moodText, conversationStyle === option.label && styles.moodTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.musicHeader}
          onPress={() => setShowPromptsExpanded(!showPromptsExpanded)}
        >
          <Text style={styles.fieldLabel}>Prompts</Text>
          <Ionicons 
            name={showPromptsExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666"
            style={{ marginTop: -6, marginLeft: 4 }}
          />
        </TouchableOpacity>
      
      {showPromptsExpanded && (
        <View style={[styles.expandedContent, { paddingHorizontal: 0 }]}> 
          <Text style={[styles.sectionDescription, { marginLeft: 7, marginBottom: 16 }]}>Pick at least 3</Text>
          <View>
          {(() => {
            const prompts = [
              "All I want is",
              'I can make a mean',
              'My dream is to',
              'That one time in Vegas',
              'A pet peeve',
              'If I won the lottery',
              'Favorite movie',
              'I\'m obsessed with',
              'Ronaldo or Messi?',
              'Top travel destinations',
              'Greatest athlete of all time',
              'Hot Take',
              'My idea of a good time is',
              'I\'m awesome at',
              'My proudest moment',
              'My guilty pleasure',
              'I go to bed at',
              'My role model',
              'People would say I\'m',
              'We\'ll get along if',
              'My dream job',
              'Ask me about',
              'Designated driver?',
              'One thing people get wrong about me',
              'I spend way too much time',
              'Flats or Drums?',
              'This year, I want to',
              'A childhood memory',
              'My therapy is',
              'Fun Fact',
              'Top 3 best concerts',
              'Random shower thought',
              'I\'m allergic to',
              'Bucket List',
              'Favorite pet',
              'Favorite word/phrase',
              'Word/phrase I can\'t stand',
              'Let\'s go'
            ];
            
            // Group prompts into rows of 6 for longer horizontal scroll
            const rows = [];
            for (let i = 0; i < prompts.length; i += 6) {
              rows.push(prompts.slice(i, i + 6));
            }
            
            return rows.map((row, rowIndex) => (
              <View key={rowIndex}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.promptRow}
                  contentContainerStyle={styles.promptRowContent}
                >
                  {row.map((prompt, index) => (
                    <View key={`${rowIndex}-${index}`} style={styles.promptButtonWrapper}>
                      <TouchableOpacity
                        style={[
                          styles.musicGenreButton,
                          styles.promptButton,
                          (promptResponses[prompt]?.trim().length > 0) && styles.genreButtonActive
                        ]}
                        onPress={() => {
                          console.log('Button pressed for prompt:', prompt);
                          console.log('Has text content:', promptResponses[prompt]?.trim().length > 0);
                          togglePrompt(prompt);
                        }}
                      >
                        <Text style={[
                          styles.genreText,
                          (promptResponses[prompt]?.trim().length > 0) && styles.genreTextActive
                        ]}>
                          {prompt}
                        </Text>
                      </TouchableOpacity>
                      
                      {/* Remove button for highlighted prompts */}
                      {(promptResponses[prompt]?.trim().length > 0) && (
                        <TouchableOpacity
                          style={styles.promptRemoveButton}
                          onPress={() => {
                            // Clear the text and remove from selected
                            setPromptResponses(prev => ({ ...prev, [prompt]: '' }));
                            setSelectedPrompts(prev => prev.filter(p => p !== prompt));
                            setTimeout(() => saveProfileData(), 100);
                          }}
                        >
                          <Ionicons name="close" size={12} color="#666" />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            ));
          })()} 
          </View>
        </View>
      )}
    </View>
      </ScrollView>
      
      {/* Modal overlay for prompt input */}
      {expandedPromptInput && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={closePromptInput}
        >
          <TouchableWithoutFeedback onPress={closePromptInput}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{expandedPromptInput}</Text>
                    <TouchableOpacity 
                      style={styles.modalCloseButton}
                      onPress={closePromptInput}
                    >
                      <Ionicons name="close" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.modalTextInput}
                    value={promptResponses[expandedPromptInput] || ''}
                    onChangeText={(text) => updatePromptResponse(expandedPromptInput, text)}
                    multiline
                    numberOfLines={6}
                    autoFocus
                    textAlignVertical="top"
                  />
                  <TouchableOpacity 
                    style={styles.modalDoneButton}
                    onPress={closePromptInput}
                  >
                    <Text style={styles.modalDoneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );

  const renderInterestsTab = () => (
    <View style={styles.tabContent}>
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>
            Share your interests so we can suggest friends and events you'll love.{' '}
            <Text style={styles.addNewText}>Add new</Text>
          </Text>
        </View>

        <View style={styles.interestCategory}>
          <TouchableOpacity 
            style={styles.categoryHeader}
            onPress={() => {
              setShowMusicExpanded(false);
              setShowAnimeExpanded(false);
              setShowPassionExpanded(false);
              setShowArtsCultureExpanded(false);
              setShowFoodDrinksExpanded(false);
              setShowOutdoorsExpanded(false);
              setShowFitnessExpanded(false);
              setShowBusinessExpanded(false);
              setShowSportsExpanded(!showSportsExpanded);
            }}
          >
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryEmoji}>🏀</Text>
            </View>
            <Text style={styles.categoryTitle}>Sports</Text>
            <Ionicons 
              name={showSportsExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>

          {showSportsExpanded && (
            <View style={styles.expandedContent}>
              <View style={{ height:-2 }} />
              <Text style={styles.subCategoryTitle}>Leagues</Text>
              <View style={styles.genreGrid}>
                {SPORTS_CATEGORIES.map((sport, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.musicGenreButton,
                      (selectedSports.includes(sport.name) || 
                       (sport.name === 'NFL' && selectedNFLTeams.length > 0) ||
                       (sport.name === 'NBA' && selectedNBATeams.length > 0) ||
                       (sport.name === 'MLB' && selectedMLBTeams.length > 0) ||
                       (sport.name === 'NHL' && selectedNHLTeams.length > 0)) && styles.genreButtonActive
                    ]}
                    onPress={() => toggleSports(sport.name)}
                  >
                    <Text style={[
                      styles.genreText,
                      (selectedSports.includes(sport.name) || 
                       (sport.name === 'NFL' && selectedNFLTeams.length > 0) ||
                       (sport.name === 'NBA' && selectedNBATeams.length > 0) ||
                       (sport.name === 'MLB' && selectedMLBTeams.length > 0) ||
                       (sport.name === 'NHL' && selectedNHLTeams.length > 0)) && styles.genreTextActive
                    ]}>{sport.emoji} {sport.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Display selected NFL teams */}
              {selectedNFLTeams.length > 0 && (
                <View style={styles.customMusicSection}>
                  <Text style={styles.subCategoryTitle}>My NFL Teams</Text>
                  <View style={styles.genreGrid}>
                    {selectedNFLTeams.map((team, index) => (
                      <TouchableOpacity
                        key={`nfl-${index}`}
                        style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                        onPress={() => {
                          setSelectedNFLTeams(prev => {
                            const newTeams = prev.filter(item => item !== team);
                            // Remove NFL from selectedSports if no teams left
                            if (newTeams.length === 0) {
                              setSelectedSports(sportsPrev => sportsPrev.filter(s => s !== 'NFL'));
                            }
                            setTimeout(() => saveProfileData(), 100);
                            return newTeams;
                          });
                        }}
                      >
                        <Text style={[styles.genreText, styles.genreTextActive]}>{team}</Text>
                        <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
              
              {/* Display selected NBA teams */}
              {selectedNBATeams.length > 0 && (
                <View style={styles.customMusicSection}>
                  <Text style={styles.subCategoryTitle}>My NBA Teams</Text>
                  <View style={styles.genreGrid}>
                    {selectedNBATeams.map((team, index) => (
                      <TouchableOpacity
                        key={`nba-${index}`}
                        style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                        onPress={() => {
                          setSelectedNBATeams(prev => {
                            const newTeams = prev.filter(item => item !== team);
                            // Remove NBA from selectedSports if no teams left
                            if (newTeams.length === 0) {
                              setSelectedSports(sportsPrev => sportsPrev.filter(s => s !== 'NBA'));
                            }
                            setTimeout(() => saveProfileData(), 100);
                            return newTeams;
                          });
                        }}
                      >
                        <Text style={[styles.genreText, styles.genreTextActive]}>{team}</Text>
                        <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
              
              {/* Display selected MLB teams */}
              {selectedMLBTeams.length > 0 && (
                <View style={styles.customMusicSection}>
                  <Text style={styles.subCategoryTitle}>My MLB Teams</Text>
                  <View style={styles.genreGrid}>
                    {selectedMLBTeams.map((team, index) => (
                      <TouchableOpacity
                        key={`mlb-${index}`}
                        style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                        onPress={() => {
                          setSelectedMLBTeams(prev => {
                            const newTeams = prev.filter(item => item !== team);
                            // Remove MLB from selectedSports if no teams left
                            if (newTeams.length === 0) {
                              setSelectedSports(sportsPrev => sportsPrev.filter(s => s !== 'MLB'));
                            }
                            setTimeout(() => saveProfileData(), 100);
                            return newTeams;
                          });
                        }}
                      >
                        <Text style={[styles.genreText, styles.genreTextActive]}>{team}</Text>
                        <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
              
              {/* Display selected NHL teams */}
              {selectedNHLTeams.length > 0 && (
                <View style={styles.customMusicSection}>
                  <Text style={styles.subCategoryTitle}>My NHL Teams</Text>
                  <View style={styles.genreGrid}>
                    {selectedNHLTeams.map((team, index) => (
                      <TouchableOpacity
                        key={`nhl-${index}`}
                        style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                        onPress={() => {
                          setSelectedNHLTeams(prev => {
                            const newTeams = prev.filter(item => item !== team);
                            // Remove NHL from selectedSports if no teams left
                            if (newTeams.length === 0) {
                              setSelectedSports(sportsPrev => sportsPrev.filter(s => s !== 'NHL'));
                            }
                            setTimeout(() => saveProfileData(), 100);
                            return newTeams;
                          });
                        }}
                      >
                        <Text style={[styles.genreText, styles.genreTextActive]}>{team}</Text>
                        <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
              
              {/* Display custom sports entries as pills above the input */}
              {selectedSports.filter(sport => !SPORTS_CATEGORIES.some(cat => cat.name === sport)).length > 0 && (
                <View style={styles.customMusicSection}>
                  <Text style={styles.subCategoryTitle}>Favorite Athletes</Text>
                  <View style={styles.genreGrid}>
                    {selectedSports
                      .filter(sport => !SPORTS_CATEGORIES.some(cat => cat.name === sport))
                      .map((customEntry, index) => (
                      <TouchableOpacity
                        key={`athlete-${index}`}
                        style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                        onPress={() => {
                          setSelectedSports(prev => prev.filter(item => item !== customEntry));
                          setTimeout(() => saveProfileData(), 100);
                        }}
                      >
                        <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                        <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.customInputContainer}>
                <TextInput
                  style={styles.customInput}
                  value={customSportsInput}
                  onChangeText={setCustomSportsInput}
                  placeholder="Add your favorite athlete"
                  placeholderTextColor="#999"
                  onSubmitEditing={addCustomSports}
                />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={addCustomSports}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowAnimeExpanded(false);
            setShowVideoGamesExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowFoodDrinksExpanded(!showFoodDrinksExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🍽️</Text>
          </View>
          <Text style={styles.categoryTitle}>Food & Drinks</Text>
          <Ionicons 
            name={showFoodDrinksExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showFoodDrinksExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.genreGrid}>
              {FOOD_DRINKS_ACTIVITIES.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedFoodDrinks.includes(activity) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleFoodDrinks(activity)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedFoodDrinks.includes(activity) && styles.genreTextActive
                  ]}>{activity}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowAnimeExpanded(!showAnimeExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🎌</Text>
          </View>
          <Text style={styles.categoryTitle}>Anime</Text>
          <Ionicons 
            name={showAnimeExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showAnimeExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.subCategoryTitle}>Favorite Anime</Text>
            <View style={styles.genreGrid}>
              {ANIME_GENRES.map((genre, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedAnime.includes(genre) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleAnimeGenre(genre)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedAnime.includes(genre) && styles.genreTextActive
                  ]}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Display custom anime entries as pills above the input */}
            {selectedAnime.filter(anime => !ANIME_GENRES.includes(anime)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Anime</Text>
                <View style={styles.genreGrid}>
                  {selectedAnime
                    .filter(anime => !ANIME_GENRES.includes(anime))
                    .map((customEntry, index) => (
                    <TouchableOpacity
                      key={`anime-${index}`}
                      style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => {
                        setSelectedAnime(prev => prev.filter(item => item !== customEntry));
                        setTimeout(() => saveProfileData(), 100);
                      }}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.customInput}
                value={customAnimeInput}
                onChangeText={setCustomAnimeInput}
                placeholder="Add your favorite anime"
                placeholderTextColor="#999"
                onSubmitEditing={addCustomAnime}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addCustomAnime}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowVideoGamesExpanded(!showVideoGamesExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🎮</Text>
          </View>
          <Text style={styles.categoryTitle}>Video Games</Text>
          <Ionicons 
            name={showVideoGamesExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showVideoGamesExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.genreGrid}>
              {VIDEO_GAMES.map((game, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedVideoGames.includes(game) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleVideoGame(game)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedVideoGames.includes(game) && styles.genreTextActive
                  ]}>{game}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Display custom video game entries as pills above the input */}
            {selectedVideoGames.filter(game => !VIDEO_GAMES.includes(game)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Games</Text>
                <View style={styles.genreGrid}>
                  {selectedVideoGames
                    .filter(game => !VIDEO_GAMES.includes(game))
                    .map((customEntry, index) => (
                    <TouchableOpacity
                      key={`game-${index}`}
                      style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => {
                        setSelectedVideoGames(prev => prev.filter(item => item !== customEntry));
                        setTimeout(() => saveProfileData(), 100);
                      }}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.customInput}
                value={customVideoGameInput}
                onChangeText={setCustomVideoGameInput}
                placeholder="Add your favorite game"
                placeholderTextColor="#999"
                onSubmitEditing={addCustomVideoGame}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addCustomVideoGame}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowMusicExpanded(!showMusicExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🎵</Text>
          </View>
          <Text style={styles.categoryTitle}>Music</Text>
          <Ionicons 
            name={showMusicExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showMusicExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.subCategoryTitle}>Events</Text>
            <View style={styles.genreGrid}>
              {MUSIC_ACTIVITIES.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedMusicActivities.includes(activity) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleMusicActivity(activity)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedMusicActivities.includes(activity) && styles.genreTextActive
                  ]}>{activity}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.subCategoryTitle}>Music Genres</Text>
            <View style={styles.genreGrid}>
              {MUSIC_CATEGORIES.map((genre, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedMusicGenres.includes(genre) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleMusicGenre(genre)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedMusicGenres.includes(genre) && styles.genreTextActive
                  ]}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.subCategoryTitle}>EDM Genres</Text>
            <View style={styles.genreGrid}>
              {EDM_GENRES.map((genre, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedRavingPrefs.includes(genre) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleRavingPref(genre)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedRavingPrefs.includes(genre) && styles.genreTextActive
                  ]}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Display custom music entries as pills above the input */}
            {selectedMusicGenres.filter(genre => !MUSIC_CATEGORIES.includes(genre)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Artists & Preferences</Text>
                <View style={styles.genreGrid}>
                  {selectedMusicGenres
                    .filter(genre => !MUSIC_CATEGORIES.includes(genre))
                    .map((customEntry, index) => (
                    <TouchableOpacity
                      key={`custom-${index}`}
                      style={[styles.musicGenreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => {
                        setSelectedMusicGenres(prev => prev.filter(item => item !== customEntry));
                        setTimeout(() => saveProfileData(), 100);
                      }}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.customInput}
                value={customMusicInput}
                onChangeText={setCustomMusicInput}
                placeholder="Add your favorite artist"
                placeholderTextColor="#999"
                onSubmitEditing={addCustomMusic}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addCustomMusic}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowPassionExpanded(!showPassionExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>❤️</Text>
          </View>
          <Text style={styles.categoryTitle}>Passions</Text>
          <Ionicons 
            name={showPassionExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showPassionExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.subCategoryTitle}>Your Interests & Passions ({getMappedSelectedPassions().length} selected)</Text>
            <View style={styles.genreGrid}>
              {PASSION_INTERESTS.map((passion, index) => {
                const mappedSelectedPassions = getMappedSelectedPassions();
                const isSelected = mappedSelectedPassions.includes(passion.id);
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.musicGenreButton,
                      isSelected && styles.genreButtonActive
                    ]}
                    onPress={() => {
                      console.log(`Tapped ${passion.label} (${passion.id})`);
                      console.log(`Is currently selected: ${isSelected}`);
                      console.log(`mappedSelectedPassions:`, mappedSelectedPassions);
                      // When toggling, we need to work with the original interests.tsx ID
                      const originalId = selectedPassions.find(id => mapInterestIdToPassionId(id) === passion.id) || passion.id;
                      togglePassion(originalId);
                    }}
                  >
                    <Text style={[
                      styles.genreText,
                      isSelected && styles.genreTextActive
                    ]}>
                      {passion.emoji} {passion.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {/* Display custom passion entries as pills above the input */}
            {selectedPassions.filter(passion => !PASSION_INTERESTS.some(p => p.id === passion)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Custom Interests</Text>
                <View style={styles.genreGrid}>
                  {selectedPassions
                    .filter(passion => !PASSION_INTERESTS.some(p => p.id === passion))
                    .map((customEntry, index) => (
                    <TouchableOpacity
                      key={`custom-passion-${index}`}
                      style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => {
                        setSelectedPassions(prev => prev.filter(item => item !== customEntry));
                        setTimeout(() => saveProfileData(), 100);
                      }}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.customInput}
                value={customPassionInput}
                onChangeText={setCustomPassionInput}
                placeholder="Add your own interest"
                placeholderTextColor="#999"
                onSubmitEditing={addCustomPassion}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addCustomPassion}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowPassionExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowArtsCultureExpanded(!showArtsCultureExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🎨</Text>
          </View>
          <Text style={styles.categoryTitle}>Arts & Culture</Text>
          <Ionicons 
            name={showArtsCultureExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showArtsCultureExpanded && (
          <View style={[styles.expandedContent, { paddingHorizontal: 8 }]}>
            {/* Events Section */}
            <Text style={styles.sectionTitle}>Events</Text>
            <View style={[styles.genreGrid, { justifyContent: 'space-between', marginBottom: 20 }]}>
              {ARTS_CULTURE_ACTIVITIES.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedArtsCulture.includes(activity) && styles.genreButtonActive,
                    { flex: 0.32, marginHorizontal: 2 }
                  ]}
                  onPress={() => toggleArtsCulture(activity)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedArtsCulture.includes(activity) && styles.genreTextActive,
                    { fontSize: 12, textAlign: 'center' }
                  ]}>{activity}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Mediums Section */}
            <Text style={styles.sectionTitle}>Mediums</Text>
            <View style={styles.genreGrid}>
              {ARTS_CULTURE_MEDIUMS.map((medium, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedArtsMediums.includes(medium) && styles.genreButtonActive,
                    { paddingHorizontal: 12, paddingVertical: 10, marginBottom: 8, borderRadius: 8 }
                  ]}
                  onPress={() => toggleArtsMedium(medium)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedArtsMediums.includes(medium) && styles.genreTextActive,
                    { fontSize: 13, fontWeight: '500', textAlign: 'center' }
                  ]}>{medium}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowInfluencesExpanded(!showInfluencesExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>👥</Text>
          </View>
          <Text style={styles.categoryTitle}>Influences</Text>
          <Ionicons 
            name={showInfluencesExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showInfluencesExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.sectionTitle}>Public Figure</Text>
            <View style={styles.genreGrid}>
              {INFLUENCES.map((influence, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedInfluences.includes(influence) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleInfluence(influence)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedInfluences.includes(influence) && styles.genreTextActive
                  ]}>
                    {influence}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.customInfluenceContainer}>
              <View style={styles.customInfluenceInput}>
                <Text style={styles.customInfluenceText}>Add your favorite influencer</Text>
              </View>
              <TouchableOpacity style={styles.addInfluenceButton}>
                <Text style={styles.addInfluenceButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Brands I Like</Text>
            <View style={styles.genreGrid}>
              {INFLUENCE_BRANDS.map((brand, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedInfluences.includes(brand) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleInfluence(brand)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedInfluences.includes(brand) && styles.genreTextActive
                  ]}>
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowOutdoorsExpanded(!showOutdoorsExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🏕️</Text>
          </View>
          <Text style={styles.categoryTitle}>Outdoors & Adventures</Text>
          <Ionicons 
            name={showOutdoorsExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showOutdoorsExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.genreGrid}>
              {OUTDOORS_ADVENTURES_ACTIVITIES.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedOutdoors.includes(activity) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleOutdoors(activity)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedOutdoors.includes(activity) && styles.genreTextActive
                  ]}>{activity}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom activities from user input */}
            {selectedOutdoors.filter(activity => !OUTDOORS_ADVENTURES_ACTIVITIES.includes(activity)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Custom Activities</Text>
                <View style={styles.genreGrid}>
                  {selectedOutdoors
                    .filter(activity => !OUTDOORS_ADVENTURES_ACTIVITIES.includes(activity))
                    .map((activity, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.musicGenreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => toggleOutdoors(activity)}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{activity}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={[styles.customInputContainer, { marginTop: 16 }]}>
              <TextInput
                style={styles.customInput}
                value={customOutdoorsInput}
                onChangeText={setCustomOutdoorsInput}
                placeholder="Add your own outdoor activity"
                placeholderTextColor="#999"
                onSubmitEditing={addCustomOutdoors}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addCustomOutdoors}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowBusinessExpanded(false);
            setShowFitnessExpanded(!showFitnessExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🚴🏼‍♀️</Text>
          </View>
          <Text style={styles.categoryTitle}>Fitness</Text>
          <Ionicons 
            name={showFitnessExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showFitnessExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.genreGrid}>
              {FITNESS_ACTIVITIES.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedFitness.includes(activity) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleFitness(activity)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedFitness.includes(activity) && styles.genreTextActive
                  ]}>{activity}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom activities from user input */}
            {selectedFitness.filter(activity => !FITNESS_ACTIVITIES.includes(activity)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Custom Activities</Text>
                <View style={styles.genreGrid}>
                  {selectedFitness
                    .filter(activity => !FITNESS_ACTIVITIES.includes(activity))
                    .map((activity, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.musicGenreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => toggleFitness(activity)}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{activity}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={[styles.customInputContainer, { marginTop: 16 }]}>
              <TextInput
                style={styles.customInput}
                value={customFitnessInput}
                onChangeText={setCustomFitnessInput}
                placeholder="Add your own fitness activity"
                placeholderTextColor="#999"
                onSubmitEditing={addCustomFitness}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addCustomFitness}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.interestCategory, { marginHorizontal: 4}]}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowVideoGamesExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowTechnologyExpanded(!showTechnologyExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>💻</Text>
          </View>
          <Text style={styles.categoryTitle}>Technology</Text>
          <Ionicons 
            name={showTechnologyExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showTechnologyExpanded && (
          <View style={[styles.expandedContent, { paddingHorizontal: 0 }]}>
            <View style={styles.genreGrid}>
              {TECHNOLOGY_EVENTS.map((event, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    { paddingHorizontal: 8 },
                    selectedTechnology.includes(event) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleTechnology(event)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedTechnology.includes(event) && styles.genreTextActive
                  ]}>{event}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Display custom technology entries as pills above the input */}
            {selectedTechnology.filter(event => !TECHNOLOGY_EVENTS.includes(event)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Tech Events</Text>
                <View style={styles.genreGrid}>
                  {selectedTechnology
                    .filter(event => !TECHNOLOGY_EVENTS.includes(event))
                    .map((customEntry, index) => (
                    <TouchableOpacity
                      key={`tech-${index}`}
                      style={[styles.genreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => {
                        setSelectedTechnology(prev => prev.filter(item => item !== customEntry));
                        setTimeout(() => saveProfileData(), 100);
                      }}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{customEntry}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(!showBusinessExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>💼</Text>
          </View>
          <Text style={styles.categoryTitle}>Business & Networking</Text>
          <Ionicons 
            name={showBusinessExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showBusinessExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.genreGrid}>
              {BUSINESS_NETWORKING_ACTIVITIES.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedBusiness.includes(activity) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleBusiness(activity)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedBusiness.includes(activity) && styles.genreTextActive
                  ]}>{activity}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom activities from user input */}
            {selectedBusiness.filter(activity => !BUSINESS_NETWORKING_ACTIVITIES.includes(activity)).length > 0 && (
              <View style={styles.customMusicSection}>
                <Text style={styles.subCategoryTitle}>Your Custom Activities</Text>
                <View style={styles.genreGrid}>
                  {selectedBusiness
                    .filter(activity => !BUSINESS_NETWORKING_ACTIVITIES.includes(activity))
                    .map((activity, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.musicGenreButton, styles.genreButtonActive, styles.customMusicPill]}
                      onPress={() => toggleBusiness(activity)}
                    >
                      <Text style={[styles.genreText, styles.genreTextActive]}>{activity}</Text>
                      <Ionicons name="close-circle" size={16} color="#fff" style={styles.removePillIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowVideoGamesExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowTechnologyExpanded(false);
            setShowFamilyKidsExpanded(!showFamilyKidsExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>👨‍👩‍👧‍👦</Text>
          </View>
          <Text style={styles.categoryTitle}>Family & Kids</Text>
          <Ionicons 
            name={showFamilyKidsExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showFamilyKidsExpanded && (
          <View style={[styles.expandedContent, { paddingHorizontal: 0 }]}>
            <View style={styles.genreGrid}>
              {FAMILY_KIDS_EVENTS.map((event, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedFamilyKids.includes(event) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleFamilyKids(event)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedFamilyKids.includes(event) && styles.genreTextActive
                  ]}>{event}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => {
            setShowMusicExpanded(false);
            setShowSportsExpanded(false);
            setShowAnimeExpanded(false);
            setShowVideoGamesExpanded(false);
            setShowPassionExpanded(false);
            setShowArtsCultureExpanded(false);
            setShowFoodDrinksExpanded(false);
            setShowOutdoorsExpanded(false);
            setShowFitnessExpanded(false);
            setShowBusinessExpanded(false);
            setShowTechnologyExpanded(false);
            setShowFamilyKidsExpanded(false);
            setShowComedyEntertainmentExpanded(!showComedyEntertainmentExpanded);
          }}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>😂</Text>
          </View>
          <Text style={styles.categoryTitle}>Comedy & Entertainment</Text>
          <Ionicons 
            name={showComedyEntertainmentExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showComedyEntertainmentExpanded && (
          <View style={[styles.expandedContent, { paddingHorizontal: 0 }]}>
            <View style={styles.genreGrid}>
              {COMEDY_ENTERTAINMENT_EVENTS.map((event, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.musicGenreButton,
                    selectedComedyEntertainment.includes(event) && styles.genreButtonActive
                  ]}
                  onPress={() => toggleComedyEntertainment(event)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedComedyEntertainment.includes(event) && styles.genreTextActive
                  ]}>{event}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );




  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.previewButton} onPress={async () => { await saveProfileData(); router.push('/profile-preview'); }}>
            <Ionicons name="eye-outline" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Image */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          <TouchableOpacity 
            style={styles.editImageButton}
            onPress={() => setActiveTab('Basics')}
          >
            <Ionicons name="pencil" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Core', 'Personality', 'Interests'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              setActiveTab(tab);
              if (tab === 'Interests') {
                setShowMusicExpanded(false);
                setShowSportsExpanded(false);
                setShowAnimeExpanded(false);
              }
            }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Core' && renderCoreTab()}
        {activeTab === 'Personality' && renderPersonalityTab()}
        {activeTab === 'Interests' && renderInterestsTab()}
      </ScrollView>

      {/* NFL Teams Modal */}
      <Modal
        visible={showNFLModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNFLModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.modalHeader, { justifyContent: 'center' }]}> 
              <View style={styles.sportsModalHeader}>
                <Text style={styles.sportsModalTitle}>🏈 NFL Teams</Text>
                <TouchableOpacity
                  style={styles.sportsModalCloseButton}
                  onPress={() => setShowNFLModal(false)}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.teamsGrid}>
                <View style={styles.nflGridWrapper}>
                  {NFL_TEAMS.map((team, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.nflRectangle,
                        selectedNFLTeams.includes(team) && styles.nflRectangleActive,
                        // 2-column grid
                        { marginRight: index % 2 === 0 ? 8 : 0 }
                      ]}
                      onPress={() => toggleNFLTeam(team)}
                    >
                      <Text style={[
                        styles.nflRectangleText,
                        selectedNFLTeams.includes(team) && styles.nflRectangleTextActive
                      ]} numberOfLines={2}>
                        {team}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              // --- NFL Rectangle Grid Styles ---
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalDoneButton}
                onPress={() => setShowNFLModal(false)}
              >
                <Text style={styles.modalDoneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* NBA Teams Modal */}
      <Modal
        visible={showNBAModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNBAModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.sportsModalHeader}>
              <Text style={styles.sportsModalTitle}>🏀 NBA Teams</Text>
              <TouchableOpacity
                style={styles.sportsModalCloseButton}
                onPress={() => setShowNBAModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.nflGridWrapper}>
                {NBA_TEAMS.map((team, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.nflRectangle,
                      selectedNBATeams.includes(team) && styles.nflRectangleActive,
                      { marginRight: index % 2 === 0 ? 8 : 0 }
                    ]}
                    onPress={() => toggleNBATeam(team)}
                  >
                    <Text style={[
                      styles.nflRectangleText,
                      selectedNBATeams.includes(team) && styles.nflRectangleTextActive
                    ]} numberOfLines={2}>
                      {team}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalDoneButton}
                onPress={() => setShowNBAModal(false)}
              >
                <Text style={styles.modalDoneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MLB Teams Modal */}
      <Modal
        visible={showMLBModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMLBModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.sportsModalHeader}>
              <Text style={styles.sportsModalTitle}>⚾ MLB Teams</Text>
              <TouchableOpacity
                style={styles.sportsModalCloseButton}
                onPress={() => setShowMLBModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.nflGridWrapper}>
                {MLB_TEAMS.map((team, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.nflRectangle,
                      selectedMLBTeams.includes(team) && styles.nflRectangleActive,
                      { marginRight: index % 2 === 0 ? 8 : 0 }
                    ]}
                    onPress={() => toggleMLBTeam(team)}
                  >
                    <Text style={[
                      styles.nflRectangleText,
                      selectedMLBTeams.includes(team) && styles.nflRectangleTextActive
                    ]} numberOfLines={2}>
                      {team}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalDoneButton}
                onPress={() => setShowMLBModal(false)}
              >
                <Text style={styles.modalDoneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* NHL Teams Modal */}
      <Modal
        visible={showNHLModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNHLModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.sportsModalHeader}>
              <Text style={styles.sportsModalTitle}>🏒 NHL Teams</Text>
              <TouchableOpacity
                style={styles.sportsModalCloseButton}
                onPress={() => setShowNHLModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.nflGridWrapper}>
                {NHL_TEAMS.map((team, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.nflRectangle,
                      selectedNHLTeams.includes(team) && styles.nflRectangleActive,
                      { marginRight: index % 2 === 0 ? 8 : 0 }
                    ]}
                    onPress={() => toggleNHLTeam(team)}
                  >
                    <Text style={[
                      styles.nflRectangleText,
                      selectedNHLTeams.includes(team) && styles.nflRectangleTextActive
                    ]} numberOfLines={2}>
                      {team}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalDoneButton}
                onPress={() => setShowNHLModal(false)}
              >
                <Text style={styles.modalDoneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
      nflGridWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 0,
      },
      nflRectangle: {
        width: '47%',
        minHeight: 44,
        backgroundColor: '#F5F5F7',
        borderRadius: 12,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 8,
      },
      nflRectangleActive: {
        backgroundColor: '#007AFF',
      },
      nflRectangleText: {
        fontSize: 13,
        color: '#222',
        textAlign: 'center',
        fontWeight: '500',
      },
      nflRectangleTextActive: {
        color: '#fff',
        fontWeight: '700',
      },
    sportsModalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      marginBottom: 16,
      backgroundColor: '#fff',
      position: 'relative',
    },
    sportsModalTitle: {
      flex: 1,
      fontSize: 22,
      fontWeight: 'bold',
      color: '#222',
      textAlign: 'center',
      letterSpacing: 0.5,
      paddingLeft: 0,
    },
    sportsModalCloseButton: {
      position: 'absolute',
      right: 16,
      top: 12,
      padding: 4,
      zIndex: 1,
    },
  musicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  customMusicSection: {
    marginTop: 8,
    marginBottom: -4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewButton: {
    padding: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    borderRadius: 6,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  tabContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addNewText: {
    color: '#007AFF',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  fieldSubtext: {
    fontSize: 14,
    color: '#666',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
  },
  atSymbol: {
    paddingLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  usernameInput: {
    flex: 1,
    borderWidth: 0,
    paddingLeft: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#666',
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 2000,
  },
  activeDropdownContainer: {
    zIndex: 3000,
  },
  dropdownBackdrop: {
    position: 'absolute',
    top: -2000,
    left: -2000,
    width: 4000,
    height: 4000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1999,
  },
  genderDropdownBackdrop: {
    position: 'absolute',
    top: -2000,
    left: -2000,
    width: 4000,
    height: 4000,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 2999,
  },
  dropdownOverlay: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 2001,
  },
  dropdownOverlayUp: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    zIndex: 3001,
  },
  dropdownList: {
    borderWidth: 2,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
    opacity: 1,
    zIndex: 2002,
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxTouchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 32,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    borderRadius: 3,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#666',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggle: {
    marginRight: 12,
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E5EA',
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: '#34C759',
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
  },
  toggleKnobActive: {
    marginLeft: 20,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#000',
  },
  personalityGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  personalityGoalButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  optionGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  optionButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  },
  optionTextActive: {
    color: 'white',
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  moodButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  moodIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  moodText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  moodTextActive: {
    color: '#007AFF',
  },
  tagButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: 'white',
    fontSize: 14,
  },
  interestCategory: {
    marginBottom: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sectionTitleSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    marginLeft: 4,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 44,
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestTagText: {
    color: '#007AFF',
    fontSize: 14,
  },
  dimmedField: {
    opacity: 0.4,
  },
  dimmedText: {
    color: '#999',
  },
  dimmedInput: {
    borderColor: 'transparent',
    backgroundColor: 'rgba(245, 245, 247, 0.5)',
  },
  socialGoalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  socialGoalsIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  socialGoalsIcon: {
    fontSize: 16,
  },
  socialGoalsTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  socialGoalsContent: {
    paddingLeft: 0,
  },
  primaryGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  primaryGoalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryGoalIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  primaryGoalEmoji: {
    fontSize: 14,
  },
  primaryGoalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  primaryGoalBadge: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryGoalBadgeText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  enhancedGoalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  enhancedGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    minWidth: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  enhancedGoalButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  goalButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalButtonIcon: {
    fontSize: 16,
    marginRight: 14,
    marginLeft: 6,
  },
  goalButtonIconActive: {
    opacity: 0.9,
  },
  enhancedGoalButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  enhancedGoalButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  socialGoalsDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  socialSection: {
    marginBottom: 24,
  },
  socialSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  socialSectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  socialSectionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  socialSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  socialSectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  socialSectionOptional: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginBottom: 8,
  },
  goalButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  goalButtonText: {
    fontSize: 14,
    color: '#666',
  },
  goalButtonTextActive: {
    color: 'white',
  },
  socialStyleGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  socialStyleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  socialStyleButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  socialStyleText: {
    fontSize: 14,
    color: '#666',
  },
  socialStyleTextActive: {
    color: 'white',
  },
  hangoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  hangoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginBottom: 12,
    marginRight: 12,
  },
  hangoutButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  hangoutText: {
    fontSize: 14,
    color: '#666',
  },
  hangoutTextActive: {
    color: 'white',
  },
  expandedContent: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  subCategoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    marginTop: 8,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  genreButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  genreButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  musicGenreButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  largePill: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 80,
  },
  genreText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  genreTextActive: {
    color: 'white',
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  customInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  // customMusicSection: {   // Removed duplicate definition
  //   marginTop: 16,
  // },
  customMusicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  removePillIcon: {
    marginLeft: 6,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalScrollView: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  teamButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginBottom: 8,
  },
  teamButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  teamButtonText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  teamButtonTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  customInfluenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  customInfluenceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  customInfluenceText: {
    fontSize: 14,
    color: '#999',
  },
  addInfluenceButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addInfluenceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  promptRow: {
    marginBottom: 12,
    height: 50,
  },
  promptRowContent: {
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  promptButton: {
      marginRight: 4,
    minWidth: 120,
  },
  promptButtonWrapper: {
    position: 'relative',
      marginRight: 4,
  },
  promptRemoveButton: {
    position: 'absolute',
    top: 0,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  promptInputContainer: {
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  promptInputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  promptTextInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 120,
    marginBottom: 20,
  },
  modalDoneButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignSelf: 'center',
    minWidth: 100,
  },
  modalDoneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});



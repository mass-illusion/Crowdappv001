import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CoreTab from './edit-profile/CoreTab';
import InterestsTab from './edit-profile/InterestsTab';
import EditProfileTabs from './edit-profile/layout-groups/EditProfileTabs';
import PersonalityTab from './edit-profile/PersonalityTab';
import PromptsTab from './edit-profile/PromptsTab';

const tabList = ['Core', 'Personality', 'Interests', 'Prompts'];

export default function EditProfileModular() {
  // --- State (copied from edit-profile.tsx) ---
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
    'White/Caucasian', 'Hispanic/Latino', 'Black/African American', 'Asian', 'Native American', 'Middle Eastern', 'Mixed/Multiracial', 'Other', 'Prefer not to say'
  ];
  const [occupation, setOccupation] = useState('');
  const [industry, setIndustry] = useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const industryOptions = [
    'Technology', 'Healthcare & Medicine', 'Finance & Banking', 'Education', 'Retail & Consumer Goods', 'Manufacturing', 'Real Estate', 'Professional Services', 'Media & Entertainment', 'Transportation & Logistics', 'Food & Beverage', 'Construction', 'Energy & Utilities', 'Government & Public Sector', 'Non-Profit', 'Agriculture', 'Hospitality & Tourism', 'Automotive', 'Telecommunications', 'Insurance', 'Legal Services', 'Consulting', 'Marketing & Advertising', 'Aerospace & Defense', 'Pharmaceuticals', 'Other'
  ];
  const [religion, setReligion] = useState('');
  const [showReligionDropdown, setShowReligionDropdown] = useState(false);
  const religionOptions = [
    'Christianity', 'Catholic', 'Baptist', 'Judaism', 'Islam', 'Buddhism', 'Hinduism', 'Mormon/LDS', 'Jehovah\'s Witness', 'Agnostic', 'Atheist', 'Spiritual but not religious', 'Non-denominational', 'Other', 'Prefer not to say'
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
    'Single', 'In a relationship', 'Married', 'Engaged', 'Situationship', 'Separated', 'Divorced', 'Widowed', 'Ethical non-monogamy', 'Prefer not to say'
  ];
  const primaryGoalsOptions = [
    'Find friends in my city', 'Meet people at events', 'Join hobby groups', 'Collaborate professionally', 'Travel buddies', 'Deep 1:1 connections'
  ];
  const socialStyleOptions = [
    '👥 Small group', '🎉 Large scene', '💬 1:1 hangouts'
  ];
  const idealHangoutsOptions = [
    '☕ Coffee', '🎵 Concerts', '💅 Nails', '💪 Workouts', '🎮 Game nights', '🌿 420', '🔥 BBQ', '🎨 Creative', '🏔️ Outdoors', '🛠️ Building something', '🎣 Fishing', '🍽️ Food & Drinks', '🕺 Club', '🎬 Movies', '🍻 Sports bar', '🧳 Weekend getaway', '🚙 Offroading', '💆‍♀️ Spa Day', '🛍️ Shop', '🤱 Mom Hangs', '🏟️ Sports Game', '🍄 Psychedelics', '📱 Make Content', '🏠 Stay In'
  ];
  const [showOnProfile, setShowOnProfile] = useState(true);

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

  // Music, sports, anime, etc. (add more as needed)
  const [showMusicExpanded, setShowMusicExpanded] = useState(false);
  const [selectedMusicGenres, setSelectedMusicGenres] = useState<string[]>([]);
  const [selectedRavingPrefs, setSelectedRavingPrefs] = useState<string[]>([]);
  const [customMusicInput, setCustomMusicInput] = useState('');
  const [selectedMusicActivities, setSelectedMusicActivities] = useState<string[]>([]);
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
  const [showAnimeExpanded, setShowAnimeExpanded] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<string[]>([]);
  const [customAnimeInput, setCustomAnimeInput] = useState('');
  const [showVideoGamesExpanded, setShowVideoGamesExpanded] = useState(false);
  const [selectedVideoGames, setSelectedVideoGames] = useState<string[]>([]);
  const [customVideoGameInput, setCustomVideoGameInput] = useState('');
  const [showPassionExpanded, setShowPassionExpanded] = useState(false);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);
  const [customPassionInput, setCustomPassionInput] = useState('');
  const [showArtsCultureExpanded, setShowArtsCultureExpanded] = useState(false);
  const [selectedArtsCulture, setSelectedArtsCulture] = useState<string[]>([]);
  const [selectedArtsMediums, setSelectedArtsMediums] = useState<string[]>([]);
  const [showFoodDrinksExpanded, setShowFoodDrinksExpanded] = useState(false);
  const [selectedFoodDrinks, setSelectedFoodDrinks] = useState<string[]>([]);
  const [showInfluencesExpanded, setShowInfluencesExpanded] = useState(false);
  const [selectedInfluences, setSelectedInfluences] = useState<string[]>([]);
  const [showOutdoorsExpanded, setShowOutdoorsExpanded] = useState(false);
  const [selectedOutdoors, setSelectedOutdoors] = useState<string[]>([]);
  const [customOutdoorsInput, setCustomOutdoorsInput] = useState('');
  const [showFitnessExpanded, setShowFitnessExpanded] = useState(false);
  const [selectedFitness, setSelectedFitness] = useState<string[]>([]);
  const [customFitnessInput, setCustomFitnessInput] = useState('');
  const [showBusinessExpanded, setShowBusinessExpanded] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
  const [customBusinessInput, setCustomBusinessInput] = useState('');
  const [showTechnologyExpanded, setShowTechnologyExpanded] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
  const [customTechnologyInput, setCustomTechnologyInput] = useState('');
  const [showFamilyKidsExpanded, setShowFamilyKidsExpanded] = useState(false);
  const [selectedFamilyKids, setSelectedFamilyKids] = useState<string[]>([]);
  const [showComedyEntertainmentExpanded, setShowComedyEntertainmentExpanded] = useState(false);
  const [selectedComedyEntertainment, setSelectedComedyEntertainment] = useState<string[]>([]);

  // --- Handlers (add more as needed, e.g., toggle functions, saveProfileData, etc.) ---
  // Example: const togglePrimaryGoal = (goal: string) => { ... };

  // --- Tab rendering ---
  const renderTab = () => {
    switch (activeTab) {
      case 'Core':
        return <CoreTab
          firstName={firstName}
          setFirstName={setFirstName}
          userName={userName}
          setUserName={setUserName}
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          showGenderDropdown={showGenderDropdown}
          setShowGenderDropdown={setShowGenderDropdown}
          genderOptions={genderOptions}
          ethnicity={ethnicity}
          setEthnicity={setEthnicity}
          showEthnicityDropdown={showEthnicityDropdown}
          setShowEthnicityDropdown={setShowEthnicityDropdown}
          ethnicityOptions={ethnicityOptions}
          occupation={occupation}
          setOccupation={setOccupation}
          industry={industry}
          setIndustry={setIndustry}
          showIndustryDropdown={showIndustryDropdown}
          setShowIndustryDropdown={setShowIndustryDropdown}
          industryOptions={industryOptions}
          religion={religion}
          setReligion={setReligion}
          showReligionDropdown={showReligionDropdown}
          setShowReligionDropdown={setShowReligionDropdown}
          religionOptions={religionOptions}
          relationshipStatus={relationshipStatus}
          setRelationshipStatus={setRelationshipStatus}
          showRelationshipDropdown={showRelationshipDropdown}
          setShowRelationshipDropdown={setShowRelationshipDropdown}
          relationshipOptions={relationshipOptions}
          primaryGoals={primaryGoals}
          setPrimaryGoals={setPrimaryGoals}
          primaryGoalsOptions={primaryGoalsOptions}
          socialStyle={socialStyle}
          setSocialStyle={setSocialStyle}
          socialStyleOptions={socialStyleOptions}
          idealHangouts={idealHangouts}
          setIdealHangouts={setIdealHangouts}
          idealHangoutsOptions={idealHangoutsOptions}
          customHangoutInput={customHangoutInput}
          setCustomHangoutInput={setCustomHangoutInput}
          showIdealHangoutsExpanded={showIdealHangoutsExpanded}
          setShowIdealHangoutsExpanded={setShowIdealHangoutsExpanded}
          showSocialGoals={showSocialGoals}
          setShowSocialGoals={setShowSocialGoals}
          showSocialStyle={showSocialStyle}
          setShowSocialStyle={setShowSocialStyle}
          showIdealHangouts={showIdealHangouts}
          setShowIdealHangouts={setShowIdealHangouts}
          showOnProfile={showOnProfile}
          setShowOnProfile={setShowOnProfile}
          styles={styles}
        />;
      case 'Personality':
        return <PersonalityTab
          showPromptsExpanded={showPromptsExpanded}
          setShowPromptsExpanded={setShowPromptsExpanded}
          promptResponses={promptResponses}
          setPromptResponses={setPromptResponses}
          selectedPrompts={selectedPrompts}
          setSelectedPrompts={setSelectedPrompts}
          togglePrompt={(promptKey: string) => {
            setShowPromptsExpanded(prev => !prev);
            setExpandedPromptInput(promptKey);
          }}
          saveProfileData={() => {
            // Implement your save logic here or pass a real function
            console.log('Profile data saved');
          }}
          styles={styles}
        />;
      case 'Interests':
        return <InterestsTab
          // Add all relevant props for InterestsTab
          styles={styles}
        />;
      case 'Prompts':
        return <PromptsTab
          // Add all relevant props for PromptsTab
        />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <EditProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} tabList={tabList} styles={styles} />
      {renderTab()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

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
  const genderOptions = [
    'Woman',
    'Man',
    'Non-binary',
    'Genderfluid',
    'Transgender',
    'Agender',
    'Demigender',
    'Two-Spirit',
    'Other',
    'Prefer not to say'
  ];
  const [ethnicity, setEthnicity] = useState('');
  const [showEthnicityDropdown, setShowEthnicityDropdown] = useState(false);
  const [importantCulture, setImportantCulture] = useState(false);
  const ethnicityOptions = [
    'White/Caucasian',
    'Hispanic/Latino',
    'Black/African American',
    'Asian',
    'Native American/Alaska Native',
    'Native Hawaiian/Pacific Islander',
    'Middle Eastern/North African',
    'Mixed/Multiracial',
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
    'Retail & Consumer Goods',
    'Manufacturing',
    'Real Estate',
    'Professional Services',
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
    'Protestant',
    'Catholic',
    'Baptist',
    'Methodist',
    'Presbyterian',
    'Lutheran',
    'Pentecostal',
    'Episcopal/Anglican',
    'Judaism',
    'Islam',
    'Buddhism',
    'Hinduism',
    'Mormon/LDS',
    'Jehovah\'s Witness',
    'Orthodox Christian',
    'Unitarian Universalist',
    'Agnostic',
    'Atheist',
    'Spiritual but not religious',
    'Non-denominational',
    'Other',
    'Prefer not to say'
  ];
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
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
  const [showOnProfile, setShowOnProfile] = useState(true);

  // Personality tab states
  const [socialEnergy, setSocialEnergy] = useState('Ambivert');
  const [weekendMood, setWeekendMood] = useState('Chill');
  const [loveLanguage, setLoveLanguage] = useState('');
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

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [])
  );

  const loadProfileData = async () => {
    try {
      const profilePhoto = await AsyncStorage.getItem('profilePhoto');
      const name = await AsyncStorage.getItem('firstName');
      
      if (profilePhoto) setUserProfileImage(profilePhoto);
      if (name) setFirstName(name);
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  const saveProfile = async () => {
    // Save profile data logic here
    router.back();
  };

  const renderCoreTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Identity</Text>
        <Text style={styles.sectionDescription}>
          Sharing help us improve compatibility and personalize matches! Not all details are visible on your profile. Preview and manage visibility at anytime.
        </Text>
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
            onChangeText={setUserName}
            placeholder=""
          />
        </View>
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>About Me</Text>
        <TextInput
          style={[styles.textInput, styles.textArea, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
          value={aboutMe}
          onChangeText={setAboutMe}
          placeholder="Describe yourself in a way your friends would."
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>My dream is...</Text>
        <TextInput
          style={[styles.textInput, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
          value={dreamIs}
          onChangeText={setDreamIs}
          placeholder=""
        />
      </View>

      <View style={[styles.fieldGroup, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Location</Text>
        <TextInput
          style={[styles.textInput, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
        />
      </View>

      <View style={[styles.row, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedField]}>
        <View style={[styles.fieldGroup, styles.halfWidth]}>
          <Text style={[styles.fieldLabel, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedText]}>Age</Text>
          <TextInput
            style={[styles.textInput, (showEthnicityDropdown || showIndustryDropdown || showReligionDropdown || showGenderDropdown) && styles.dimmedInput]}
            value={age}
            onChangeText={setAge}
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
          <View style={styles.dropdownContainer}>
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
                  <View style={styles.dropdownBackdrop} />
                </TouchableWithoutFeedback>
                <View style={styles.dropdownOverlay}>
                  <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                    {genderOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.dropdownItem, index === genderOptions.length - 1 && styles.lastDropdownItem]}
                        onPress={() => {
                          setGender(option);
                          setShowGenderDropdown(false);
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
          onChangeText={setOccupation}
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

      <TouchableOpacity style={styles.goalButton}>
        <Text style={styles.goalButtonText}>Social & Friendship Goals</Text>
        <Ionicons name="chevron-forward" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

  const renderPersonalityTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personality</Text>
        <Text style={styles.sectionDescription}>
          Share your personality so we can connect you with like-minded friends and communities.
        </Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Social Energy</Text>
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

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Love Language (Friend Edition)</Text>
        <Text style={styles.fieldSubtext}>Quality Time</Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Acts of Service</Text>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>Humor</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Deep Talk</Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Communication Style</Text>
        <TouchableOpacity style={styles.dropdownButton}>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Conflict Style</Text>
        <TouchableOpacity style={styles.dropdownButton}>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.goalButton}>
        <Text style={styles.goalButtonText}>Friendship Goals</Text>
        <Ionicons name="chevron-forward" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
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
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🎵</Text>
          </View>
          <Text style={styles.categoryTitle}>Music</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🎨</Text>
          </View>
          <Text style={styles.categoryTitle}>Arts & Culture</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🍽️</Text>
          </View>
          <Text style={styles.categoryTitle}>Food & Drink</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
        <View style={styles.interestTags}>
          <View style={styles.interestTag}>
            <Text style={styles.interestTagText}>Foodie</Text>
          </View>
          <View style={styles.interestTag}>
            <Text style={styles.interestTagText}>Bar Hopping</Text>
          </View>
        </View>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>🏃</Text>
          </View>
          <Text style={styles.categoryTitle}>Outdoorsy</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>💼</Text>
          </View>
          <Text style={styles.categoryTitle}>Sports & Fitness</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
        <View style={styles.interestTags}>
          <View style={styles.interestTag}>
            <Text style={styles.interestTagText}>Yoga Sessions</Text>
          </View>
        </View>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>💼</Text>
          </View>
          <Text style={styles.categoryTitle}>Business & Networking</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>👨‍👩‍👧‍👦</Text>
          </View>
          <Text style={styles.categoryTitle}>Family & Kids</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>💻</Text>
          </View>
          <Text style={styles.categoryTitle}>Technology</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>😂</Text>
          </View>
          <Text style={styles.categoryTitle}>Comedy & Entertainment</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.interestCategory}>
        <TouchableOpacity style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>✈️</Text>
          </View>
          <Text style={styles.categoryTitle}>Travel & Adventures</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.goalButton}>
        <Text style={styles.goalButtonText}>Interests</Text>
        <Ionicons name="chevron-down" size={20} color="#007AFF" />
      </TouchableOpacity>
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
          <TouchableOpacity style={styles.previewButton} onPress={() => router.push('/profile')}>
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
          <TouchableOpacity style={styles.editImageButton}>
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
            onPress={() => setActiveTab(tab)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    padding: 8,
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
    marginBottom: 8,
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
  dropdownBackdrop: {
    position: 'absolute',
    top: -2000,
    left: -2000,
    width: 4000,
    height: 4000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1999,
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
    zIndex: 1001,
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
    padding: 16,
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
  goalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  goalButtonText: {
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
    marginBottom: 4,
  },
  moodText: {
    fontSize: 12,
    color: '#666',
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
    marginBottom: 16,
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
});
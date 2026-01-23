import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface PromptsGroupProps {
  showPromptsExpanded: boolean;
  setShowPromptsExpanded: (show: boolean) => void;
  promptResponses: { [key: string]: string };
  setPromptResponses: (val: any) => void;
  selectedPrompts: string[];
  setSelectedPrompts: (val: any) => void;
  togglePrompt: (prompt: string) => void;
  saveProfileData: () => void;
  styles: any;
}

const PROMPTS = [
  "All I want is",
  'I can make a mean',
  'My dream is to',
  'That one time in Vegas',
  'A pet peeve',
  'If I won the lottery',
  'Favorite movie',
  "I'm obsessed with",
  'Ronaldo or Messi?',
  'Top travel destinations',
  'Greatest athlete of all time',
  'Hot Take',
  'My idea of a good time is',
  "I'm awesome at",
  'My proudest moment',
  'My guilty pleasure',
  'I go to bed at',
  'My role model',
  "People would say I'm",
  "We'll get along if",
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
  "I'm allergic to",
  'Bucket List',
  'Favorite pet',
  'Favorite word/phrase',
  
  "Word/phrase I can't stand",
  "Let's go"
];

const PromptsGroup: React.FC<PromptsGroupProps> = ({
  showPromptsExpanded,
  setShowPromptsExpanded,
  promptResponses,
  setPromptResponses,
  selectedPrompts,
  setSelectedPrompts,
  togglePrompt,
  saveProfileData,
  styles
}) => {
  // Group prompts into rows of 6 for longer horizontal scroll
  const rows = [];
  for (let i = 0; i < PROMPTS.length; i += 6) {
    rows.push(PROMPTS.slice(i, i + 6));
  }

  return (
    <View style={styles.interestCategory}>
      <TouchableOpacity 
        style={styles.musicHeader}
        onPress={() => setShowPromptsExpanded(!showPromptsExpanded)}
      >
        <Text style={styles.fieldLabel}>Prompts</Text>
        {/* Ionicons chevron icon should be rendered by parent for consistency */}
      </TouchableOpacity>
      {showPromptsExpanded && (
        <View style={[styles.expandedContent, { paddingHorizontal: 0 }]}> 
          <Text style={[styles.sectionDescription, { marginLeft: 7, marginBottom: 16 }]}>Pick at least 3</Text>
          <View>
            {rows.map((row, rowIndex) => (
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
                        onPress={() => togglePrompt(prompt)}
                      >
                        <Text style={[
                          styles.genreText,
                          (promptResponses[prompt]?.trim().length > 0) && styles.genreTextActive
                        ]}>
                          {prompt}
                        </Text>
                      </TouchableOpacity>
                      {(promptResponses[prompt]?.trim().length > 0) && (
                        <TouchableOpacity
                          style={styles.promptRemoveButton}
                          onPress={() => {
                            setPromptResponses((prev: any) => ({ ...prev, [prompt]: '' }));
                            setSelectedPrompts((prev: any) => prev.filter((p: string) => p !== prompt));
                            setTimeout(() => saveProfileData(), 100);
                          }}
                        >
                          {/* Ionicons close icon should be rendered by parent for consistency */}
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default PromptsGroup;


import React from 'react';
import PromptsGroup from './personality-groups/PromptsGroup';

interface PersonalityTabProps {
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

const PersonalityTab: React.FC<PersonalityTabProps> = ({
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
  return (
    <PromptsGroup
      showPromptsExpanded={showPromptsExpanded}
      setShowPromptsExpanded={setShowPromptsExpanded}
      promptResponses={promptResponses}
      setPromptResponses={setPromptResponses}
      selectedPrompts={selectedPrompts}
      setSelectedPrompts={setSelectedPrompts}
      togglePrompt={togglePrompt}
      saveProfileData={saveProfileData}
      styles={styles}
    />
  );
};

export default PersonalityTab;

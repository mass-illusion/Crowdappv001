import React from 'react';
import { View } from 'react-native';
import PromptsGroup from './personality-groups/PromptsGroup';

// TODO: Add prop types for all state/handlers needed for Prompts tab
const PromptsTab = (props: any) => {
  // Destructure props as needed
  // const { showPromptsExpanded, setShowPromptsExpanded, ... } = props;
  return (
    <View>
      <PromptsGroup {...props} />
    </View>
  );
};

export default PromptsTab;

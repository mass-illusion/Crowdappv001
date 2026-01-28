import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface EditProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabList: string[];
  styles: any;
}

const EditProfileTabs: React.FC<EditProfileTabsProps> = ({ activeTab, setActiveTab, tabList, styles }) => (
  <View style={styles.tabsContainer}>
    {tabList.map(tab => (
      <TouchableOpacity
        key={tab}
        style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
        onPress={() => setActiveTab(tab)}
      >
        <Text style={[styles.tabButtonText, activeTab === tab && styles.tabButtonTextActive]}>{tab}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default EditProfileTabs;

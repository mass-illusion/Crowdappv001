import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StarredProfile {
  id: number;
  name: string;
  image: any;
  spotName: string;
  sharedInterests: number;
}

interface StarredProfilesContextType {
  starredProfiles: StarredProfile[];
  addStarredProfile: (profile: StarredProfile) => void;
  removeStarredProfile: (profileId: number) => void;
  isProfileStarred: (profileId: number) => boolean;
}

const StarredProfilesContext = createContext<StarredProfilesContextType | undefined>(undefined);

export const StarredProfilesProvider = ({ children }: { children: ReactNode }) => {
  const [starredProfiles, setStarredProfiles] = useState<StarredProfile[]>([]);

  // Load starred profiles from AsyncStorage on component mount
  useEffect(() => {
    loadStarredProfiles();
  }, []);

  const loadStarredProfiles = async () => {
    try {
      const stored = await AsyncStorage.getItem('starredProfiles');
      if (stored) {
        setStarredProfiles(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading starred profiles:', error);
    }
  };

  const saveStarredProfiles = async (profiles: StarredProfile[]) => {
    try {
      await AsyncStorage.setItem('starredProfiles', JSON.stringify(profiles));
    } catch (error) {
      console.log('Error saving starred profiles:', error);
    }
  };

  const addStarredProfile = (profile: StarredProfile) => {
    setStarredProfiles(prev => {
      if (prev.find(p => p.id === profile.id)) {
        return prev;
      }
      const newProfiles = [...prev, profile];
      saveStarredProfiles(newProfiles);
      return newProfiles;
    });
  };

  const removeStarredProfile = (profileId: number) => {
    setStarredProfiles(prev => {
      const newProfiles = prev.filter(p => p.id !== profileId);
      saveStarredProfiles(newProfiles);
      return newProfiles;
    });
  };

  const isProfileStarred = (profileId: number) => {
    return starredProfiles.some(p => p.id === profileId);
  };

  return (
    <StarredProfilesContext.Provider
      value={{
        starredProfiles,
        addStarredProfile,
        removeStarredProfile,
        isProfileStarred,
      }}
    >
      {children}
    </StarredProfilesContext.Provider>
  );
};

export const useStarredProfiles = () => {
  const context = useContext(StarredProfilesContext);
  if (context === undefined) {
    throw new Error('useStarredProfiles must be used within a StarredProfilesProvider');
  }
  return context;
};

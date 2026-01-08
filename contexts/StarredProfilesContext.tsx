import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  const addStarredProfile = (profile: StarredProfile) => {
    setStarredProfiles(prev => {
      if (prev.find(p => p.id === profile.id)) {
        return prev;
      }
      return [...prev, profile];
    });
  };

  const removeStarredProfile = (profileId: number) => {
    setStarredProfiles(prev => prev.filter(p => p.id !== profileId));
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

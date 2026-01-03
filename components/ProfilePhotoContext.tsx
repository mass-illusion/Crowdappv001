import React, { createContext, useContext, useState } from 'react';

const ProfilePhotoContext = createContext({
  uri: '',
  setUri: (uri: string) => {},
});

export const useProfilePhoto = () => useContext(ProfilePhotoContext);

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uri, setUri] = useState('');
  return (
    <ProfilePhotoContext.Provider value={{ uri, setUri }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};

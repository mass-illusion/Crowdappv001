
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { ActionSheetIOS, Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EMPTY_AVATAR = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

interface UploadProps {
  onComplete?: () => void;
}

const Upload: React.FC<UploadProps> = ({ onComplete }) => {
  const router = useRouter();
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null, null, null]);

  const handleChoosePhoto = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Permission to access gallery is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhotos(prev => {
        const updated = [...prev];
        if (index >= 0 && index < updated.length) {
          updated[index] = uri;
        } else {
          const emptyIdx = updated.findIndex(p => !p);
          if (emptyIdx !== -1) updated[emptyIdx] = uri;
        }
        return updated;
      });
      if (index === 0) {
        try {
          await AsyncStorage.setItem('profilePhoto', uri);
        } catch (e) {
          console.warn('Failed saving profile photo', e);
        }
      }
    }
  };

  const handleTakePhoto = async (index: number) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Permission to access camera is required!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhotos(prev => {
        const updated = [...prev];
        if (index >= 0 && index < updated.length) {
          updated[index] = uri;
        } else {
          const emptyIdx = updated.findIndex(p => !p);
          if (emptyIdx !== -1) updated[emptyIdx] = uri;
        }
        return updated;
      });
    }
  };

  const handleProfilePhotoPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Choose from Gallery', 'Take Photo'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) handleChoosePhoto(0);
          if (buttonIndex === 2) handleTakePhoto(0);
        }
      );
    } else {
      Alert.alert(
        'Profile Photo',
        'Select an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Choose from Gallery', onPress: () => handleChoosePhoto(0) },
          { text: 'Take Photo', onPress: () => handleTakePhoto(0) },
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Forward Arrow Top Right */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => router.replace('/LookingForScreen')}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
      <Text style={styles.title}>UPLOAD</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleProfilePhotoPress} activeOpacity={0.8}>
            <Image source={photos[0] ? { uri: photos[0] } : { uri: EMPTY_AVATAR }} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={() => handleChoosePhoto(0)}>
            <Ionicons name="camera" size={28} color="#222" />
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {[1,2,3,4,5].map(i => (
            <TouchableOpacity key={i} style={styles.gridItem} onPress={() => handleChoosePhoto(i)}>
              {photos[i] ? (
                <Image source={{ uri: photos[i] as string }} style={styles.gridPhoto} />
              ) : (
                <View style={styles.gridPlaceholder} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleChoosePhoto(-1)}>
        <Ionicons name="image" size={22} color="#222" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Choose a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleTakePhoto(-1)}>
        <Ionicons name="camera" size={22} color="#222" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Take photo</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    position: 'absolute',
    top: 40,
    right: 32,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 10,
  },
  arrowText: {
    fontSize: 32,
    color: '#e0e0e0',
    textShadowColor: '#e0e0e0',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 0,
    marginBottom: 40,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#E6E9ED',
    marginBottom: 16,
    alignSelf: 'center',
    letterSpacing: 2,
    textShadowColor: '#bbb',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fafbfc',
    borderRadius: 32,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 12,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#ddd',
  },
  cameraButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#222',
    zIndex: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
    marginTop: 8,
    marginBottom: 0,
  },
  gridItem: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginTop: 16,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 14,
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default Upload;

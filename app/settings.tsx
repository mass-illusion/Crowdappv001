import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';


function SettingsScreen() {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Replace this with your actual log out logic
  const handleLogout = () => {
    setShowLogoutModal(false);
    // TODO: Add your real log out logic here (e.g., clear tokens, navigate to login)
    // Example: navigation.reset({ index: 0, routes: [{ name: 'welcome' }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.chevronBtn} onPress={() => navigation.navigate('homepage' as never)}>
          <Ionicons name="chevron-back" size={25} color="#3A5A7A" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>Yennefer Doe</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Account Settings</Text>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('edit-profile' as never)}>
          <Text style={styles.rowText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('change-password' as never)}>
          <Text style={styles.rowText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('friend-preferences' as never)}>
          <Text style={styles.rowText}>Friend preferences</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.rowText}>Push notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: '#F0F0F0', true: '#B3D8F7' }}
            thumbColor={pushNotifications ? '#fff' : '#fff'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>Dark mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#F0F0F0', true: '#B3D8F7' }}
            thumbColor={darkMode ? '#fff' : '#fff'}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>More</Text>
        <View style={styles.row}>
          <Text style={styles.rowText}>+1 (555) 123-4567</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>sabrina@email.com</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => {/* Blocked logic */}}>
          <Text style={styles.rowText}>Blocked</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => setShowLogoutModal(true)}>
          <Text style={styles.rowText}>Log Out</Text>
        </TouchableOpacity>
        {/* Log Out Modal */}
        {showLogoutModal && (
          <Modal
  visible={showLogoutModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowLogoutModal(false)}
>
  <View style={modalStyles.overlay}>
    <View style={modalStyles.modalBox}>
      <Text style={modalStyles.title}>Log out</Text>
      <Text style={modalStyles.subtitle}>Are you sure you want to log out?</Text>

      <TouchableOpacity style={modalStyles.logoutBtn} onPress={handleLogout}>
        <Text style={modalStyles.logoutBtnText}>Log out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowLogoutModal(false)}>
        <Text style={modalStyles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

        )}
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F0FA' },
  header: { paddingTop: 48, paddingBottom: 16, backgroundColor: '#E6F0FA', alignItems: 'center' },
  profileSection: { alignItems: 'center', marginTop: 24, marginBottom: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginBottom: 8, borderWidth: 2, borderColor: '#fff' },
  profileName: { fontSize: 18, fontWeight: '600', color: '#222' },
  section: { backgroundColor: '#fff', marginHorizontal: 16, marginVertical: 8, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, marginTop: 8 },
  sectionLabel: { fontSize: 16, fontWeight: 'bold', color: '#A0AEC0', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  rowText: { fontSize: 16, color: '#222' },
  chevronBtn: {
    position: 'absolute',
    left: 16,
    top: 48,
    zIndex: 2,
    padding: 8,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalBox: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
    textAlign: 'center',
  },
  logoutBtn: {
    backgroundColor: '#B3D8F7',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#B3D8F7',
  },
  logoutBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  cancelText: {
    color: '#888',
    fontSize: 16,
    marginTop: 2,
    textAlign: 'center',
  },
});

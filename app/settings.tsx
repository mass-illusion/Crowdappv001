import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

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
        <TouchableOpacity style={styles.row} onPress={() => {/* Log Out logic */}}>
          <Text style={styles.rowText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

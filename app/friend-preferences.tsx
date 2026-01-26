import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';




const LOOKING_FOR_OPTIONS = [
 { label: 'Real\nFriends', icon: '👫' },
 { label: 'Event Buddies', icon: '🕺' },
 { label: 'Industry Peers', icon: '🏢' },
 { label: 'Shared Passions', icon: '🎨' },
 { label: 'Friend Groups', icon: '👥' },
 { label: 'Micro Community', icon: '🎮' },
];


export default function FriendPreferences() {
 const navigation = useNavigation();
 const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);
 const [friendType, setFriendType] = useState('Girl Friends');
 const [location, setLocation] = useState('');
 const [distance, setDistance] = useState(50);
 const [ageRange, setAgeRange] = useState([28, 38]);


 return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     <View style={styles.container}>
       <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
         <Ionicons name="chevron-back" size={24} color="#A0AEC0" />
       </TouchableOpacity>
       <Text style={styles.headerText}>Preferences</Text>
       <View style={styles.card}>
         <View style={styles.lookingForGrid}>
           {LOOKING_FOR_OPTIONS.map((opt, idx) => (
             <TouchableOpacity
               key={opt.label}
               style={[styles.lookingForItem, selectedLookingFor.includes(opt.label) && styles.lookingForItemActive]}
               onPress={() => {
                 setSelectedLookingFor((prev) =>
                   prev.includes(opt.label)
                     ? prev.filter((l) => l !== opt.label)
                     : [...prev, opt.label]
                 );
               }}
             >
               <Text style={styles.lookingForIcon}>{opt.icon}</Text>
               <Text style={styles.lookingForLabel}>{opt.label}</Text>
             </TouchableOpacity>
           ))}
         </View>
         <View style={styles.friendTypeRow}>
           <TouchableOpacity style={[styles.friendTypeBtn, friendType === 'Girl Friends' && styles.friendTypeBtnActive]} onPress={() => setFriendType('Girl Friends')}>
             <Text style={[styles.friendTypeText, friendType === 'Girl Friends' && styles.friendTypeTextActive]}>Girl Friends</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.friendTypeBtn, friendType === 'Guy Friends' && styles.friendTypeBtnActive]} onPress={() => setFriendType('Guy Friends')}>
             <Text style={[styles.friendTypeText, friendType === 'Guy Friends' && styles.friendTypeTextActive]}>Guy Friends</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.friendTypeBtn, friendType === 'Both' && styles.friendTypeBtnActive]} onPress={() => setFriendType('Both')}>
             <Text style={[styles.friendTypeText, friendType === 'Both' && styles.friendTypeTextActive]}>Both</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.locationRow}>
           <TextInput
             style={styles.locationInput}
             value={location}
             onChangeText={setLocation}
             placeholder="Select or enable location"
           />
         </View>
         <View style={styles.sliderRow}>
           <Text style={styles.sliderLabel}>Distance</Text>
           <Text style={styles.sliderValue}>{distance} mi</Text>
         </View>
         <Slider
           style={{ width: '100%', height: 32, marginBottom: 16 }}
           minimumValue={0}
           maximumValue={100}
           step={1}
           value={distance}
           onValueChange={setDistance}
           minimumTrackTintColor="#B3D8F7"
           maximumTrackTintColor="#F0F0F0"
           thumbTintColor="#B3D8F7"
         />
         <View style={{ width: '100%', marginTop: 12, marginBottom: 16 }}>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
             <Text style={styles.sliderLabel}>Age</Text>
             <Text style={styles.sliderValue}>{ageRange[0]}–{ageRange[1]}</Text>
           </View>
           <MultiSlider
             values={ageRange}
             min={16}
             max={80}
             step={1}
             onValuesChange={vals => setAgeRange(vals)}
             selectedStyle={{ backgroundColor: '#B3D8F7', height: 6, borderRadius: 3 }}
             unselectedStyle={{ backgroundColor: '#F0F0F0', height: 6, borderRadius: 3 }}
             markerStyle={{ backgroundColor: '#B3D8F7', borderWidth: 0 }}
             containerStyle={{ marginTop: 0, marginBottom: 0, paddingHorizontal: 0, width: '100%' }}
             trackStyle={{ height: 4, borderRadius: 2, width: '100%' }}
           />
         </View>
         <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.goBack()}>
           <Text style={styles.doneBtnText}>Done</Text>
         </TouchableOpacity>
       </View>
     </View>
   </TouchableWithoutFeedback>
 );
}


const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 12, paddingTop: 90 },
 backBtn: { position: 'absolute', left: 8, top: 48, zIndex: 2, padding: 8 },
 headerText: {
   fontSize: 28,
   fontWeight: 'bold',
   color: '#A0AEC0',
   textAlign: 'center',
   marginBottom: -20,
 },
card: { backgroundColor: '#fff', borderRadius: 24, paddingVertical: 18, paddingHorizontal: 32, marginTop: 32, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 12, alignItems: 'center' },
 lookingForGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 22 },
 lookingForItem: { width: '30%', margin: '1.5%', alignItems: 'center', padding: 8, borderRadius: 12 },
 lookingForItemActive: { backgroundColor: '#F6F8FB' },
 lookingForIcon: { fontSize: 28, color: '#A0AEC0', marginBottom: 4 },
 lookingForLabel: { fontSize: 13, color: '#A0AEC0', textAlign: 'center' },
 friendTypeRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32 },
 friendTypeBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#F6F8FB', marginHorizontal: 2 },
 friendTypeBtnActive: { backgroundColor: '#B3D8F7' },
 friendTypeText: { fontSize: 15, color: '#A0AEC0', textAlign: 'center' },
 friendTypeTextActive: { color: '#fff', fontWeight: 'bold' },
 locationRow: { marginBottom: 40, width: '100%' },
 locationInput: { backgroundColor: '#F6F8FB', borderRadius: 8, padding: 12, fontSize: 15, color: '#A0AEC0' },
 sliderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, width: '100%' },
 sliderLabel: { fontSize: 15, color: '#A0AEC0' },
 sliderValue: { fontSize: 15, color: '#A0AEC0' },
doneBtn: { backgroundColor: '#B3D8F7', borderRadius: 24, alignItems: 'center', paddingVertical: 14, marginTop: 14, width: '100%' },
 doneBtnText: { color: '#fff', fontSize: 18, fontWeight: '500' },
});




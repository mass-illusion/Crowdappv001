import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import PillSlider from '../components/PillSlider';
// Import the same PASSION_INTERESTS array as in edit-profile.tsx
const PASSION_INTERESTS = [
  { id: 'music', label: 'Music', emoji: '🎧' },
  { id: 'business', label: 'Business', emoji: '📈' },
  { id: 'sports', label: 'Sports', emoji: '🏀' },
  { id: 'raves', label: 'Raving', emoji: '🕺' },
  { id: 'fitness', label: 'Fitness', emoji: '🏋️' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'parenting', label: 'Parenting', emoji: '👶' },
  { id: 'filmContent', label: 'Content', emoji: '🎬' },
  { id: 'dj', label: 'DJ', emoji: '🎧' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'pets', label: 'Animals', emoji: '🐶' },
  { id: 'photography', label: 'Photos', emoji: '📷' },
  { id: 'reading', label: 'Reading', emoji: '📚' },
  { id: 'anime', label: 'Anime', emoji: '👾' },
  { id: 'singing', label: 'Singing', emoji: '🎤' },
  { id: 'technology', label: 'Tech', emoji: '📱' },
  { id: 'travel', label: 'Travel', emoji: '🗺️' },
  { id: 'writing', label: 'Writing', emoji: '📝' },
  { id: 'cooking', label: 'Cooking', emoji: '🍳' },
  { id: 'cinema', label: 'Cinema', emoji: '🎬' },
  { id: 'investing', label: 'Investing', emoji: '💰' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'cars', label: 'Cars', emoji: '🏎️' },
  { id: 'hiking', label: 'Hiking', emoji: '🥾' },
  { id: 'art', label: 'Art', emoji: '🎨' },
  { id: 'boardGames', label: 'Chess', emoji: '♟️' },
  { id: 'musicians', label: 'Jammin', emoji: '🎻' },
  { id: 'partying', label: 'Partying', emoji: '🎉' },
  { id: 'lgbtRights', label: 'LGBT', emoji: '🏳️‍🌈' },
  { id: 'disney', label: 'Disney', emoji: '🏰' },
  { id: 'concerts', label: 'Concerts', emoji: '🎤' },
  { id: 'ai', label: 'AI', emoji: '🤖' },
  { id: 'godFearing', label: 'God', emoji: '🙏' },
  { id: 'motorcycles', label: 'Motorcycles', emoji: '🏍️' },
  { id: 'beauty', label: 'Beauty', emoji: '💄' },
  { id: 'politics', label: 'Politics', emoji: '👨‍💼' },
  { id: 'conspiracies', label: 'Conspiracies', emoji: '👁️' },
  { id: 'founders', label: 'Founders', emoji: '💼' },
  { id: 'skating', label: 'Skate', emoji: '🛹' },
  { id: 'popCulture', label: 'Culture', emoji: '📱' },
];




export default function ProfilePreview() {
const router = useRouter();
const [data, setData] = useState<any>({});
const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
const [heroWidth, setHeroWidth] = useState(0);
const { width: screenWidth } = useWindowDimensions();
const [introExtro, setIntroExtro] = useState(0.4); // 0 = introvert, 1 = extrovert
const [typeAB, setTypeAB] = useState(0.6); // 0 = type A, 1 = type B
const [chillParty, setChillParty] = useState(0.65); // 0 = chill, 1 = party

// Manual refresh state
const [refreshing, setRefreshing] = useState(false);




const load = useCallback(async () => {
  let m: any = {};
  try {
    const keys = [
      'fullName','firstName','userName','aboutMe','dreamIs','userLocation','age','gender','occupation','relationshipStatus',
      'selectedIdentities','selectedPassions','idealHangouts','selectedMusicGenres','selectedRavingPrefs','userProfileImage','profilePhotos','profilePhoto'
    ];
    const entries = await AsyncStorage.multiGet(keys);
    m = {};
    entries.forEach(([k, v]) => { if (v != null) m[k] = v; });
    // Load sliders if present
    if (m.sliderIntroExtro) setIntroExtro(Number(m.sliderIntroExtro));
    if (m.sliderTypeAB) setTypeAB(Number(m.sliderTypeAB));
    if (m.sliderChillParty) setChillParty(Number(m.sliderChillParty));
    const identities = m.selectedIdentities ? JSON.parse(m.selectedIdentities) : [];
    const passions = m.selectedPassions ? JSON.parse(m.selectedPassions) : [];
    const hangouts = m.idealHangouts ? JSON.parse(m.idealHangouts) : [];
    const music = m.selectedMusicGenres ? JSON.parse(m.selectedMusicGenres) : [];
    const selectedPrompts = m.selectedPrompts ? JSON.parse(m.selectedPrompts) : [];
    console.log('[profile-preview] loaded selectedPrompts:', selectedPrompts);




    const cleanField = (s: any) => {
      if (!s) return '';
      const t = String(s).trim();
      return t.toLowerCase() === 'to' ? '' : t;
    };




    const profilePhotos = m.profilePhotos ? JSON.parse(m.profilePhotos) : [];
    const primaryPhoto = m.profilePhoto || m.userProfileImage;
    setData({
      name: m.fullName || m.firstName || 'Your Name',
      userName: m.userName || '',
      about: cleanField(m.aboutMe),
      dreamIs: cleanField(m.dreamIs),
      location: m.userLocation || '',
      age: m.age || '',
      gender: m.gender || '',
      occupation: m.occupation || '',
      relationshipStatus: m.relationshipStatus || '',
      identities,
      passions,
      hangouts,
      music,
      selectedPrompts,
      // Debug log for data object
      ...(console.log('[profile-preview] setData', {
        ...m,
        selectedPrompts
      }), {}),
      image: primaryPhoto || 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=1200',
      photos: (profilePhotos && profilePhotos.length > 0) ? profilePhotos : (primaryPhoto ? [primaryPhoto] : undefined),
    });
  } catch (e) {
      // --- Passions logic: union of all highlighted rectangles from interests.tsx ---
      // Gather all selected interests and related categories
      let passions: string[] = [];
      const selectedPassions = m.selectedPassions ? JSON.parse(m.selectedPassions) : [];
      const selectedInterests = m.selectedInterests ? JSON.parse(m.selectedInterests) : [];
      const selectedMusicCategories = m.selectedMusicCategories ? JSON.parse(m.selectedMusicCategories) : [];
      const selectedEDMGenres = m.selectedEDMGenres ? JSON.parse(m.selectedEDMGenres) : [];
      const selectedSportsCategories = m.selectedSportsCategories ? JSON.parse(m.selectedSportsCategories) : [];
      // Union all unique values
      passions = Array.from(new Set([
        ...selectedPassions,
        ...selectedInterests,
        ...selectedMusicCategories,
        ...selectedEDMGenres,
        ...selectedSportsCategories
      ].filter(Boolean)));
  }
}, []);




useFocusEffect(useCallback(() => { load(); }, [load]));




const titleName = (data.name || '').split(' ')[0] || 'PROFILE';
const subtitlePieces = [data.occupation, data.age].filter(Boolean);
const subtitle = subtitlePieces.join(', ');




return (
  <SafeAreaView style={styles.safe}>

    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
        <Ionicons name="chevron-back" size={26} color="#111" />
      </TouchableOpacity>
      <Text style={styles.topTitle}>Preview</Text>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={async () => {
          setRefreshing(true);
          await load();
          setRefreshing(false);
        }} style={[styles.iconBtn, refreshing && {opacity:0.5}]}
          disabled={refreshing}
        >
          <Ionicons name="refresh" size={20} color={refreshing ? '#aaa' : '#007AFF'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/edit-profile')} style={styles.iconBtn}>
          <Ionicons name="pencil" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>




    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.heroCard}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            if (w && w !== heroWidth) setHeroWidth(w);
          }}
          onScroll={(e) => {
            const w = e.nativeEvent.layoutMeasurement.width;
            const x = e.nativeEvent.contentOffset.x;
            const idx = Math.round(x / w);
            setCurrentPhotoIndex(idx);
          }}
          style={{ width: '100%' }}
        >
          {((data.photos && data.photos.length>0) ? data.photos : [data.image]).map((uri:string, i:number) => (
            <Image key={i} source={{ uri }} style={[styles.heroImage, { width: heroWidth || screenWidth }]} />
          ))}
        </ScrollView>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroName}>{titleName?.toUpperCase()}</Text>
          {subtitle ? <Text style={styles.heroSubtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.imageIndicatorRight}>
          {((data.photos && data.photos.length>0) ? data.photos : [data.image]).map((_:any, index:number) => (
            <View key={index} style={[styles.dot, index===currentPhotoIndex && styles.activeDot]} />
          ))}
        </View>
      </View>




      {/* Chips row */}
      <View style={styles.chipsRow}>
        {data.location ? (
          <View style={styles.chip}>
            <Ionicons name="location-outline" size={14} color="#1D4ED8" style={{marginRight:4}} />
            <Text style={styles.chipText}>{data.location}</Text>
          </View>
        ) : null}
        {data.userName ? (
          <View style={styles.chip}>
            <Ionicons name="person-outline" size={14} color="#1D4ED8" style={{marginRight:4}} />
            <Text style={styles.chipText}>@{data.userName}</Text>
          </View>
        ) : null}
        {data.relationshipStatus ? (
          <View style={styles.chip}>
            <Ionicons name="heart-outline" size={14} color="#1D4ED8" style={{marginRight:4}} />
            <Text style={styles.chipText}>{data.relationshipStatus}</Text>
          </View>
        ) : null}
      </View>




      {/* About card */}
      {(data.about || data.dreamIs) ? (
        <View style={styles.card}>
          <Text style={styles.aboutText}>
            {data.about}
            {data.about && data.dreamIs ? '\n\n' : ''}
            {data.dreamIs}
          </Text>
        </View>
      ) : null}




     {/* Personality Card */}
     <View style={[styles.card, styles.personalityCard]}>
       <Text style={styles.sectionLabel}>Personality</Text>
       <View style={styles.sliderRow}>
         <Text style={styles.sliderLabel}>Introvert</Text>
         <PillSlider
           value={introExtro}
           onValueChange={setIntroExtro}
           onSlidingComplete={async (v) => {
             await AsyncStorage.setItem('sliderIntroExtro', String(v));
           }}
           minimumValue={0}
           maximumValue={1}
           step={0.01}
           minimumTrackTintColor="#2563EB"
           maximumTrackTintColor="#E5E7EB"
           trackHeight={14}
           trackRadius={7}
           thumbSize={20}
           containerStyle={styles.slider}
         />
         <Text style={styles.sliderLabel}>Extrovert</Text>
       </View>
       <View style={styles.sliderRow}>
         <Text style={styles.sliderLabel}>Type A</Text>
         <PillSlider
           value={typeAB}
           onValueChange={setTypeAB}
           onSlidingComplete={async (v) => {
             await AsyncStorage.setItem('sliderTypeAB', String(v));
           }}
           minimumValue={0}
           maximumValue={1}
           step={0.01}
           minimumTrackTintColor="#2563EB"
           maximumTrackTintColor="#E5E7EB"
           trackHeight={14}
           trackRadius={7}
           thumbSize={20}
           containerStyle={styles.slider}
         />
         <Text style={styles.sliderLabel}>Type B</Text>
       </View>
       <View style={styles.sliderRow}>
         <Text style={styles.sliderLabel}>Chill</Text>
         <PillSlider
           value={chillParty}
           onValueChange={setChillParty}
           onSlidingComplete={async (v) => {
             await AsyncStorage.setItem('sliderChillParty', String(v));
           }}
           minimumValue={0}
           maximumValue={1}
           step={0.01}
           minimumTrackTintColor="#2563EB"
           maximumTrackTintColor="#E5E7EB"
           trackHeight={14}
           trackRadius={7}
           thumbSize={20}
           containerStyle={styles.slider}
         />
         <Text style={styles.sliderLabel}>Party</Text>
       </View>
     </View>
     {/* Traits Card */}
     <View style={[styles.card, styles.traitsCard]}>
      <Text style={styles.sectionLabel}>Interests</Text>
      {/* Display selected passions as rectangles */}
      {data.passions && data.passions.length > 0 && (
        <View style={{flexDirection:'row', flexWrap:'wrap', gap:8, marginBottom:8}}>
          {data.passions.map((p: string, i: number) => {
            // Find the matching passion object for emoji and label
            const passionObj = PASSION_INTERESTS.find(obj => obj.id === p || obj.label === p || obj.emoji === p);
            return (
              <View key={i} style={[styles.tag, {flexDirection:'row', alignItems:'center'}]}>
                <Text style={[styles.tagText, {color:'#111827', fontWeight:'600'}]}>
                  {passionObj ? `${passionObj.emoji} ${passionObj.label}` : p}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      {/* Only Identify As section will show if present. */}
     </View>




      {/* Prompt 1 */}
      {data.selectedPrompts && data.selectedPrompts.length > 0 && (
        <View>
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Prompt 1</Text>
            <Text>{data.selectedPrompts[0]}</Text>
          </View>
          {/* Additional Prompts */}
          {data.selectedPrompts.slice(1).map((prompt: string, idx: number) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.sectionLabel}>{`Prompt ${idx + 2}`}</Text>
              <Text>{prompt}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  </SafeAreaView>
);
}




const styles = StyleSheet.create({
 compatSubheader: { fontSize:16, fontWeight:'700', color:'#22223B', marginTop:14, marginBottom:4, marginLeft:18 },
safe: { flex: 1, backgroundColor: '#F2F4F7' },
topBar: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:16, paddingVertical:8 },
topTitle: { fontSize:16, fontWeight:'600', color:'#111' },
iconBtn: { padding:8 },
content: { paddingBottom: 24 },




heroCard: { marginHorizontal:16, marginTop:8, borderRadius:16, overflow:'hidden', backgroundColor:'#EEE' },
heroImage: { width:'100%', height:400 },
heroOverlay: { position:'absolute', left:0, right:0, bottom:0, padding:16, paddingTop:5, paddingBottom:6, backgroundColor:'rgba(0,0,0,0.25)', justifyContent:'flex-end' },
heroName: { color:'#fff', fontSize:32, fontWeight:'800', letterSpacing:1 },
heroSubtitle: { color:'#fff', fontSize:14, fontWeight:'600', marginTop:2, opacity:0.95 },
imageIndicatorRight: { position:'absolute', right:12, bottom:12, flexDirection:'row' },
dot: { width:6, height:6, borderRadius:3, marginLeft:6, backgroundColor:'rgba(255,255,255,0.5)' },
activeDot: { backgroundColor:'#fff' },




chipsRow: { flexDirection:'row', gap:8, paddingHorizontal:16, marginTop:15 },
chip: { backgroundColor:'#E6F0FF', borderRadius:14, paddingHorizontal:12, paddingVertical:6, flexDirection:'row', alignItems:'center' },
chipText: { color:'#1D4ED8', fontSize:12, fontWeight:'600' },




card: { backgroundColor:'#fff', borderRadius:8, marginHorizontal:16, marginTop:12, padding:16, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, shadowOffset:{width:0,height:2} },
aboutText: { color:'#111827', lineHeight:20, fontSize:14 },




row: { flexDirection:'row', gap:8, paddingHorizontal:16, marginTop:12 },
rowWide: { flexDirection:'row', gap:8, alignSelf:'center', width:'90%', marginTop:12 },
stackContainer: { flexDirection:'column', gap:-2, alignSelf:'center', width:'90%', marginTop:0 },
personalityCard: { flex:1, paddingVertical: 10 },
twoColCard: { marginHorizontal:0, flex:1 },
stackCard: { width:'100%' },
sectionLabel: { fontSize:14, fontWeight:'700', color:'#6B7280', marginBottom:16, marginTop:-4, textAlign: 'left', marginLeft: -4, alignSelf: 'flex-start' },
sliderRow: { flexDirection:'row', alignItems:'center', marginBottom:10, gap:4 },
sliderLabel: { fontSize:10, color:'#6B7280', width:48 },
slider: { flex:1, height:20, justifyContent:'center', marginHorizontal:2 },
// Removed external slider styles; using PillSlider component




 traitsCard: { flex:1, alignItems:'center', justifyContent:'center', paddingTop: 10, marginTop:12  },
traitsGrid: { flexDirection:'row', flexWrap:'wrap', gap:8, justifyContent:'center' },
trait: { paddingHorizontal:10, paddingVertical:6, borderRadius:10, backgroundColor:'#E6F4FF' },
traitText: { color:'#1D4ED8', fontWeight:'700', fontSize:12 },
placeholder: { color:'#9CA3AF', fontSize:12 },




blueCard: { backgroundColor:'#E6F4FF' },
sectionTitle: { fontSize:13, fontWeight:'700', color:'#0F172A', marginBottom:8, marginTop:-2},
tagsWrap: { flexDirection:'row', flexWrap:'wrap', gap:8 },
tag: { backgroundColor:'#fff', paddingHorizontal:10, paddingVertical:6, borderRadius:10, borderWidth:1, borderColor:'#E5E7EB' },
tagText: { color:'#111827', fontSize:12, fontWeight:'600' },
});











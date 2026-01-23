import { ScrollView, Text } from 'react-native';
import AnimeGroup from './interest-groups/AnimeGroup';
import ArtsCultureGroup from './interest-groups/ArtsCultureGroup';
import BusinessNetworkingGroup from './interest-groups/BusinessNetworkingGroup';
import ComedyEntertainmentGroup from './interest-groups/ComedyEntertainmentGroup';
import FamilyKidsGroup from './interest-groups/FamilyKidsGroup';
import FitnessGroup from './interest-groups/FitnessGroup';
import FoodDrinksGroup from './interest-groups/FoodDrinksGroup';
import InfluencesGroup from './interest-groups/InfluencesGroup';
import MusicGroup from './interest-groups/MusicGroup';
import OutdoorsAdventureGroup from './interest-groups/OutdoorsAdventureGroup';
import PassionsGroup from './interest-groups/PassionsGroup';
import SportsGroup from './interest-groups/SportsGroup';
import TechnologyGroup from './interest-groups/TechnologyGroup';
import VideoGamesGroup from './interest-groups/VideoGamesGroup';


interface InterestsTabProps {
  styles?: any;
}

const InterestsTab: React.FC<InterestsTabProps> = ({ styles }) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Passions & Interests</Text>

      {/* Core Passions */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 8, marginBottom: 4 }}>Core Passions</Text>
      <PassionsGroup />
      <SportsGroup />
      <FitnessGroup />

      {/* Food & Drinks */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 }}>Food & Drinks</Text>
      <FoodDrinksGroup />

      {/* Arts, Culture & Entertainment */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 }}>Arts, Culture & Entertainment</Text>
      <MusicGroup />
      <ArtsCultureGroup />
      <ComedyEntertainmentGroup />
      <AnimeGroup />

      {/* Gaming */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 }}>Gaming</Text>
      <VideoGamesGroup />

      {/* Outdoors & Adventure */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 }}>Outdoors & Adventure</Text>
      <OutdoorsAdventureGroup />

      {/* Technology & Business */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 }}>Technology & Business</Text>
      <TechnologyGroup />
      <BusinessNetworkingGroup />

      {/* Influences & Family */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 }}>Influences & Family</Text>
      <InfluencesGroup />
      <FamilyKidsGroup />
    </ScrollView>
  );
};

export default InterestsTab;


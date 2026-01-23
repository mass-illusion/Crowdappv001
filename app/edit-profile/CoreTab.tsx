
import { ScrollView, Text } from 'react-native';
import AboutGroup from './core-groups/AboutGroup';
import IdentityGroup from './core-groups/IdentityGroup';
import RelationshipGroup from './core-groups/RelationshipGroup';



// Add prop types for all state/handlers needed for Core tab
const CoreTab = (props: any) => {
  // Destructure props as needed
  // const { firstName, setFirstName, ... } = props;
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Core Identity</Text>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
        Sharing help us improve compatibility and personalize matches! Not all details are visible on your profile. Preview and manage visibility at anytime.
      </Text>
      <IdentityGroup {...props} />
      <AboutGroup {...props} />
      <RelationshipGroup {...props} />
    </ScrollView>
  );
};

export default CoreTab;

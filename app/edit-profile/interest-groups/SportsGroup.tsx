import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const SPORTS_CATEGORIES = [
  { name: 'NFL', emoji: '🏈' },
  { name: 'NBA', emoji: '🏀' },
  { name: 'MLB', emoji: '⚾' },
  { name: 'NHL', emoji: '🏒' },
  { name: 'UFC', emoji: '🥊' }
];

const NFL_TEAMS = [
  'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills',
  'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns',
  'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers',
  'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs',
  'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins',
  'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants',
  'New York Jets', 'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers',
  'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders'
];
const NBA_TEAMS = [
  'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets',
  'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets',
  'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers',
  'Los Angeles Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat',
  'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks',
  'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns',
  'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors',
  'Utah Jazz', 'Washington Wizards'
];
const MLB_TEAMS = [
  'Arizona Diamondbacks', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox',
  'Chicago Cubs', 'Chicago White Sox', 'Cincinnati Reds', 'Cleveland Guardians',
  'Colorado Rockies', 'Detroit Tigers', 'Houston Astros', 'Kansas City Royals',
  'Los Angeles Angels', 'Los Angeles Dodgers', 'Miami Marlins', 'Milwaukee Brewers',
  'Minnesota Twins', 'New York Mets', 'New York Yankees', 'Oakland Athletics',
  'Philadelphia Phillies', 'Pittsburgh Pirates', 'San Diego Padres', 'San Francisco Giants',
  'Seattle Mariners', 'St. Louis Cardinals', 'Tampa Bay Rays', 'Texas Rangers',
  'Toronto Blue Jays', 'Washington Nationals'
];
const NHL_TEAMS = [
  'Anaheim Ducks', 'Arizona Coyotes', 'Boston Bruins', 'Buffalo Sabres',
  'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche',
  'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton Oilers',
  'Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Canadiens',
  'Nashville Predators', 'New Jersey Devils', 'New York Islanders', 'New York Rangers',
  'Ottawa Senators', 'Philadelphia Flyers', 'Pittsburgh Penguins', 'San Jose Sharks',
  'Seattle Kraken', 'St. Louis Blues', 'Tampa Bay Lightning', 'Toronto Maple Leafs',
  'Vancouver Canucks', 'Vegas Golden Knights', 'Washington Capitals', 'Winnipeg Jets'
];

export default function SportsGroup() {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [customSportsInput, setCustomSportsInput] = useState('');
  const [selectedNFLTeams, setSelectedNFLTeams] = useState<string[]>([]);
  const [selectedNBATeams, setSelectedNBATeams] = useState<string[]>([]);
  const [selectedMLBTeams, setSelectedMLBTeams] = useState<string[]>([]);
  const [selectedNHLTeams, setSelectedNHLTeams] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('selectedSports');
      if (saved) setSelectedSports(JSON.parse(saved));
      const nfl = await AsyncStorage.getItem('selectedNFLTeams');
      if (nfl) setSelectedNFLTeams(JSON.parse(nfl));
      const nba = await AsyncStorage.getItem('selectedNBATeams');
      if (nba) setSelectedNBATeams(JSON.parse(nba));
      const mlb = await AsyncStorage.getItem('selectedMLBTeams');
      if (mlb) setSelectedMLBTeams(JSON.parse(mlb));
      const nhl = await AsyncStorage.getItem('selectedNHLTeams');
      if (nhl) setSelectedNHLTeams(JSON.parse(nhl));
    })();
  }, []);

  const toggleSports = (sport: string) => {
    setSelectedSports(prev => {
      const newSports = prev.includes(sport)
        ? prev.filter(s => s !== sport)
        : [...prev, sport];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedSports', JSON.stringify(newSports));
      }, 100);
      return newSports;
    });
  };

  const toggleNFLTeam = (team: string) => {
    setSelectedNFLTeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedNFLTeams', JSON.stringify(newTeams));
      }, 100);
      return newTeams;
    });
  };
  const toggleNBATeam = (team: string) => {
    setSelectedNBATeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedNBATeams', JSON.stringify(newTeams));
      }, 100);
      return newTeams;
    });
  };
  const toggleMLBTeam = (team: string) => {
    setSelectedMLBTeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedMLBTeams', JSON.stringify(newTeams));
      }, 100);
      return newTeams;
    });
  };
  const toggleNHLTeam = (team: string) => {
    setSelectedNHLTeams(prev => {
      const newTeams = prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team];
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedNHLTeams', JSON.stringify(newTeams));
      }, 100);
      return newTeams;
    });
  };

  const addCustomSports = () => {
    if (customSportsInput.trim() && !selectedSports.includes(customSportsInput.trim())) {
      setSelectedSports(prev => [...prev, customSportsInput.trim()]);
      setCustomSportsInput('');
      setTimeout(async () => {
        await AsyncStorage.setItem('selectedSports', JSON.stringify([...selectedSports, customSportsInput.trim()]));
      }, 100);
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Sports</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {SPORTS_CATEGORIES.map((sport, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedSports.includes(sport.name) ? '#d1e7dd' : '#f0f0f0',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
            onPress={() => toggleSports(sport.name)}
          >
            <Text style={{ fontSize: 18, marginRight: 6 }}>{sport.emoji}</Text>
            <Text style={{ fontSize: 16 }}>{sport.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* NFL Teams */}
      {selectedSports.includes('NFL') && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>My NFL Teams</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {NFL_TEAMS.map((team, idx) => (
              <TouchableOpacity
                key={team}
                style={{
                  backgroundColor: selectedNFLTeams.includes(team) ? '#d1e7dd' : '#f0f0f0',
                  borderRadius: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  margin: 3,
                }}
                onPress={() => toggleNFLTeam(team)}
              >
                <Text style={{ fontSize: 14 }}>{team}</Text>
                {selectedNFLTeams.includes(team) && (
                  <Ionicons name="close-circle" size={16} color="#007AFF" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* NBA Teams */}
      {selectedSports.includes('NBA') && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>My NBA Teams</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {NBA_TEAMS.map((team, idx) => (
              <TouchableOpacity
                key={team}
                style={{
                  backgroundColor: selectedNBATeams.includes(team) ? '#d1e7dd' : '#f0f0f0',
                  borderRadius: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  margin: 3,
                }}
                onPress={() => toggleNBATeam(team)}
              >
                <Text style={{ fontSize: 14 }}>{team}</Text>
                {selectedNBATeams.includes(team) && (
                  <Ionicons name="close-circle" size={16} color="#007AFF" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* MLB Teams */}
      {selectedSports.includes('MLB') && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>My MLB Teams</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {MLB_TEAMS.map((team, idx) => (
              <TouchableOpacity
                key={team}
                style={{
                  backgroundColor: selectedMLBTeams.includes(team) ? '#d1e7dd' : '#f0f0f0',
                  borderRadius: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  margin: 3,
                }}
                onPress={() => toggleMLBTeam(team)}
              >
                <Text style={{ fontSize: 14 }}>{team}</Text>
                {selectedMLBTeams.includes(team) && (
                  <Ionicons name="close-circle" size={16} color="#007AFF" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* NHL Teams */}
      {selectedSports.includes('NHL') && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>My NHL Teams</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {NHL_TEAMS.map((team, idx) => (
              <TouchableOpacity
                key={team}
                style={{
                  backgroundColor: selectedNHLTeams.includes(team) ? '#d1e7dd' : '#f0f0f0',
                  borderRadius: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  margin: 3,
                }}
                onPress={() => toggleNHLTeam(team)}
              >
                <Text style={{ fontSize: 14 }}>{team}</Text>
                {selectedNHLTeams.includes(team) && (
                  <Ionicons name="close-circle" size={16} color="#007AFF" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Custom sports/athletes pills */}
      {selectedSports.filter(sport => !SPORTS_CATEGORIES.some(cat => cat.name === sport)).length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Favorite Athletes</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedSports
              .filter(sport => !SPORTS_CATEGORIES.some(cat => cat.name === sport))
              .map((customEntry, index) => (
                <TouchableOpacity
                  key={`athlete-${index}`}
                  style={{
                    backgroundColor: '#d1e7dd',
                    borderRadius: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    margin: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSelectedSports(prev => prev.filter(item => item !== customEntry));
                    setTimeout(async () => {
                      await AsyncStorage.setItem('selectedSports', JSON.stringify(selectedSports.filter(item => item !== customEntry)));
                    }, 100);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{customEntry}</Text>
                  <Ionicons name="close-circle" size={16} color="#007AFF" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      {/* Custom input for new athlete/sport */}
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, padding: 8, marginRight: 8 }}
          value={customSportsInput}
          onChangeText={setCustomSportsInput}
          placeholder="Add your favorite athlete"
          placeholderTextColor="#999"
          onSubmitEditing={addCustomSports}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 16, justifyContent: 'center' }}
          onPress={addCustomSports}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

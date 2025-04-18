import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SearchBar } from '@rneui/themed'; // Using React Native Elements v4
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilter: () => void;
}

const Search: React.FC<SearchProps> = ({ onFilter, onChangeText, value }) => {
  return (
    <View style={styles.searchView}>
      <View style={styles.searchJobs}>
        <SearchBar
          round
          inputStyle={{
            backgroundColor: 'white',
            fontSize: 14,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            height: 35
          }}
          containerStyle={{
            backgroundColor: '#1e2229',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            flex: 0
          }}
          placeholder="Search job position..."
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
        <MaterialCommunityIcons name="filter-variant" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    backgroundColor: '#1e2229',
  },
  searchJobs: {
    flex: 1,
        justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: '#1e2229',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Search;

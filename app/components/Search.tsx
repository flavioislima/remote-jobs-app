import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilter: () => void;
}

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 1024;

const Search: React.FC<SearchProps> = ({ onFilter, onChangeText, value }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.searchView}>
      <View style={[styles.searchJobs, isDesktop && styles.searchJobsDesktop]}>
        <Searchbar
          placeholder={t('search.placeholder')}
          onChangeText={onChangeText}
          value={value}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          elevation={0}
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
    alignItems: 'center',
  },
  searchJobs: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingLeft: 10,
  },
  searchJobsDesktop: {
    alignSelf: 'center',
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 0,
  },
  searchInput: {
    fontSize: 14,
    minHeight: 0,
  },
  filterButton: {
    backgroundColor: '#1e2229',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Search;

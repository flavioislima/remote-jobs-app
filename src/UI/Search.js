import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => (
  <View style={styles.searchView}>
    <View style={styles.searchJobs}>
      <SearchBar
        round
        lightTheme
        inputStyle={{ backgroundColor: 'white' }}
        clearIcon={{ type: 'font-awesome', name: 'times', color: 'lightgray' }}
        icon={{ type: 'font-awesome', name: 'search', color: 'lightgray' }}
        placeholder="Search for Jobs..."
        onChangeText={props.onChangeText}
        onClearText={props.onClearText}
      />
    </View>
    <TouchableOpacity onPress={props.refresh} style={styles.reloadButton}>
      <Icon name="refresh" size={30} color="#9b59bc" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    marginHorizontal: 5
  },
  searchJobs: {
    width: '92%'
  },
  reloadButton: {
    alignSelf: 'center',
    width: '8%'
  }
});

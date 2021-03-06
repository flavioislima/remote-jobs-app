import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
interface Props {
  filterText: string
  onChangeText: (text: string) => void
  setShowTagFilter: () => void
}

interface DatePicker {
  day: number
  month: number
  year: number
}

export default (props: Props) => {
  const { setShowTagFilter, onChangeText, filterText } = props

  return (
    <View style={styles.searchView}>
      <View style={styles.searchJobs}>
        <SearchBar
          round
          inputStyle={{
            backgroundColor: 'white',
            fontSize: 12,
            color: '#000'
          }}
          inputContainerStyle={{
            height: 30
          }}
          containerStyle={{
            backgroundColor: '#1e2229',
            borderTopColor: '#1e2229'
          }}
          clearIcon={{ type: 'material-community', name: 'close', color: '#FFF' }}
          searchIcon={{ type: 'material-community', name: 'magnify', color: '#FFF' }}
          placeholder="Search for Jobs..."
          onChangeText={onChangeText}
          value={filterText}
          placeholderTextColor={'#222b38'}
          showCancel
        />
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={setShowTagFilter}>
          <Icon name="filter" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: '#1e2229'
  },
  searchJobs: {
    flex: 9,
    backgroundColor: 'pink'
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginRight: 5
  }
})

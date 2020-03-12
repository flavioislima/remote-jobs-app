import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
interface Props {
  order: boolean
  setOrder: () => void
  filterText: string
  onChangeText: (text: string) => void
  setShowCalendar?: () => void
}

interface DatePicker {
  day: number
  month: number
  year: number
}

export default (props: Props) => {
  const { order, setOrder, setShowCalendar, onChangeText, filterText } = props

  return (
    <View style={styles.searchView}>
      <View style={styles.searchJobs}>
        <SearchBar
          round
          inputStyle={{
            backgroundColor: 'white',
            fontSize: 12
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
        />
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={setShowCalendar}>
          <Icon name="calendar-check" size={34} color={'#FFF'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={setOrder}>
          <Icon
            name={order ? 'sort-descending' : 'sort-ascending'}
            size={34}
            color={'#FFF'}
          />
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
    width: '75%'
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '25%',
    marginRight: 5
  }
})

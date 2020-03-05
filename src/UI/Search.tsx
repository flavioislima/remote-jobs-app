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
            backgroundColor: 'white'
          }}
          clearIcon={{ type: 'material-community-icons', name: 'clear', color: '#A7C8FF' }}
          placeholder="Search for Jobs..."
          onChangeText={onChangeText}
          value={filterText}
          containerStyle={{
            backgroundColor: '#112038',
            borderTopColor: '#112038',
            height: 60
          }}
          placeholderTextColor={'#A7C8FF'}
        />
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={setShowCalendar}>
          <Icon name="calendar" size={30} color={'#A7C8FF'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={setOrder}>
          <Icon
            name={order ? 'sort-descending' : 'sort-ascending'}
            size={25}
            color={'#A7C8FF'}
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
    backgroundColor: '#112038',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18
  },
  searchJobs: {
    width: '70%',
    marginLeft: 15
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '22%',
    marginRight: 10
  }
})

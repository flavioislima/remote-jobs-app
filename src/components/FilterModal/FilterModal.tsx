import DateTimePicker from '@react-native-community/datetimepicker'
import * as React from 'react'
import { Picker, StyleSheet, View } from 'react-native'
import { Button, Divider, Icon, Overlay, Text } from 'react-native-elements'
import { getTags } from '../../screens/utils'
import { JobType } from '../../types'

interface Props {
  showFilterModal: boolean
  setShowFilterModal: (value: boolean) => void
  pickedTags: string[]
  pickedDate: string
  jobs: JobType[]
  setPickedTags: (jobs: JobType[]) => void
  clearAll: () => void
  setPickedDate: (date: string) => void
}

const currentDate = new Date()
const dayInMs = 3600 * 1000 * 24

const predDate = {
  anyTime: new Date(currentDate.getTime() - new Date(dayInMs * 720).getTime()),
  threeDaysAgo: new Date(currentDate.getTime() - new Date(dayInMs * 3).getTime()),
  oneWeekAgo: new Date(currentDate.getTime() - new Date(dayInMs * 7).getTime()),
  oneMonthAgo: new Date(currentDate.getTime() - new Date(dayInMs * 30).getTime()),
  oneYearAgo: new Date(currentDate.getTime() - new Date(dayInMs * 365).getTime())
}

const FilterModal: React.FC<Props> = ({
  showFilterModal,
  setShowFilterModal,
  pickedTags,
  pickedDate,
  setPickedTags,
  setPickedDate,
  clearAll,
  jobs
}) => {
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [pickedPreDate, setPickedPreDate] = React.useState(predDate.anyTime)

  const onChange = (event: any, selectedDate: Date) => {
    const newDate = selectedDate ? selectedDate.toString() : currentDate.toString()
    setShowCalendar(false)
    setPickedPreDate(predDate.anyTime)
    setPickedDate(newDate)
  }

  const formatedDate = new Date(pickedDate).toUTCString().slice(0, 16)

  return (
    <Overlay
      isVisible={showFilterModal}
      onBackdropPress={() => setShowFilterModal(false)}
      height={'auto'}
      width={'90%'}
    >
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Refine</Text>
          <Text style={styles.clearButton} onPress={() => clearAll()}>Reset</Text>
        </View>
        <Divider style={{height: 1, backgroundColor: '#999'}} />
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Tags</Text>
          <View style={styles.tags}>
            {getTags(jobs).map((tag, i) => {
              const selectedTag: boolean = pickedTags.includes(tag)
              return (
                <Button
              key={i}
              buttonStyle={{
                ...styles.tagButton,
                backgroundColor: selectedTag ? '#000' : '#FFF'
              }}
              titleStyle={{...styles.tagTitle, color: selectedTag ? '#FFF' : '#555' }}
              title={tag}
              iconRight
              type={'outline'}
              onPress={() =>
                setPickedTags(selectedTag ?
                  pickedTags.filter(selTag => selTag !== tag) : [...pickedTags, tag])}
            />)}
            )}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Jobs Posted Since {formatedDate}</Text>
          <Picker
            mode={'dropdown'}
            selectedValue={pickedPreDate}
            onValueChange={(value) => {
            setPickedDate(value)
            setPickedPreDate(value)
          }}>
            <Picker.Item label="Anytime" value={predDate.anyTime}/>
            <Picker.Item label="3 Days Ago" value={predDate.threeDaysAgo}/>
            <Picker.Item label="7 Days Ago" value={predDate.oneWeekAgo}/>
            <Picker.Item label="30 Days Ago" value={predDate.oneMonthAgo}/>
            <Picker.Item label="1 Year Ago" value={predDate.oneYearAgo}/>
          </Picker>
          {
            !showCalendar &&
              <Button
                raised
                type={'outline'}
                title={'Select a Date'}
                onPress={() => setShowCalendar(true)}
                containerStyle={{marginTop: 4}}
                titleStyle={{ fontSize: 13, color: '#666' }}
              />
          }
        {showCalendar &&
          <DateTimePicker
            value={currentDate}
            mode={'date'}
            onChange={onChange}
            maximumDate={currentDate}
            minimumDate={new Date(2015, 0, 1)}
          />
        }
        </View>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  title: {
    fontSize: 18,
    color: '#444'
  },
  clearButton: {
    fontSize: 14,
    color: '#666'
  },
  container: {
    borderRadius: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.10,
    shadowRadius: 0.44
  },
  containerTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    color: '#666'
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 6
  },
  tagButton: {
    borderRadius: 30,
    borderColor: '#888',
    borderWidth: 1,
    marginHorizontal: 1,
    marginVertical: 3,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 150,
    padding: 4
  },
  tagTitle: {
    fontSize: 11,
    marginRight: 2,
    textTransform: 'uppercase'
  }
})

export default FilterModal

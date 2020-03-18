import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { Button, Icon, Overlay, Text } from 'react-native-elements'

import { getTags } from '../../screens/utils'
import { JobType } from '../../types'
import Error from '../../UI/Error'
import Search from '../../UI/Search'
import StatusJobs from '../../UI/StatusJobs'
import Job from './Jobs/Job'

interface Props {
  refresh: () => void
  jobs: JobType[]
  refreshing: boolean
  navigate: any
  error?: boolean
  clearFavorites?: () => void
  handleClearFavorites?: () => void
}

const ListJobs: React.FC<Props> = (props: Props) => {
  const { jobs, refreshing, refresh, error } = props
  const currentDate = new Date()

  // State
  const [filterText, setFilterText] = useState('')
  const [order, setOrder] = useState(true) // true = descending, false = asscending
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [showTagFilter, setShowTagFilter] = React.useState(false)
  const [pickedDate, setPickedDate] = useState(new Date(2018, 0, 1).toJSON())
  const [pickedTag, setPickedTag] = useState([])

  // Filter - Text, Date and Sort by date
  const filterRegex: RegExp = new RegExp(String(filterText), 'i')
  const textFilter = ({ position }) => filterRegex.test(position)
  const dateFilter = ({ date }) => Date.parse(date) >= Date.parse(pickedDate)
  const tagFilter = ({ tags, position }: JobType) => tags.some(tag => {
    if (pickedTag.includes(tag)) {
      window.console.log(pickedTag.includes(tag), position)
    }
    return pickedTag.includes(tag)
  })
  const handleOrder = () => setOrder(!order)
  const tagFilteredData: JobType[] = pickedTag.length > 0 ? jobs.filter(tagFilter) : jobs
  const textFilteredData: JobType[] = tagFilteredData.filter(textFilter)
  const filteredData: JobType[] = textFilteredData.filter(dateFilter)
  const sortedData = sortJobs(filteredData, order)
  window.console.log(filteredData)

  const renderJobs = ({ item }: {item: JobType}) => {
    return <Job data={item} />
  }

  const onChange = (event: any, selectedDate: Date) => {
    setPickedDate(selectedDate ? selectedDate.toString() : currentDate.toString())
    setShowCalendar(false)
  }

  const extractKeys = (job: JobType) => job.id

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1e2229" />
      <SafeAreaView>
        <Search
          onChangeText={setFilterText}
          filterText={filterText}
          setShowTagFilter={() => setShowTagFilter(true)}
          order={order}
          setOrder={handleOrder}
        />
      </SafeAreaView>
      {error && <Error />}
      {showTagFilter &&
        <Overlay
          isVisible={showTagFilter}
          onBackdropPress={() => setShowTagFilter(false)}
          height={'auto'}
          width={'90%'}
        >
          <View>
            <Text>Showing Jobs since: {new Date(pickedDate).toUTCString().slice(0, 11)}</Text>
            <Text>Selected Tags:{pickedTag.join(', ')}</Text>
            <Text>Filter by:</Text>
            <Button title="Date" onPress={() => setShowCalendar(true)} />
            {showCalendar &&
              <DateTimePicker
                value={currentDate}
                mode={'date'}
                onChange={onChange}
                maximumDate={currentDate}
                minimumDate={new Date(2015, 0, 1)}
            />
            }
            <Text>Filter by common Tags:</Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly'
            }}>
            {getTags(jobs).map((tag, i) => <Button
              key={i}
              buttonStyle={{
                backgroundColor: pickedTag.includes(tag) ? 'white' : 'yellow',
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
                margin: 1,
                justifyContent: 'center',
                alignContent: 'center',
                maxWidth: 150,
                padding: 4
              }}
              titleStyle={{fontSize: 11, marginRight: 2, textTransform: 'uppercase'}}
              title={tag}
              iconRight
              type={'outline'}
              icon={pickedTag.includes(tag) &&
              <Icon
                type={'material-community'}
                name={'close-circle'}
                size={12}
                color={'red'}
              />}
              onPress={() =>
                setPickedTag(pickedTag.includes(tag) ?
                  pickedTag.filter(selTag => selTag !== tag) : [...pickedTag, tag])}
            />)}
            </View>
          </View>
        </Overlay>
      }
      <StatusJobs
        refreshing={refreshing}
        length={filteredData.length}
        refresh={refresh}
        date={pickedDate}
        order={order}
      />
      <FlatList
        style={styles.container}
        data={sortedData}
        renderItem={renderJobs}
        keyExtractor={extractKeys}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </View>
  )
}

const sortJobs = (allJobs: JobType[], order: boolean = true) => {
  return allJobs.sort((job1, job2) => {
    const firstDate = Date.parse(job1.date)
    const secondDate = Date.parse(job2.date)
    if (firstDate > secondDate) {
      return order ? -1 : 1
    } else if (firstDate < secondDate) {
      return order ? 1 : -1
    } else {
      return 0
    }
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})

export default ListJobs

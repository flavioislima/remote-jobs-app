import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
  const { jobs, refreshing, refresh, error, navigate } = props
  const currentDate = new Date()

  // State
  const [filterText, setFilterText] = useState('')
  const [order, setOrder] = useState(true) // true = descending, false = asscending
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [pickedDate, setPickedDate] = useState(new Date(2018, 0, 1).toJSON())

  // Filter - Text, Date and Sort by date
  const filterRegex: RegExp = new RegExp(String(filterText), 'i')
  const textFilter = ({ position }) => filterRegex.test(position)
  const dateFilter = ({ date }) => Date.parse(date) >= Date.parse(pickedDate)
  const handleOrder = () => setOrder(!order)
  const textFilteredData: JobType[] = jobs.filter(textFilter)
  const filteredData: JobType[] = textFilteredData.filter(dateFilter)
  const sortedData = sortJobs(filteredData, order)

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
          setShowCalendar={() => setShowCalendar(true)}
          order={order}
          setOrder={handleOrder}
        />
      </SafeAreaView>
      {error && <Error />}
      {showCalendar &&
          <DateTimePicker
            value={currentDate}
            mode={'date'}
            onChange={onChange}
            maximumDate={currentDate}
            minimumDate={new Date(2015, 0, 1)}
          />
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

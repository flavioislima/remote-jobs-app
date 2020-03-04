import React, { useEffect, useState } from 'react'
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { SafeAreaView } from 'react-navigation'

import AsyncStorage from '@react-native-community/async-storage';
import { JobType } from '../../types';
import Error from '../../UI/Error';
import Search from '../../UI/Search';
import StatusJobs from '../../UI/StatusJobs';
import Job from './Jobs/Job';

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

  // State
  const [filterText, setFilterText] = useState('')
  const [isRated, setRated] = useState(false)
  const [order, setOrder] = useState(true) // true = descending, false = asscending
  const [pickedDate, setPickedDate] = useState(new Date(2019, 0, 1).toJSON())

  // Filter - Text, Date and Sort by date
  const filterRegex: RegExp = new RegExp(String(filterText), 'i')
  const textFilter = ({ position }) => filterRegex.test(position)
  const dateFilter = ({ date }) => Date.parse(date) >= Date.parse(pickedDate)
  const handleOrder = () => setOrder(!order)
  const textFilteredData: JobType[] = jobs.filter(textFilter)
  const filteredData: JobType[] = textFilteredData.filter(dateFilter)
  const sortedData = sortJobs(filteredData, order)

  const renderJobs = (job: any) => {
    const { refresh, navigate } = props
    return <Job data={job.item} navigate={navigate} refresh={refresh} />
  }

  const extractKeys = (job: JobType) => job.id

  useEffect(() => {
    AsyncStorage.getItem('rated').then((rated) => setRated(JSON.parse(rated)))
  }, [isRated])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#112038" />
      <SafeAreaView>
        <Search
          onChangeText={setFilterText}
          onClearText={setFilterText.bind(this, '')}
          onDateChange={setPickedDate.bind(this)}
          order={order}
          setOrder={handleOrder}
        />
      </SafeAreaView>
      {error && <Error />}
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

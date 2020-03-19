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

import { JobType } from '../../types'
import Error from '../../UI/Error'
import Search from '../../UI/Search'
import FilterModal from '../FilterModal/FilterModal'
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

const initialDate: Date = new Date(2019, 0, 2)

const ListJobs: React.FC<Props> = (props: Props) => {
  const { jobs, refreshing, refresh, error } = props

  // State
  const [filterText, setFilterText] = useState('')
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const [pickedDate, setPickedDate] = useState(initialDate.toJSON())
  const [pickedTags, setPickedTags] = useState([])

  // Filter - Text, Date and Sort by date
  const filterRegex: RegExp = new RegExp(String(filterText), 'i')
  const textFilter = ({ position }) => filterRegex.test(position)
  const dateFilter = ({ date }) => Date.parse(date) >= Date.parse(pickedDate)
  const tagFilter = ({ tags }: JobType) => tags.some(tag => pickedTags.includes(tag))
  const tagFilteredData: JobType[] = pickedTags.length > 0 ? jobs.filter(tagFilter) : jobs
  const textFilteredData: JobType[] = tagFilteredData.filter(textFilter)
  const filteredData: JobType[] = textFilteredData.filter(dateFilter)

  const clearAllFilter = () => {
    setPickedDate(initialDate.toJSON())
    setPickedTags([])
    setFilterText('')
  }

  const renderJobs = ({ item }: {item: JobType}) => {
    return <Job data={item} />
  }

  const extractKeys = (job: JobType) => job.id

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1e2229" />
      <SafeAreaView>
        <Search
          onChangeText={setFilterText}
          filterText={filterText}
          setShowTagFilter={() => setShowFilterModal(true)}
        />
      </SafeAreaView>
      {error && <Error />}
      <FilterModal
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        setPickedDate={setPickedDate}
        jobs={jobs}
        clearAll={clearAllFilter}
        pickedDate={pickedDate}
        pickedTags={pickedTags}
        setPickedTags={setPickedTags}
        numberOfItems={filteredData.length}
      />
      <FlatList
        style={styles.container}
        data={filteredData}
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

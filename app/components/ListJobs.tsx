import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JobType } from '../types';
import Job from './Job';

// We'll implement these components next
import Error from './Error';
import Search from './Search';
import FilterModal from './FilterModal';

interface ListJobsProps {
  refresh: () => void;
  jobs: JobType[];
  refreshing: boolean;
  error?: boolean;
  clearFavorites?: () => void;
}

const previousYear: number = new Date().getFullYear() - 1;
const initialDate: Date = new Date(previousYear, 0, 2);

const ListJobs: React.FC<ListJobsProps> = ({ 
  jobs, 
  refreshing, 
  refresh, 
  error,
  clearFavorites 
}) => {
  // State
  const [filterText, setFilterText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [pickedDate, setPickedDate] = useState(initialDate.toJSON());
  const [pickedTags, setPickedTags] = useState<string[]>([]);

  // Filter - Text, Date and Sort by date
  const filterRegex: RegExp = new RegExp(String(filterText), 'i');
  const textFilter = (job: JobType) => filterRegex.test(job.position || '');
  const dateFilter = (job: JobType) => Date.parse(job.date) >= Date.parse(pickedDate);
  const tagFilter = (job: JobType) => job.tags?.some(tag => pickedTags.includes(tag)) || false;
  
  const tagFilteredData: JobType[] = pickedTags.length > 0 ? jobs.filter(tagFilter) : jobs;
  const textFilteredData: JobType[] = tagFilteredData.filter(textFilter);
  const filteredData: JobType[] = textFilteredData.filter(dateFilter);

  const clearAllFilter = () => {
    setPickedDate(initialDate.toJSON());
    setPickedTags([]);
    setFilterText('');
  };

  const renderJobs = ({ item }: {item: JobType}) => {
    return <Job data={item} />;
  };

  if (error) {
    return <Error onPress={refresh} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1e2229" />
      <SafeAreaView>
        <Search
          value={filterText}
          onChangeText={setFilterText}
          onFilter={() => setShowFilterModal(true)}
        />
        <FlatList
          data={filteredData}
          renderItem={renderJobs}
          keyExtractor={(job: JobType) => job.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
        <FilterModal
          visible={showFilterModal}
          onDismiss={() => setShowFilterModal(false)}
          jobs={jobs}
          pickedDate={pickedDate}
          setPickedDate={setPickedDate}
          pickedTags={pickedTags}
          setPickedTags={setPickedTags}
          clearFilters={clearAllFilter}
          clearFavorites={clearFavorites}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default ListJobs;

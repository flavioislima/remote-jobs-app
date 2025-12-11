import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import JobsContext from '../context/JobsContext';
import ListJobs from '../components/ListJobs';
// import AdBanner from '../components/AdBanner';
import { View, StyleSheet } from 'react-native';

export const metadata = {
  title: 'Remote Jobs - Browse All Remote Job Opportunities | RemoteWork',
  description: 'Explore thousands of remote job listings from companies worldwide. Find your ideal remote position in tech, marketing, design, and more.',
  keywords: 'remote jobs, remote work, job listings, telecommute jobs, work from home',
};

export default function JobsScreen() {
  const router = useRouter();
  const { data, refresh, refreshing, error } = useContext(JobsContext);
  
  return (
    <View style={styles.container}>
      <ListJobs
        jobs={data}
        navigate={router}
        refresh={refresh}
        refreshing={refreshing}
        error={error}
      />
      {/* <AdBanner unitId={'JOBS'} size={'SMART'}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

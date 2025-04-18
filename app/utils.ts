// Utility functions for the Remote Work app
import AsyncStorage from '@react-native-async-storage/async-storage'; // Updated AsyncStorage for Expo
import axios from 'axios';

import { endpoint } from './constants';
import { JobType } from './types';

interface State {
  data: JobType[];
  keys: string[];
}

export const getAllJobs = async () => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const storeState = async (state: State) => {
  try {
    await AsyncStorage.setItem('state', JSON.stringify(state));
  } catch (error) {
    console.error('Error storing state:', error);
  }
};

export const getStateFromStorage = async () => {
  const state: State = { data: [], keys: [] };
  
  try {
    const storedState = await AsyncStorage.getItem('state');
    
    if (storedState) {
      const parsedState: State = JSON.parse(storedState);
      const { data, keys } = parsedState;
      return { ...state, data, keys };
    }
  } catch (error) {
    console.error('Error getting state from storage:', error);
  }
  
  return state;
};

export const getTags = (jobs: JobType[]) => {
  const tags: Record<string, number> = {};
  const topTags: string[] = [];
  
  jobs.forEach((job: JobType) =>
    job.tags?.forEach((tag) => tags[tag] = tags[tag] + 1 || 1)
  );
  
  for (const tag in tags) {
    if (tags[tag] > 15) {
      topTags.push(tag);
    }
  }
  
  return topTags;
};

// Add dummy default export for Expo Router
export default {
  getAllJobs,
  storeState,
  getStateFromStorage,
  getTags
};

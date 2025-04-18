import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { getAllJobs, getStateFromStorage, storeState } from '../utils';
import { JobType } from '../types';
import JobsContext from './JobsContext';

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

// GlobalStateProvider component as named export
// Component for providing global state
export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [data, setData] = useState<JobType[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Save state when it changes
  useEffect(() => {
    const saveState = async () => {
      await storeState({ data, keys });
    };
    
    if (data.length > 0 || keys.length > 0) {
      saveState();
    }
  }, [data, keys]);

  // Load state on first render
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const storedState = await getStateFromStorage();
        const { data: storedData, keys: storedKeys } = storedState;
        
        if (storedData.length > 0) {
          setData(storedData);
          setKeys(storedKeys);
        } else {
          refresh();
        }
      } catch (err) {
        console.error('Error loading initial state:', err);
        setError(true);
      }
    };
    
    loadInitialState();
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setData([]);
    try {
      const jobsData: JobType[] = await getAllJobs() || [];
      
      if (jobsData.length > 0) {
        setData(jobsData);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error refreshing jobs:', err);
      setError(true);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleClearFavorites = useCallback(() => {
    Alert.alert('Erase Favorites', 'Are You Sure?', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () => {
          setKeys([]);
        }
      }
    ]);
  }, []);

  const handleFavorites = useCallback((job: JobType) => {
    setKeys(prevKeys => {
      if (prevKeys.includes(job.id)) {
        return prevKeys.filter(key => key !== job.id);
      } else {
        return [...prevKeys, job.id];
      }
    });
  }, []);

  return (
    <JobsContext.Provider
      value={{
        data,
        keys,
        refreshing,
        error,
        refresh,
        handleClearFavorites,
        handleFavorites
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

// Add default export for Expo Router
export default { GlobalStateProvider };

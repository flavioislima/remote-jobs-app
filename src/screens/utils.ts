import AsyncStorage from '@react-native-community/async-storage'
import database from '@react-native-firebase/database'

import { JobType } from '../types'

interface ParseHubInfo {
  url: string
  token: string
}

interface State {
  data: JobType[]
  keys: string[]
}

export const getAllJobs = async () => {
  const ref = database().ref('/jobs')
  const jobs = await ref.once('value').then(data => data.val())

  return jobs
}

export const storeState = async (state: State) => {
  await AsyncStorage.setItem('state', JSON.stringify(state))
}

export const getStateFromStorage = async () => {
  const state: State = { data: [], keys: [] }
  const storageKeys = await AsyncStorage.getAllKeys()

  if (storageKeys.includes('state')) {
    const storedState = await AsyncStorage.getItem('state')
    const parsedState: State = JSON.parse(storedState)
    const { data, keys } = parsedState

    return { ...state, data, keys }
  }
  return state
}

import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import { endpoint } from '../constants'
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
  const jobs = await axios.get(endpoint).then(res => res.data)

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

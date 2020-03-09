import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { parseDate } from 'chrono-node'
import { JobType } from '../types'

import api from '../api'

const i_logo = require('../assets/i_logo.png')
interface ParseHubInfo {
  url: string
  token: string
}

interface State {
  data: JobType[]
  keys: string[]
}

export const getAllJobs = async () => {
  const remoteOkJobs: JobType[] = await getRemoteOk()
  const indeedJobs: JobType[] = await getIndeed()
  const allJobs: JobType[] = remoteOkJobs.concat(indeedJobs)

  return allJobs
}

export const getIndeed = async () => {
  const parseHubInfo: ParseHubInfo = await checkToken()
  const url: string = await parseHubInfo.url
  const jobs = await getJobs(url)

  const jobsWithDate = jobs && addLogoAndDate(jobs.Job)

  return removeDuplicates(jobsWithDate)
}

export const getRemoteOk = async () => {
  const url: string = 'https://remoteok.io/api'
  const jobs: JobType[] = await getJobs(url)
  jobs.shift() // removes api information

  return jobs
}

const getJobs = async (url: string): Promise<any> => {
  let data: JobType[] = []
  await axios
    .get(url)
    .then((res) => (data = res.data))
    .catch((err) => {
      console.error(err, 'getData error')

      return err
    })

  return data
}

const checkToken = async (): Promise<ParseHubInfo> => {
  const parseHubInfo: ParseHubInfo = { url: '', token: '' }

  await axios
    .get(
      `https://www.parsehub.com/api/v2/projects?api_key=${api}&offset=0&limit=20&include_options=1`
    )
    .then((res) => {
      const data = res.data.projects[0]
      const runToken = data.last_ready_run.run_token
      const url = `https://www.parsehub.com/api/v2/runs/${runToken}/data?api_key=${api}`
      parseHubInfo.url = url
    })
    .catch((err) => {
      console.error(err)
      return false
    })
  return parseHubInfo
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

function addLogoAndDate(jobs: JobType[]): JobType[] {
  return jobs.map((job: JobType) => {
    if (job.dateFormated === 'Just posted') {
      return { ...job, image: i_logo, date: parseDate('a minute ago')}
    }
    return {
      ...job,
      image: i_logo,
      date: parseDate(job && job.dateFormated || 'a week ago')
    }
  })
}

function removeDuplicates(jobsWithId: JobType[]): JobType[] {
  return jobsWithId.reduce((acc: JobType[], current: JobType) => {
    const duplicated = acc.find((job) => job.id === current.id)
    if (!duplicated) {
      return acc.concat(current)
    }
    return acc
  }, [])
}

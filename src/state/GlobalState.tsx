import analytics from '@react-native-firebase/analytics'
import React from 'react'
import { Alert } from 'react-native'
import { getAllJobs, getStateFromStorage, storeState } from '../screens/utils'
import { JobType } from '../types'
import JobsContext from './JobsContext'
interface Props {
  children: React.ReactNode
}

interface State {
  data: JobType[]
  keys: string[]
  refreshing: boolean
  error: boolean
}

export default class GlobalState extends React.Component<Props> {
  state: State = {
    data: [],
    keys: [],
    refreshing: false,
    error: false
  }

  refresh = async (): Promise<void> => {
    this.setState({ data: [], refreshing: true })
    const keys = this.state.keys
    const data: JobType[] = (await getAllJobs()) || []
    await analytics().logEvent('refresh')

    if (data.length > 100) {
      this.setState({
        data,
        refreshing: false,
        keys
      })
      this.storeState()
    }
  }

  async componentDidMount() {
    const storedState = await getStateFromStorage()
    const { data, keys } = storedState
    if (data.length > 100) {
      this.setState({ data, keys })
    } else {
      this.refresh()
    }
  }

  async componentWillUnmount() {
    this.storeState()
  }

  handleClearFavorites = () => {
    Alert.alert('Erase Favorites', 'Are You Sure?', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () => {
          this.setState({ keys: [], favorites: [] })
          this.storeState()
        }
      }
    ])
  }

  handleFavorites = async (data: JobType) => {
    const { keys } = this.state

    if (keys.includes(data.id)) {
      const filteredKeys: string[] = keys.filter((key) => key !== data.id)

      this.setState({
        keys: filteredKeys
      })

      this.storeState()
      await analytics().logEvent('remove favorite')
    } else {
      this.setState({
        keys: [...this.state.keys, data.id]
      })
      this.storeState()
      await analytics().logEvent('add favorite')
    }
  }

  render() {
    const { data, keys, refreshing, error } = this.state

    return (
      <JobsContext.Provider
        value={{
          data,
          keys,
          refreshing,
          error,
          refresh: this.refresh,
          handleClearFavorites: this.handleClearFavorites,
          handleFavorites: this.handleFavorites
        }}
      >
        {this.props.children}
      </JobsContext.Provider>
    )
  }

  private storeState() {
    const { data, keys } = this.state
    storeState({ data, keys })
  }
}

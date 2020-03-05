import React from 'react'
import { Button } from 'react-native-elements'
import ListJobs from '../components/Listjobs/ListJobs'
import JobsContext from '../state/JobsContext'
import AdBanner from '../UI/AdBanner'

interface Props {
  navigation: any
  isFocused: boolean
}

class Favorites extends React.PureComponent<Props> {
  static contextType = JobsContext

  render() {
    const navigate: string = this.props.navigation
    const { data, keys, refreshing, handleClearFavorites } = this.context
    const favs = data.filter(({ id }) => keys.includes(id))
    const refresh = () => this.forceUpdate()

    return (
      <>
        <ListJobs
          jobs={favs}
          navigate={navigate}
          refresh={refresh}
          refreshing={refreshing}
          clearFavorites={handleClearFavorites}
        />
        <Button
          titleStyle={{ color: 'red' }}
          type={'outline'}
          buttonStyle={{ backgroundColor: 'white' }}
          icon={{ name: 'delete', type: 'material-community-icons', color: 'red' }}
          title="Delete all Favorites"
          onPress={handleClearFavorites}
        />
        <AdBanner />
      </>
    )
  }
}

export default Favorites

import * as React from 'react'
import ListJobs from '../components/Listjobs/ListJobs'
import JobsContext from '../state/JobsContext'
import AdBanner from '../UI/AdBanner'

interface Props {
  navigation: any
  isFocused: boolean
}

class Jobs extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null
  }
  static contextType = JobsContext

  render() {
    const navigate: string = this.props.navigation
    const { data, refresh, refreshing, error } = this.context

    return (
      <>
        <ListJobs
          jobs={data}
          navigate={navigate}
          refresh={refresh}
          refreshing={refreshing}
          error={error}
        />
          <AdBanner />
      </>
    )
  }
}

export default Jobs

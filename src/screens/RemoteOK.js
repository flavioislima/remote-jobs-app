import React from 'react'
import ListJobs from '../components/Listjobs/ListJobs'

const url = 'https://remoteok.io/api'

class RemoteOk extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        const navigate = this.props.navigation
        return (
            <ListJobs url={url}
                navigate={navigate}
                source={"RemoteOk"}
            />
        )
    }
}

export default RemoteOk
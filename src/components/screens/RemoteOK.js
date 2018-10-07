import React from 'react'
import ListJobs from '../ListJobs'

const url = 'https://remoteok.io/api'

class RemoteOk extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <ListJobs url={url}
                source={"RemoteOk"}
            />
        )
    }
}

export default RemoteOk
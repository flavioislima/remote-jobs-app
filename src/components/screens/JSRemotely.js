import React from 'react'
import ListJobs from '../ListJobs'

const url = 'https://jsremotely.com/api'

class JSRemotely extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <ListJobs
                url={url}
                source={"JSRemotely"}
            />
        )
    }
}

export default JSRemotely
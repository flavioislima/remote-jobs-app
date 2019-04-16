import React from 'react'
import ListJobs from '../components/Listjobs/ListJobs'

const url = 'https://jsremotely.com/api'

class JSRemotely extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        const navigate = this.props.navigation
        return (
            <ListJobs
                url={url}
                navigate={navigate}
                source={"JSRemotely"}
            />
        )
    }
}

export default JSRemotely
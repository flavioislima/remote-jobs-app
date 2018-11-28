import React from 'react'
import ListJobs from '../components/Listjobs/ListJobs'

class Indeed extends React.Component {
    static navigationOptions = {
        header: null,
    };


    render() {
        const navigate = this.props.navigation
        return (
            <ListJobs
                url='empty'
                token='empty'
                source={'Indeed'}
                navigate={navigate}
            />
        )
    }
}

export default Indeed
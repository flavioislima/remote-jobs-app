import React from 'react'
import axios from 'axios'
import api from '../api'
import ListJobs from '../components/ListJobs'

class Indeed extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ListJobs
                url='empty'
                token='empty'
                source={'Indeed'}
            />
        )
    }
}

export default Indeed
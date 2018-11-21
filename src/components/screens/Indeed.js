import React from 'react'
import axios from 'axios'
import api from '../../api'
import ListJobs from '../ListJobs'

let url
axios.get(`https://www.parsehub.com/api/v2/projects?api_key=${api}&offset=0&limit=20&include_options=1`)
    .then(res => {
        let data = res.data.projects[0]
        let token = data.last_ready_run.run_token
        url = `https://www.parsehub.com/api/v2/runs/${token}/data?api_key=${api}`
    })

class Indeed extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <ListJobs url={url}
                source={"Indeed"}
            />
        )
    }
}

export default Indeed
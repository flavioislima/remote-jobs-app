import React from 'react'
import ListJobs from '../ListJobs'

class Favorites extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ListJobs
                source={"Favorites"}
            />
        )
    }
}

export default Favorites
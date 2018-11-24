import React from 'react'
import ListJobs from '../components/ListJobs'

class Favorites extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ListJobs
                url='Favorites'
                source={"Favorites"}
            />
        )
    }
}

export default Favorites
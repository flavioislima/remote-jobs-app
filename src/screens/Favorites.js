import React from 'react'
import ListJobs from '../components/Listjobs/ListJobs'

class Favorites extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const navigate = this.props.navigation
        return (
            <ListJobs
                url='Favorites'
                source={"Favorites"}
                navigate={navigate}
            />
        )
    }
}

export default Favorites
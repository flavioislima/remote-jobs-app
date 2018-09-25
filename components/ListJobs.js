import React from 'react'
import { Image, Platform, View, FlatList, Text, RefreshControl, TextInput, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import axios from 'axios'
import Jobs from './Jobs'

export default class ListJobs extends React.Component {
    state = {
        data: [],
        filterText: '',
        refreshing: true
    }

    _onGetData = async () => {
        this.setState({ refreshing: true })
        await axios.get(this.props.url)
            .then(data => {
                this.setState({
                    data: data.data,
                    refreshing: false
                })
            })
    }

    _onSearchJobs = (filterText) => {
        this.setState({ filterText })
    }

    _onClearSearch = () => {
        this.setState({ filterText: '' })
    }

    _onRefresh = () => {
        this._onGetData()
    }

    async componentDidMount() {
        await this._onGetData()
    }

    render() {
        const filterRegex = new RegExp(String(this.state.filterText), 'i')
        const filter = item => filterRegex.test(item.text) || filterRegex.test(item.position || item.title)
        const filteredData = this.state.data.filter(filter)

        return (
            <View style={styles.container}>
                <View style={styles.welcomeContainer}>
                    {this.state.refreshing ?
                        <Text
                            style={styles.title}
                        >Searching on {this.props.source}...</Text>
                        :
                        <Text
                            style={styles.title}
                        >{this.state.data.length} Jobs found on {this.props.source}</Text>
                    }
                </View>
                <SearchBar
                    round
                    lightTheme
                    clearIcon={{ type: 'font-awesome', name: 'times' }}
                    icon={{ type: 'font-awesome', name: 'search' }}
                    placeholder="Search for Jobs..."
                    onChangeText={this._onSearchJobs}
                    onClearText={this._onClearSearch}
                />
                <RefreshControl
                    refreshing={this.state.refreshing}
                />
                <FlatList
                    style={styles.container}
                    data={filteredData}
                    renderItem={(job) => {
                        if (job.item.id || job.item.jobId) {
                            return (
                                <Jobs
                                    source={this.props.source}
                                    data={job.item} />
                            )
                        }
                    }
                    }
                    keyExtractor={(job, i) => i.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1e8ee',
    },
    contentContainer: {
        paddingTop: 0,
    },
    welcomeContainer: {
        backgroundColor: '#007acc',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    title: {
        color: 'white',
        fontSize: 16
    },
    search: { height: 40, marginHorizontal: 25, marginVertical: 5, borderWidth: 0.2, borderColor: 'gray', padding: 5 },
});
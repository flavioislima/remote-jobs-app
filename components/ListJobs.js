import React from 'react'
import { StatusBar, View, FlatList, Text, RefreshControl, AsyncStorage, StyleSheet, Alert, NetInfo, ToastAndroid } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'
import axios from 'axios'
import Jobs from './Jobs'

export default class ListJobs extends React.Component {
    state = {
        data: [],
        favorites: [],
        filterText: '',
        refreshing: true
    }

    _onGetData = async () => {
        if (NetInfo.isConnected) {
            await axios.get(this.props.url)
                .then(data => {
                    this.setState({
                        data: data.data,
                        refreshing: false
                    })
                })
        } else {
            ToastAndroid.showWithGravity('Network Error', 4500, ToastAndroid.CENTER)
        }
        let keys = []
        await AsyncStorage.getAllKeys()
            .then(async (data) => {
                keys = await data
                this.setState({ favorites: keys, refreshing: false })
            })
    }

    _getStorageData = async () => {
        let favs = []
        await AsyncStorage.getAllKeys()
            .then((data) => {
                if (data.length > 0) {
                    data.map(async (key) => await AsyncStorage.getItem(key)
                        .then(fav => favs.push(JSON.parse(fav)))
                        .then(() => this.setState({ data: favs, refreshing: false }))
                        .catch(err => console.error(err))
                    )
                } else {
                    this.setState({ refreshing: false })
                }
            })
            .catch(err => alert("Error: ", err))
    }

    _onSearchJobs = (filterText) => {
        this.setState({ filterText })
    }

    _onClearSearch = () => {
        this.setState({ filterText: '' })
    }

    _onRefresh = async () => {
        // this.setState({ data: [], favorites: [] })
        if (this.props.url) {
            await this._onGetData()
        } else {
            await this._getStorageData()
        }
    }

    _clearFavorites = () => {
        AsyncStorage.clear()
            .then(() => {
                this.setState({ favorites: [], data: [] })
                Alert.alert('Erase Favorites', 'Favorites Cleared!', [{ text: 'OK' }])
            })
            .catch(res => console.error(res))
    }

    _handleClearFavorites = () => {
        Alert.alert('Erase Favorites', 'Are You Sure?', [{ text: 'Cancel' }, { text: 'Yes', onPress: this._clearFavorites }])
    }

    async componentDidMount() {
        if (this.props.url) {
            await this._onGetData()
        } else {
            await this._getStorageData()
        }
    }

    render() {
        const filterRegex = new RegExp(String(this.state.filterText), 'i')
        const filter = item => filterRegex.test(item.text) || filterRegex.test(item.position || item.title)
        const filteredData = this.state.data.filter(filter)

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#363636' />
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
                    inputStyle={{ backgroundColor: 'white' }}
                    clearIcon={{ type: 'font-awesome', name: 'times', color: 'lightgray' }}
                    icon={{ type: 'font-awesome', name: 'search', color: 'lightgray' }}
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
                        let { id, jobId } = job.item
                        id = id ? id : jobId
                        if (this.state.favorites.includes(id)) job.item.isFavorite = true
                        if (jobId) job.item.id = String(jobId)
                        if (id) {
                            return (
                                <Jobs
                                    refresh={this._onRefresh}
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
                {this.props.source === 'Favorites' &&
                    <Button
                        transparent
                        color='red'
                        leftIcon={{ name: 'trash', type: 'font-awesome', color: 'red' }}
                        title="Clear Favorites"
                        onPress={this._handleClearFavorites} />
                }
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
        backgroundColor: '#363636',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    title: {
        color: 'white',
        fontSize: 16
    }
});
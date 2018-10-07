import React from 'react'
import { StatusBar, View, FlatList, Text, RefreshControl, AsyncStorage, StyleSheet, Alert, ToastAndroid, TouchableOpacity } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import Jobs from './Jobs'

let RatingModal = null

export default class ListJobs extends React.Component {
  state = {
    data: [],
    favorites: [],
    filterText: '',
    refreshing: true,
    modalVisible: false,
    rated: null
  }

  _onGetData = async () => {
    await axios.get(this.props.url)
      .then(data => {
        if (data.data.length < 800) {
          this.setState({
            data: data.data,
            refreshing: false
          })
        } else {
          ToastAndroid.showWithGravity('Network Error', 6500, ToastAndroid.CENTER)
        }
      })

    let keys = []
    await AsyncStorage.getAllKeys()
      .then(async (data) => {
        keys = await data
        this.setState({ favorites: keys, refreshing: false })
      })
  }

  _getFavorites = async () => {
    let favs = []
    await AsyncStorage.getAllKeys()
      .then((data) => {
        if (data.length > 0) {
          let favKeys = data
          data.map(async (key) => await AsyncStorage.getItem(key)
            .then(fav => {
              fav = JSON.parse(fav)
              if (fav.id) favs.push(fav)
            })
            .then(() => favs = favs.sort((a, b) => a.date - b.date))
            .then(() => this.setState({ data: favs, favorites: favKeys, refreshing: false }))
            .catch(err => Alert.alert(err))
          )
        } else {
          this.setState({ refreshing: false })
        }
      })
      .catch(err => Alert.alert("Error: ", err))
  }

  _onSearchJobs = (filterText) => {
    this.setState({ filterText })
  }

  _onClearSearch = () => {
    this.setState({ filterText: '' })
  }

  _onRefresh = async () => {
    this.setState({ data: [], favorites: [], refreshing: true })
    if (this.props.url) {
      await this._onGetData()
    } else {
      await this._getFavorites()
    }
  }

  _clearFavorites = () => {
    AsyncStorage.multiRemove(this.state.favorites)
      .then(() => {
        this.setState({ favorites: [], data: [] })
        Alert.alert('Erase Favorites', 'Favorites Cleared!', [{ text: 'OK' }])
      })
      .catch(err => Alert.alert("Error on Erase Favorites: ", err))
  }

  _handleClearFavorites = () => {
    Alert.alert('Erase Favorites', 'Are You Sure?', [{ text: 'Cancel' }, { text: 'Yes', onPress: this._clearFavorites }])
  }
  3
  _setModalVisible = (visible) => {
    if (RatingModal === null) {
      RatingModal = require('./RatingModal').default
    }

    this.setState({ modalVisible: visible });

    if (this.state.modalVisible)
      return (
        <RatingModal
          rated={this._rated}
          modalVisible={this.state.modalVisible}
          setModalVisible={this._setModalVisible} />
      )
  }

  _rated = async (rated) => {
    rated = String(rated)
    await AsyncStorage.setItem('rated', rated)
      .then(async () => {
        await AsyncStorage.getItem('rated')
          .then((info) => {
            this.setState({ rated: info })
          })
      })
  }

  async componentDidMount() {
    if (this.props.url) {
      await this._onGetData()
    } else {
      await this._getFavorites()
    }

    await AsyncStorage.getItem('rated')
      .then((rated) => this.setState({ rated: JSON.parse(rated) }))
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i')
    const filter = item => filterRegex.test(item.position) || filterRegex.test(item.title)
    const filteredData = this.state.data.filter(filter)

    return (
      <View style={styles.container} >
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
          {!this.state.rated ?
            <TouchableOpacity
              onPress={() => this._setModalVisible(!this.state.modalVisible)}
              style={styles.icons}>
              <Icon name='star' size={15} color='yellow' />
              <Text style={styles.iconText}>Rate Us</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => this._setModalVisible(!this.state.modalVisible)}
              style={styles.icons}>
              <Icon name='star' size={15} color='yellow' />
              <Icon name='star' size={15} color='yellow' />
              <Icon name='star' size={15} color='yellow' />
              <Icon name='star' size={15} color='yellow' />
              <Icon name='star' size={15} color='yellow' />
            </TouchableOpacity>
          }
          {
            this.state.modalVisible &&
            <RatingModal
              rated={this._rated}
              modalVisible={this.state.modalVisible}
              setModalVisible={this._setModalVisible} />
          }
        </View>
        <View style={styles.searchView}>
          <View style={styles.searchJobs}>
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
          </View>
          <TouchableOpacity
            onPress={this._onRefresh}
            style={styles.reloadButton}>
            <Icon name='refresh' size={30} color="#9b59bc" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.container}
          data={filteredData}
          renderItem={(job) => {
            let isFavorite = false
            let { id, jobId } = job.item
            id = id ? id : jobId
            if (this.state.favorites.includes(id)) {
              job.item.isFavorite = true
              isFavorite = true
            }
            if (jobId) job.item.id = String(jobId)
            if (id) {
              return (
                <Jobs
                  isFavorite={isFavorite}
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
        {
          this.props.source === 'Favorites' &&
          <Button
            buttonStyle={{ height: 15 }}
            transparent
            color='red'
            leftIcon={{ name: 'trash', type: 'font-awesome', color: 'red' }}
            title="Delete all Favorites"
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
    flexDirection: 'row',
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  title: {
    color: 'white',
    fontSize: 14,
    width: '80%'
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    marginHorizontal: 5
  },
  searchJobs: {
    width: '92%'
  },
  reloadButton: {
    alignSelf: 'center',
    width: '8%'
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    borderColor: 'yellow',
    borderRadius: 10
  },
  iconText: {
    fontSize: 14,
    color: 'yellow',
    marginLeft: 5
  }
});
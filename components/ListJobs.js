import React from 'react'
import { StatusBar, View, FlatList, Text, RefreshControl, AsyncStorage, StyleSheet, Alert, ToastAndroid, TouchableOpacity } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import Jobs from './Jobs'

let RatingModal = null
let filteredData = []

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
        if (data) {
          this.setState({
            data: data.data,
            refreshing: false
          })
        } else {
          ToastAndroid.showWithGravity('Network Error', 4500, ToastAndroid.CENTER)
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
            .then(() => this.setState({ data: favs, favorites: favKeys, refreshing: false }))
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

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.title.toUpperCase()}   
      ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ data: newData });
  };

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
      .catch(res => console.error(res))
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

  componentDidMount() {
    if (this.props.url) {
      this._onGetData()
    } else {
      this._getFavorites()
    }

    AsyncStorage.getItem('rated')
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
          {!this.state.rated &&
            <TouchableOpacity
              onPress={() => this._setModalVisible(!this.state.modalVisible)}
              style={styles.icons}>
              <Icon name='star' size={15} color='yellow' />
              <Text style={styles.iconText}>Rate Us</Text>
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
        <FlatList
          style={styles.container}
          data={filteredData}
          renderItem={(job) => {
            let { id, jobId } = job.item
            id = id ? id : jobId
            job.item.isFavorite = false
            if (this.state.favorites.includes(id)) job.item.isFavorite = true
            if (jobId) job.item.id = String(jobId)
            if (id) {
              return (
                // <Text>{job.item.title}</Text>
                <Jobs
                  isFavorite={job.item.isFavorite}
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
    flexDirection: 'row',
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  title: {
    color: 'white',
    fontSize: 14
  },
  icons: {
    flexDirection: 'row',
    // width: '16%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    borderColor: 'yellow',
    // borderWidth: 0.5,
    borderRadius: 10
  },
  iconText: {
    fontSize: 14,
    color: 'yellow',
    marginLeft: 5
  }
});
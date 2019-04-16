import React from 'react';
import {
  StatusBar,
  View,
  FlatList,
  RefreshControl,
  AsyncStorage,
  StyleSheet,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { SafeAreaView } from 'react-navigation';

import api from '../../api';
import Jobs from './Jobs/Jobs';
import Stars from '../../UI/Stars';
// import AdBanner from '../../UI/AdBanner';
import StatusJobs from '../../UI/StatusJobs';
import Search from '../../UI/Search';
import { constants, providers } from '../../constants';

let RatingModal = null;
let Error = null;

const INDEED = 'Indeed';
export default class ListJobs extends React.Component {
  state = {
    data: [],
    favorites: [],
    filterText: '',
    refreshing: true,
    modalVisible: false,
    rated: null,
    url: this.props.url,
    token: this.props.token,
    error: false
  };

  _onGetData = async () => {
    const { parseHubUrl, parseHubOptions } = constants;
    if (this.props.source === providers.indeed)
      await this._checkToken(parseHubUrl, parseHubOptions);
    await axios
      .get(this.state.url)
      .then(data => {
        let newData = [{}];
        console.log(this.state.url);
        console.log(data.data.Job);

        this.props.source === providers.indeed
          ? (newData = data.data.Job)
          : (newData = data.data);
        console.log(this.props.source, { newData });
        if (newData.length > 10 && newData.length < 3500) {
          this.setState({
            data: newData,
            refreshing: false
          });
        } else {
          if (Error === null) {
            Error = require('../../UI/Error').default;
          }
          this.setState({ error: true });
        }
      })
      .catch(err => {
        if (Error === null) {
          Error = require('../../UI/Error').default;
        }
        console.log(err, 'indeed error');

        this.setState({ error: true });
      });

    let keys = [];
    await AsyncStorage.getAllKeys().then(async data => {
      keys = await data;
      this.setState({ favorites: keys, refreshing: false });
    });
  };

  _checkToken = async (url, options) => {
    await axios
      .get(
        `https://www.parsehub.com/api/v2/projects?api_key=${api}&offset=0&limit=20&include_options=1`
      )
      .then(res => {
        let data = res.data.projects[0];
        let token = data.last_ready_run.run_token;
        let url = `https://www.parsehub.com/api/v2/runs/${token}/data?api_key=${api}`;

        console.log({ url });
        if (this.state.token !== token) this.setState({ token, url });
      })
      .catch(err => {
        if (Error === null) {
          Error = require('../../UI/Error').default;
        }

        console.log(err, 'token error');

        this.setState({ error: true });
      });
  };

  _getFavorites = async () => {
    let favs = [];
    await AsyncStorage.getAllKeys()
      .then(data => {
        if (data.length > 0) {
          let favKeys = data;
          data.map(
            async key =>
              await AsyncStorage.getItem(key)
                .then(fav => {
                  fav = JSON.parse(fav);
                  if (fav.id) favs.push(fav);
                })
                .then(() => (favs = favs.sort((a, b) => a.date - b.date)))
                .then(() =>
                  this.setState({
                    data: favs,
                    favorites: favKeys,
                    refreshing: false
                  })
                )
                .catch(err => Alert.alert(err))
          );
        } else {
          this.setState({ refreshing: false });
        }
      })
      .catch(err => Alert.alert('Error: ', err));
  };

  _onSearchJobs = filterText => {
    this.setState({ filterText });
  };

  _onClearSearch = () => {
    this.setState({ filterText: '' });
  };

  _onRefresh = async () => {
    this.setState({ data: [], favorites: [], refreshing: true });
    if (this.state.url === 'Favorites') {
      await this._getFavorites();
    } else {
      await this._onGetData();
    }
  };

  _clearFavorites = () => {
    AsyncStorage.multiRemove(this.state.favorites)
      .then(() => {
        this.setState({ favorites: [], data: [] });
        Alert.alert('Erase Favorites', 'Favorites Cleared!', [{ text: 'OK' }]);
      })
      .catch(err => Alert.alert('Error on Erase Favorites: ', err));
  };

  _handleClearFavorites = () => {
    Alert.alert('Erase Favorites', 'Are You Sure?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: this._clearFavorites }
    ]);
  };
  3;
  _setModalVisible = visible => {
    if (RatingModal === null) {
      RatingModal = require('../../UI/RatingModal').default;
    }

    this.setState({ modalVisible: visible });
  };

  _rated = async rated => {
    rated = String(rated);
    await AsyncStorage.setItem('rated', rated).then(async () => {
      await AsyncStorage.getItem('rated').then(info => {
        this.setState({ rated: info });
      });
    });
  };

  componentDidMount() {
    if (this.state.url === 'Favorites') {
      this._getFavorites();
    } else {
      this._onGetData();
    }

    AsyncStorage.getItem('rated').then(rated =>
      this.setState({ rated: JSON.parse(rated) })
    );
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = item =>
      filterRegex.test(item.position) || filterRegex.test(item.title);
    const filteredData = this.state.data.filter(filter);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#363636" />
        <SafeAreaView>
          <View style={styles.status}>
            <StatusJobs
              source={this.props.source}
              refreshing={this.state.refreshing}
              length={this.state.data.length}
            />
            <Stars
              rated={this.state.rated}
              modalVisible={this.state.modalVisible}
              setModalVisible={this._setModalVisible}
            />
            {this.state.modalVisible && (
              <RatingModal
                rated={this._rated}
                modalVisible={this.state.modalVisible}
                setModalVisible={this._setModalVisible}
              />
            )}
          </View>
        </SafeAreaView>
        <Search
          onChangeText={this._onSearchJobs}
          onClearText={this._onClearSearch}
          refresh={this._onRefresh}
        />
        {this.state.error && <Error />}
        <FlatList
          style={styles.container}
          data={filteredData}
          renderItem={job => {
            let isFavorite = false;
            let { id, jobId } = job.item;
            let urlId = job.item.url;
            if (!id) job.item.id = urlId;
            id = id ? id : jobId;
            if (this.state.favorites.includes(id)) {
              job.item.isFavorite = true;
              isFavorite = true;
            }
            if (jobId) job.item.id = String(jobId);
            if (id) {
              return (
                <Jobs
                  isFavorite={isFavorite}
                  refresh={this._onRefresh}
                  source={this.props.source}
                  setModalVisible={this._setModalVisible}
                  rated={this.state.rated}
                  data={job.item}
                  navigate={this.props.navigate}
                />
              );
            }
          }}
          keyExtractor={(job, i) => i.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
        {this.props.source === 'Favorites' && (
          <Button
            buttonStyle={{ height: 15 }}
            transparent
            color="red"
            leftIcon={{ name: 'trash', type: 'font-awesome', color: 'red' }}
            title="Delete all Favorites"
            onPress={this._handleClearFavorites}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e8ee'
  },
  contentContainer: {
    paddingTop: 0
  },
  status: {
    flexDirection: 'row',
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 5
  }
});
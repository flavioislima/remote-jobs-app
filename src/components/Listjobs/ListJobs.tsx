import React from 'react';
import {
  StatusBar,
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Job from './Jobs/Job';
import Stars from '../../UI/Stars';
import StatusJobs from '../../UI/StatusJobs';
import Search from '../../UI/Search';
import { JobType } from '../../types';
import AdBanner from '../../UI/AdBanner';
import { Context } from '../../../App';

interface Props {
  refresh: () => void;
  jobs: JobType[];
  refreshing: boolean;
  navigate: any;
  favorites?: boolean;
  clearFavorites?: () => void;
  handleClearFavorites?: () => void;
}

let RatingModal = null;
let Error = null;

export default class ListJobs extends React.Component<Props> {
  state = {
    filterText: '',
    modalVisible: false,
    rated: null,
    error: false
  };

  _onSearchJobs = filterText => {
    this.setState({ filterText });
  };

  _onClearSearch = () => {
    this.setState({ filterText: '' });
  };

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
    AsyncStorage.getItem('rated').then(rated =>
      this.setState({ rated: JSON.parse(rated) })
    );
  }

  renderIcons = (name, color = 'white', size = 15) => {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Icon name={name} size={size} color={color} />
      </View>
    );
  };

  render() {
    const {
      jobs,
      favorites,
      refreshing,
      navigate,
      clearFavorites,
      refresh
    } = this.props;

    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item: JobType) => filterRegex.test(item.position);
    // disabling filter for favorites while the data is not on global context
    const filteredData = !favorites ? jobs : jobs.filter(filter);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#363636" />
        <SafeAreaView>
          <View style={styles.status}>
            <StatusJobs refreshing={refreshing} length={jobs.length} />
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
          refresh={refresh}
        />
        {this.state.error && <Error />}
        <FlatList
          style={styles.container}
          data={filteredData}
          renderItem={job => {
            return (
              <Job
                favorites={favorites}
                data={job.item}
                navigate={navigate}
                refresh={refresh}
              />
            );
          }}
          keyExtractor={(job, i) => i.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
        {clearFavorites && (
          <Button
            containerStyle={{
              flex: 0.06,
              justifyContent: 'center',
              alignContent: 'center'
            }}
            buttonStyle={{
              backgroundColor: 'red',
              height: '100%'
            }}
            titleStyle={{
              fontSize: 15
            }}
            icon={this.renderIcons('trash', 'white', 17)}
            title="Delete all Favorites"
            onPress={clearFavorites}
          />
        )}
        <View style={{ alignItems: 'center' }}>
          <AdBanner />
        </View>
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

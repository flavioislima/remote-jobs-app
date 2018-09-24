import React, { Component } from 'react';
import {
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
  Linking
} from 'react-native';
import axios from 'axios'
import moment from 'moment'

export default class App extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    data: [],
    filterText: '',
    refreshing: true
  }

  _onGetRemoteOk = async () => {
    this.setState({ refreshing: true })
    await axios.get('https://remoteok.io/api')
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

  _onRefresh = () => {
    this._onGetRemoteOk()
  }

  async componentDidMount() {
    await this._onGetRemoteOk()
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i')
    const filter = item => filterRegex.test(item.text) || filterRegex.test(item.position)
    const filteredData = this.state.data.filter(filter)

    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text
            style={{ fontSize: 16, marginTop: 15 }}
          >{this.state.data.length} Jobs on Remote OK</Text>
        </View>
        <TextInput
          style={{ height: 40, marginHorizontal: 25 }}
          maxLength={40}
          placeholder="Search for Jobs..."
          onChangeText={this._onSearchJobs}
          value={this.state.filterText}
        />
        <RefreshControl
          refreshing={this.state.refreshing}
        />
        <FlatList
          style={styles.container}
          data={filteredData}
          renderItem={(job) => {
            if (job.item.id) {
              const { company, tags, date, url, position, description } = job.item
              return (
                <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 0.3 }}>
                  <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'space-between', marginHorizontal: 8, marginVertical: 5 }}
                    onPress={() => Linking.openURL(url)}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: 'black' }}>{position}</Text>
                      <Text style={{ fontSize: 11, fontWeight: '400', color: 'black' }}>{moment(date).endOf('day').fromNow()}</Text>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: '400', color: 'darkblue' }}>{company}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>{description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: "space-around", flexWrap: 'wrap', marginVertical: 3 }}>
                      {tags.map((tag, i) => <Text style={styles.tags} key={i}>{(tag).toUpperCase()}</Text>)}
                    </View>
                  </TouchableOpacity>
                </View>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    marginTop: 25,
    marginLeft: -10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  tags: {
    fontSize: 11,
    backgroundColor: 'orange',
    color: 'white',
    padding: 4, margin: 1,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: 'white'
  }
});

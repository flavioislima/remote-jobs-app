import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Share
} from 'react-native';
import moment from 'moment';

import Description from './SubComponents/Description';
import Icons from './SubComponents/Icons';
import Details from './SubComponents/Details';

export default class Jobs extends React.Component {
  state = {
    showDescription: false
  };

  static navigationOptions = {
    header: null
  };

  _handleDescription = () => {
    this.setState(prevstate => ({
      showDescription: !prevstate.showDescription
    }));
  };

  _openWebView = url => {
    this.props.navigate.navigate('Browser', { url: url });
  };

  _handleSharing = (url, position, company) => {
    Share.share(
      {
        message: `Here follows a great Remote Job Opportunity: 
        * Position: ${position} 
        * Company: ${company}
        * Url: ${url}
        * Get our App at: http://bit.ly/remotework`,
        url,
        title: `Remote Work App - ${position} @${company}`
      },
      {
        subject: 'Job Shared from Remote Work App',
        dialogTitle: 'Share a Remote Job',
        tintColor: '#4effa1'
      }
    );
  };

  _handleFavorite = async data => {
    const id = data.id;
    this.props.data.isFavorite = !this.props.data.isFavorite;

    let keys = [];
    await AsyncStorage.getAllKeys()
      .then(res => (keys = res))
      .catch(err => Alert.alert('Error: ', err));

    if (keys.includes(id)) {
      await AsyncStorage.removeItem(data.id)
        .then(() => {
          if (this.props.source === 'Favorites') this.props.refresh();
        })
        .catch(err => Alert.alert('Error: ', err));
    } else {
      data.isFavorite = true;
      await AsyncStorage.setItem(id, JSON.stringify(data));
    }
    if (this.props.source !== 'Favorites') this.forceUpdate();
  };

  render() {
    const {
      link,
      name,
      title,
      tags,
      dateFormated,
      type,
      salary
    } = this.props.data;
    let {
      description,
      date,
      company,
      url,
      position,
      isFavorite
    } = this.props.data;
    company = company ? company : name;
    position = position ? position : title;
    url = url ? url : link;
    if (date)
      date = moment(date)
        .endOf('day')
        .fromNow();
    description = description
      ? description
          .replace(/<(?:.|\n)*?>/gm, '')
          .replace(/&amp;/gm, '&')
          .replace(/&#8211;/gm, '-')
          .replace(
            /&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;|&nbsp;|&ldquo;|&rdquo;/gm,
            '"'
          )
          .trim()
      : 'Open Url for more information';

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => this._handleDescription()}
        >
          <Details
            position={position}
            company={company}
            date={date || dateFormated}
          />
          {description && this.state.showDescription && (
            <Description
              tags={tags}
              salary={salary}
              type={type}
              description={description}
            />
          )}
          <Icons
            handleFavorite={this._handleFavorite}
            handleSharing={this._handleSharing}
            handleFavorite={this._handleFavorite}
            handleUrl={this._openWebView}
            data={this.props.data}
            isFavorite={isFavorite}
            url={url}
            position={position}
            company={company}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row'
  },
  touch: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  }
});

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Share } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import Description from './SubComponents/Description';
import Icons from './SubComponents/Icons';
import Details from './SubComponents/Details';
import { JobType } from '../../../types';

interface Props {
  data: JobType;
  favorites?: boolean;
  navigate: any;
  refresh: () => void;
}

export default class Job extends React.Component<Props> {
  state = {
    showDescription: false,
    isFavorite: false
  };

  static navigationOptions = {
    header: null
  };

  _handleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription
    });
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
        * Url: ${url}`,
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

    this.setState({ isFavorite: !this.state.isFavorite });

    const keys = await AsyncStorage.getAllKeys();
    if (keys.includes(id)) {
      await AsyncStorage.removeItem(data.id);
      this.props.favorites && this.props.refresh();
    } else {
      data.isFavorite = true;
      await AsyncStorage.setItem(id, JSON.stringify(data));
    }
  };

  checkFavorite = async item => {
    const isFavorite = await AsyncStorage.getItem(item);
    return Boolean(isFavorite);
  };

  async componentDidMount() {
    const id = this.props.data.id;
    const isFavorite = await this.checkFavorite(id);
    this.setState({ isFavorite });
  }

  render() {
    const { showDescription, isFavorite } = this.state;
    const {
      url,
      position,
      tags,
      dateFormated,
      type,
      salary,
      company
    } = this.props.data;
    let { description, date } = this.props.data;

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
          {description && showDescription && (
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

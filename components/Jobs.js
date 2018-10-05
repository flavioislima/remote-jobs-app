import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Linking, AsyncStorage, Share } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

class Jobs extends React.Component {
  state = {
    showDescription: false,
    countViews: 0,
    isFavorite: this.props.isFavorite,
  }

  _handleDescription = () => {
    this.setState(prevstate => ({ showDescription: !prevstate.showDescription }))
  }

  _handleUrl = (url) => {
    let count = this.state.countViews++
    this.setState({
      countViews: count
    })
    Linking.openURL(url)
  }

  _handleSharing = (url, position, company) => {
    Share.share(
      {
        message: `Here follows a great Remote Job Opportunity: 
        * Position: ${position} 
        * Company: ${company}
        * Url: ${url}
        * Get our App at: https://play.google.com/store/apps/details?id=com.remotework`,
        url,
        title: `Remote Work App - ${position} @${company}`
      }, {
        subject: 'Job Shared from Remote Work App',
        dialogTitle: 'Share a Remote Job',
        tintColor: '#4effa1'
      }
    )
  }

  _handleFavorite = async (data) => {
    const id = data.id
    this.setState({ isFavorite: !this.state.isFavorite })
    this.props.data.isFavorite = !this.state.isFavorite

    let keys = []
    await AsyncStorage.getAllKeys()
      .then(res => keys = res)
      .catch(err => console.error(err))

    if (keys.includes(id)) {
      await AsyncStorage.removeItem(data.id)
        .then(() => { if (this.props.source === "Favorites") this.props.refresh() })
        .catch((e) => console.error(e))
    } else {
      data.isFavorite = true
      await AsyncStorage.setItem(id, JSON.stringify(data))
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isFavorite !== this.state.isFavorite) {
      return true
    } else if (nextState.showDescription !== this.state.showDescription) {
      return true
    } else if (nextProps.data !== this.props.data) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { link, name, title, tags, logo } = this.props.data
    let { description, date, company, url, position, isFavorite } = this.props.data
    company = company ? company : name
    position = position ? position : title
    url = url ? url : link
    date = moment(date).endOf('day').fromNow()
    description = description
      .replace(/<(?:.|\n)*?>/gm, '')
      .replace(/&amp;/gm, '&')
      .replace(/&#8211;/gm, '-')
      .replace(/&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;|&nbsp;|&ldquo;|&rdquo;/gm, '"')

    let renderTags;
    if (tags) {
      renderTags = (
        <View>
          <View style={styles.tagsView}>
            {tags.map((tag, i) => <Text style={styles.tags} key={i}>{(tag).toUpperCase()}</Text>)}
          </View>
        </View>
      )
    }

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => this._handleDescription()}
        >
          <View style={styles.viewJob}>
            <View style={styles.viewPosition}>
              <Text style={styles.position}>{position}</Text>
              <Text style={styles.company}>{company}</Text>
            </View>

            <View style={styles.viewDate}>
              <Text style={styles.date}>{date}</Text>
              {/* <Image source={logo ? { uri: logo } : fakeLogo} style={styles.logo} /> */}
            </View>
          </View>
          {
            this.state.showDescription &&
            <View>
              <Text style={styles.description}>{description}</Text>
              {
                tags && renderTags
              }
            </View>
          }
          <View style={styles.iconsView}>
            <TouchableOpacity
              onPress={() => this._handleFavorite(this.props.data)}
              style={styles.icons}>
              <Icon name={this.props.data.isFavorite ? 'heart' : 'heart-o'} size={25} color='red' />
              <Text style={[styles.iconText, { color: 'red' }]}>{isFavorite ? 'Saved' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._handleUrl(url)}
              style={styles.icons}>
              <Icon name='globe' size={25} color='blue' />
              <Text style={styles.iconText}>Open</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._handleSharing(url, position, company)}
              style={styles.icons}>
              <Icon name='retweet' size={25} color='purple' />
              <Text style={[styles.iconText, { color: 'purple' }]}>Share</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    )
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
  },
  viewJob: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1abc9c',
    padding: 5,
    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderBottomStartRadius: 10,
  },
  viewPosition: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '75%',
    marginLeft: 3
  },
  viewDate: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: 68,
    marginLeft: 3
  },
  position: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white'
  },
  company: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white'
  },
  description: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: '400',
    color: 'black'
  },
  date: {
    fontSize: 11,
    fontWeight: '400',
    color: 'white',
    marginBottom: 3
  },
  logo: {
    width: 40,
    height: 35,
  },
  tagsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  tags: {
    fontSize: 11,
    backgroundColor: '#e1e8ee',
    color: 'black',
    padding: 4,
    margin: 3,
    borderWidth: 0.1,
    borderRadius: 4,
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5
  },
  icons: {
    flexDirection: 'row',
    width: '20%',
    alignItems: 'center',
    padding: 4,
  },
  iconText: {
    fontSize: 13,
    color: 'blue',
    marginLeft: 5
  }
})

export default Jobs
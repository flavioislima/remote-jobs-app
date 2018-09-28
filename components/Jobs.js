import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, AsyncStorage, Share } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

class Jobs extends React.Component {
    state = {
        showDescription: false,
        urlToShare: ''
    }

    _handleDescription = () => {
        this.setState(prevstate => ({ showDescription: !prevstate.showDescription }))
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

    render() {
        const { link, name, title, tags, logo, url } = this.props.data
        let { description, date, company, position } = this.props.data
        company = company ? company : name
        position = position ? position : title

        date = moment(date).endOf('day').fromNow()
        description = description
            .replace(/<(?:.|\n)*?>/gm, '')
            .replace(/&amp;/gm, '&')
            .replace(/&#8211;/gm, "-")
            .replace(/&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;|&nbsp;|&ldquo;|&rdquo;/gm, "'")

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
                            <Image source={{ uri: logo }} style={styles.logo} />
                        </View>
                    </View>
                    {
                        this.state.showDescription &&
                        <View>
                            <Text style={styles.description}>{description}</Text>
                            {
                                tags && renderTags
                            }
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 5 }}>
                                <TouchableOpacity style={styles.icons}>
                                    <Icon name='heart' size={20} color='red' />
                                    <Text style={styles.iconText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(url ? url : link)}
                                    style={styles.icons}>
                                    <Icon name='globe' size={20} color='blue' />
                                    <Text style={styles.iconText}>Open</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleSharing(url, position, company)}
                                    style={styles.icons}>
                                    <Icon name='retweet' size={20} color='purple' />
                                    <Text style={styles.iconText}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
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
        borderWidth: 0.3,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    viewJob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4effa1',
        padding: 5,
        borderRadius: 10,
    },
    viewPosition: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '75%',
        marginLeft: 3
    },
    viewDate: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '25%',
        marginLeft: 3
    },
    position: {
        fontSize: 15,
        fontWeight: '700',
        color: 'black'
    },
    company: {
        fontSize: 13,
        fontWeight: '400',
        color: 'black'
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
        color: 'black',
        marginBottom: 3
    },
    logo: {
        width: 35,
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
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'center'
    },
    iconText: {
        fontSize: 11,
        color: 'blue',
        marginLeft: 5
    }
})

export default Jobs
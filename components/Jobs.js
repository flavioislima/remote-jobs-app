import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Linking } from 'react-native'
import moment from 'moment'

class Jobs extends React.Component {
    state = {
        showDescription: false
    }

    render() {
        const { link, name, title, company, tags, logo, url, position } = this.props.data
        let { description, date } = this.props.data
        date = moment(date).endOf('day').fromNow()
        description = description
            .replace(/<(?:.|\n)*?>/gm, '')
            .replace(/&amp;/gm, '&')
            .replace(/&#8211;/gm, "-")
            .replace(/&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;|&nbsp;|&ldquo;|&rdquo;/gm, "'")

        let renderDescAndTags;
        if (tags) {
            renderDescAndTags = (
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
                    onLongPress={() => Linking.openURL(url ? url : link)}
                    onPress={() => this.setState({ showDescription: !this.state.showDescription })}
                >
                    <View style={styles.viewJob}>
                        <View style={styles.viewPosition}>
                            <Text style={styles.position}>{position ? position : title}</Text>
                            <Text style={styles.company}>{company ? company : name}</Text>
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
                                tags && renderDescAndTags
                            }
                            <Text style={{ fontSize: 9, marginBottom: 5, alignSelf: 'center' }}>(LongPress to Open Link)</Text>
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
})

export default Jobs
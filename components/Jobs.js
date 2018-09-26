import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import moment from 'moment'

const Jobs = (props) => {
    const { link, name, title, company, tags, logo, url, position } = props.data
    let { description, date } = props.data
    description = description
        .replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&amp;/gm, '&')
        .replace(/&#8211;/gm, "-")
        .replace(/&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;/gm, "'")

    date = moment(date).endOf('day').fromNow()

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
                onPress={() => Linking.openURL(url ? url : link)}
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
                <Text style={styles.description}>{description}</Text>
                {
                    tags ? renderDescAndTags : console.log('noTags')
                }
            </TouchableOpacity>
        </View>
    )
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
        // justifyContent: 'space-between',
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
        // marginLeft: 15,
        marginBottom: 3
    },
    logo: {
        width: 35,
        height: 35,
        // marginLeft: 10
    },
    tagsView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        // marginVertical: 3,
        marginBottom: 5,
    },
    tags: {
        fontSize: 11,
        backgroundColor: '#e1e8ee',
        color: 'black',
        padding: 4,
        margin: 3,
        // marginHorizontal: 5,
        borderWidth: 0.1,
        borderRadius: 4,
        // borderColor: 'black'
    },
})

export default Jobs
import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import moment from 'moment'

const Jobs = (props) => {
    const { link, name, title, company, tags, logo, date, url, position, description } = props.data
    let renderDescAndTags;
    if (tags) {
        renderDescAndTags = (
            <View>
                <Text style={styles.description}>{description}</Text>
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
                    <Text style={styles.date}>{moment(date).endOf('day').fromNow()}</Text>
                    <Image source={{ uri: logo }} style={styles.logo} />
                </View>
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
        marginVertical: 5
    },
    viewJob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#007acc',
        padding: 5
    },
    viewPosition: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: 250,
        justifyContent: 'space-between',
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
        color: 'aquamarine'
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
        marginLeft: 15
    },
    logo: {
        width: 35,
        height: 35
    },
    tagsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        flexWrap: 'wrap',
        marginVertical: 3
    },
    tags: {
        fontSize: 11,
        backgroundColor: 'orange',
        color: 'white',
        padding: 4,
        margin: 1,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: 'white'
    },
})

export default Jobs
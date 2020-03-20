import React from 'react'
import { Dimensions, Share, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, ListItem, Overlay, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import JobsContext from '../../../state/JobsContext'
import { JobType } from '../../../types'
import AdBanner from '../../../UI/AdBanner'
import Description from './SubComponents/Description'
import Icons from './SubComponents/Icons'

interface Props {
  data: JobType
}

const screenHeight = Dimensions.get('screen').height
console.log(screenHeight);


const Job: React.FC<Props> = ({ data }: Props) => {
  const { keys, handleFavorites } = React.useContext(JobsContext)
  const [showIcons, setShowIcons] = React.useState(false)

  const {
    url,
    position,
    tags,
    salary,
    company,
    description,
    date,
    image
  } = data

  const handleSharing = () => {
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
    )
  }

  const dateFormated: string = new Date(date).toUTCString().slice(5, 16)

  const listIcon = (<TouchableOpacity onPress={() => setShowIcons(true)}>
    <Icon name="chevron-right" color={'#000'} size={28} />
  </TouchableOpacity>)

  return (
    <View style={styles.item}>
      <ListItem
        title={position}
        subtitle={company}
        leftAvatar={{ source: image }}
        rightIcon={listIcon}
        onPress={() => setShowIcons(true)}
        bottomDivider
        pad={12}
      />
      <Overlay
        isVisible={showIcons}
        onBackdropPress={() => setShowIcons(false)}
        overlayStyle={styles.modal}
        height={'auto'}
        width={'90%'}
      >
        <View>
        <View style={styles.titleContainer}>
          <Text style={styles.position}>{position}</Text>
          <Text style={styles.company}>{company}</Text>
        </View>
        <Divider style={{height: 1, backgroundColor: '#999'}} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Description
              tags={tags}
              salary={salary}
              description={description}
              date={dateFormated}
              company={company}
              position={position}
              />
            <Icons
              handleFavorite={handleFavorites.bind(this, data)}
              handleSharing={handleSharing}
              data={data}
              isFavorite={keys.includes(data.id)}
              url={url}
              position={position}
              company={company}
              />
            </View>
            {screenHeight > 680 && <AdBanner size={'RECTANGLE'} unitId={'SQUARE'}/>}
            </View>
          </View>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center'
  },
  item: {
    flexDirection: 'column'
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingTop: 6,
    marginVertical: 6
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  position: {
    fontSize: 15,
    color: '#444'
  },
  company: {
    fontSize: 12,
    color: '#666'
  }
})

export default Job

import React from 'react'
import { Share, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import JobsContext from '../../../state/JobsContext'
import { JobType } from '../../../types'
import AdBanner from '../../../UI/AdBanner'
import Description from './SubComponents/Description'
import Icons from './SubComponents/Icons'

interface Props {
  data: JobType
  navigate: any
  refresh: () => void
}

const Job: React.FC<Props> = ({ data, navigate }: Props) => {
  const { keys, handleFavorites } = React.useContext(JobsContext)
  const [showIcons, setShowIcons] = React.useState(false)

  const {
    url,
    position,
    tags,
    type,
    salary,
    company,
    description,
    date,
    image
  } = data

  const openWebView = () => {
    navigate.navigate('Browser', { url })
  }

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

  const dateFormated = new Date(date).toUTCString().slice(5, 16)

  const dots = (<TouchableOpacity onPress={() => setShowIcons(true)}>
    <Icon name="dots-vertical" color={'#000'} size={28} />
  </TouchableOpacity>)

  return (
    <View style={styles.item}>
      <ListItem
      title={position}
      subtitle={company}
      leftAvatar={{ source: image }}
      rightIcon={dots}
      onPress={openWebView}
    />
      <Modal
        isVisible={showIcons}
        onBackdropPress={() => setShowIcons(false)}
        hideModalContentWhileAnimating
        useNativeDriver
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Description
            tags={tags}
            salary={salary}
            type={type}
            description={description}
            date={dateFormated}
            />
          <Icons
            handleFavorite={handleFavorites.bind(this, data)}
            handleSharing={handleSharing}
            handleUrl={openWebView}
            data={data}
            isFavorite={keys.includes(data.id)}
            url={url}
            position={position}
            company={company}
            />
          <AdBanner size={'MEDIUM_RECTANGLE'}/>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column'
  },
  modalContent: {
    width: 300
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Job

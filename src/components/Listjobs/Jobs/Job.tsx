import React from 'react'
import { Share, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import JobsContext from '../../../state/JobsContext'
import { JobType } from '../../../types'
import Description from './SubComponents/Description'
import Details from './SubComponents/Details'
import Icons from './SubComponents/Icons'

interface Props {
  data: JobType
  navigate: any
  refresh: () => void
}

const Job: React.FC<Props> = ({ data, navigate }: Props) => {
  const { keys, handleFavorites } = React.useContext(JobsContext)
  const [showDescription, setShowDescription] = React.useState(false)
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
  position.includes('React') ? window.console.log(data) : window.console.log('')

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => setShowDescription(!showDescription)}
      >
        <Details
          image={image}
          position={position}
          company={company}
          date={dateFormated}
          showIcons={() => setShowIcons(true)}
        />
        {description && showDescription && (
          <Description
            tags={tags}
            salary={salary}
            type={type}
            description={description}
          />
        )}
      </TouchableOpacity>
      <Modal
        isVisible={showIcons}
        onBackdropPress={() => setShowIcons(false)}
        hideModalContentWhileAnimating
        useNativeDriver
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.modal}
      >
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
      </Modal>
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
    width: '80%',
    marginHorizontal: 8,
    borderBottomColor: '#858585',
    borderBottomWidth: 2
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 5
  }
})

export default Job

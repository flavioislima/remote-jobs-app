import React from 'react'
import { Share, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem, Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import JobsContext from '../../../state/JobsContext'
import { JobType } from '../../../types'
import AdBanner from '../../../UI/AdBanner'
import Description from './SubComponents/Description'
import Icons from './SubComponents/Icons'

interface Props {
  data: JobType
}

const Job: React.FC<Props> = ({ data }: Props) => {
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
      >
        <View style={styles.modalContent}>
          <Description
            tags={tags}
            salary={salary}
            type={type}
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
          <AdBanner size={'MEDIUM_RECTANGLE'}/>
        </View>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column'
  },
  modalContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

export default Job

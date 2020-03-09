import React from 'react'
import { Share, StyleSheet, TouchableOpacity, View } from 'react-native'

import JobsContext from '../../../state/JobsContext'
import { JobType } from '../../../types'
import Description from './SubComponents/Description'
import Details from './SubComponents/Details'
// import Icons from './SubComponents/Icons'

interface Props {
  data: JobType
  navigate: any
  refresh: () => void
}

const Job: React.FC<Props> = ({ data, navigate }: Props) => {
  const { keys, handleFavorites } = React.useContext(JobsContext)
  const [showDescription, setShowDescription] = React.useState(false)
  const {
    url,
    position,
    tags,
    type,
    salary,
    company,
    description,
    date,
    image,
    logo
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

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => setShowDescription(!showDescription)}
      >
        <Details image={image ? image : { uri: logo }} position={position} company={company} date={dateFormated} />
        {description && showDescription && (
          <Description
            tags={tags}
            salary={salary}
            type={type}
            description={description}
          />
        )}
        {/* <Icons
          handleFavorite={handleFavorites.bind(this, data)}
          handleSharing={handleSharing}
          handleUrl={openWebView}
          data={data}
          isFavorite={keys.includes(data.id)}
          url={url}
          position={position}
          company={company}
        /> */}
      </TouchableOpacity>
      <View style={{borderBottomColor: '#858585', borderBottomWidth: 3}} />
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
    marginHorizontal: 8
  }
})

export default Job

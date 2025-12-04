import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Share,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Divider, List, Modal, Portal, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import JobsContext from '../context/JobsContext';
import { JobType } from '../types';
// import AdBanner from './AdBanner';
import Description from './Description';
import Icons from './Icons';

interface JobProps {
  data: JobType;
}

const screenHeight = Dimensions.get('window').height;

const Job: React.FC<JobProps> = ({ data }) => {
  const { keys, handleFavorites } = useContext(JobsContext);
  const [showIcons, setShowIcons] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const {
    id,
    url,
    position,
    tags,
    salary,
    company,
    description,
    date,
    company_logo
  } = data;

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
    );
  };

  const dateFormatted: string = new Date(date).toUTCString().slice(5, 16);
  const isFavorite = keys.includes(id);

  return (
    <View style={styles.item}>
      <List.Item
        title={position}
        description={company}
        titleStyle={styles.title}
        descriptionStyle={styles.company}
        onPress={() => setShowDescription(true)}
        right={() => (
          <TouchableOpacity onPress={() => setShowIcons(true)} style={styles.chevronButton}>
            <MaterialCommunityIcons name="chevron-right" color={'#000'} size={28} />
          </TouchableOpacity>
        )}
      />
      <View style={styles.dateContainer}>
        <Text variant="bodySmall" style={styles.date}>{dateFormatted}</Text>
      </View>
      
      {/* Description modal */}
      <Portal>
        <Modal
          visible={showDescription}
          onDismiss={() => setShowDescription(false)}
          contentContainerStyle={styles.overlay}
        >
          <Description
            description={description}
            tags={tags}
            salary={salary}
            date={date}
            url={url}
            company={company}
            position={position}
            onClose={() => setShowDescription(false)}
          />
        </Modal>
      </Portal>
      
      {/* Icons modal */}
      <Portal>
        <Modal
          visible={showIcons}
          onDismiss={() => setShowIcons(false)}
          contentContainerStyle={styles.iconsOverlay}
        >
          <Icons
            onClose={() => setShowIcons(false)}
            onShare={handleSharing}
            onFavorite={() => handleFavorites && handleFavorites(data)}
            isFavorite={isFavorite}
            url={url}
          />
          {/* <AdBanner unitId={'SQUARE'} size={'RECTANGLE'} /> */}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  company: {
    fontSize: 14,
    color: '#555'
  },
  chevronButton: {
    justifyContent: 'center',
    paddingRight: 8
  },
  dateContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  date: {
    color: '#888'
  },
  overlay: {
    width: '90%',
    height: '80%',
    padding: 0,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: '5%'
  },
  iconsOverlay: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: '10%'
  }
});

export default Job;

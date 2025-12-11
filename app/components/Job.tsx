import React, { useContext, useState } from 'react';
import {
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform
} from 'react-native';
import { List, Modal, Portal, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import JobsContext from '../context/JobsContext';
import { JobType } from '../types';
// import AdBanner from './AdBanner';
import Description from './Description';
import Icons from './Icons';

const JobStructuredData: React.FC<{ job: JobType }> = ({ job }) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.position,
    "description": job.description,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Remote"
      }
    },
    "employmentType": "REMOTE",
    "datePosted": job.date,
    "url": job.url,
    ...(job.salary && { "baseSalary": job.salary }),
    ...(job.tags && { "skills": job.tags.join(', ') })
  };

  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
  });
};

interface JobProps {
  data: JobType;
}

const Job: React.FC<JobProps> = ({ data }) => {
  const { keys, handleFavorites } = useContext(JobsContext);
  const { t } = useTranslation();
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
    date
  } = data;

  const handleSharing = () => {
    Share.share(
      {
        message: t('share.message', { position, company, url }),
        url,
        title: t('share.title', { position, company })
      },
      {
        subject: t('share.subject'),
        dialogTitle: t('share.dialogTitle'),
        tintColor: '#4effa1'
      }
    );
  };

  const dateFormatted: string = new Date(date).toUTCString().slice(5, 16);
  const isFavorite = keys.includes(id);

  return (
    <View style={styles.item}>
      <JobStructuredData job={data} />
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
            position={position}
          />
          {/* <AdBanner unitId={'SQUARE'} size={'RECTANGLE'} /> */}
        </Modal>
      </Portal>
    </View>
  );
};

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 1024;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  title: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: 'bold'
  },
  company: {
    fontSize: isDesktop ? 16 : 14,
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
    width: isDesktop ? '70%' : '90%',
    height: isDesktop ? '70%' : '80%',
    padding: 0,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: isDesktop ? '15%' : '5%',
  },
  iconsOverlay: {
    width: isDesktop ? '50%' : '80%',
    padding: 0,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: isDesktop ? '25%' : '10%',
    backgroundColor: '#fff'
  }
});

export default Job;

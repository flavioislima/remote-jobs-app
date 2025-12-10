import React, { useState } from 'react';
import {  StyleSheet, View, ScrollView } from 'react-native';
import { Button, Divider, Text, Modal, Portal, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { getTags } from '../utils';
import { JobType } from '../types';
import DatePicker from './DatePicker';
// import AdBanner from './AdBanner';

interface FilterModalProps {
  visible: boolean;
  onDismiss: () => void;
  pickedTags: string[];
  pickedDate: string;
  jobs: JobType[];
  setPickedTags: (tags: string[]) => void;
  clearFilters: () => void;
  setPickedDate: (date: string) => void;
  clearFavorites?: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onDismiss,
  pickedTags,
  pickedDate,
  setPickedTags,
  setPickedDate,
  clearFilters,
  jobs,
  clearFavorites
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();

  // Handle date selection from our custom DatePicker
  const handleDateConfirm = (selectedDate: Date) => {
    setPickedDate(selectedDate.toJSON());
    setShowCalendar(false);
  };

  const formattedDate = new Date(pickedDate).toUTCString().slice(5, 16);
  const allTags = getTags(jobs);
  const filteredJobs = jobs.filter(job => 
    new Date(job.date) >= new Date(pickedDate) && 
    (pickedTags.length === 0 || job.tags?.some(tag => pickedTags.includes(tag)))
  );

  const toggleTag = (tag: string) => {
    if (pickedTags.includes(tag)) {
      setPickedTags(pickedTags.filter(t => t !== tag));
    } else {
      setPickedTags([...pickedTags, tag]);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.overlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text variant="titleLarge" style={styles.title}>{t('filter.refineJobs')} ({filteredJobs.length})</Text>
            <Button onPress={clearFilters} textColor="#2196f3">{t('filter.reset')}</Button>
          </View>
          
          <Divider style={{marginVertical: 10}} />
        
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
           <Text variant="titleMedium" style={styles.containerTitle}>{t('filter.filterByDate')}</Text>
           <Button
             mode="outlined"
             onPress={() => setShowCalendar(true)}
             style={styles.dateButton}
             textColor='#032038ff'
           >
             {t('filter.postedAfter')}: {formattedDate}
           </Button>
            
            <DatePicker
              isVisible={showCalendar}
              onCancel={() => setShowCalendar(false)}
              onConfirm={handleDateConfirm}
              initialDate={new Date(pickedDate)}
              maximumDate={new Date()}
              
            />
          </View>

          <View style={styles.container}>
            <Text variant="titleMedium" style={styles.containerTitle}>{t('filter.filterByTags')}</Text>
            <View style={styles.tagsContainer}>
              {allTags.map((tag, index) => (
                <Chip
                  key={index}
                  selected={pickedTags.includes(tag)}
                  onPress={() => toggleTag(tag)}
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  {tag}
                </Chip>
              ))}
            </View>
          </View>

          {clearFavorites && (
            <View style={styles.container}>
              <Button
                  mode="contained"
                  buttonColor="#f44336"
                  icon="delete"
                  onPress={clearFavorites}
                >
                  {t('filter.clearAllFavorites')}
                </Button>
            </View>
          )}
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            mode="contained"
            buttonColor="#4caf50"
            onPress={onDismiss}
          >
            {t('filter.applyFilters')}
          </Button>
        </View>
        
        {/* <AdBanner unitId={'SQUARE'} size={'SMALL'} /> */}
      </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginHorizontal: '5%'
  },
  modalContent: {
    flex: 1,
    padding: 15,
    width: '100%', // Ensure full width on Android
    height: '100%' // Ensure full height on Android
  },
  scrollContainer: {
    flex: 1
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  title: {
    flex: 1
  },
  container: {
    marginVertical: 10
  },
  containerTitle: {
    marginBottom: 10
  },
  dateButton: {
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  chip: {
    marginRight: 6,
    marginBottom: 6
  },
  chipText: {
    fontSize: 12
  },
  footer: {
    marginTop: 10
  }
});

export default FilterModal;

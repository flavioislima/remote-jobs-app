import React, { useState } from 'react';
import {  StyleSheet, View, ScrollView } from 'react-native';
import { Button, Divider, Text, Overlay, Chip } from '@rneui/themed';
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
    <Overlay
      isVisible={visible}
      onBackdropPress={onDismiss}
      overlayStyle={styles.overlay}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Refine Jobs ({filteredJobs.length})</Text>
          <Text style={styles.clearButton} onPress={clearFilters}>Reset</Text>
        </View>
        
        <Divider style={{height: 1, backgroundColor: '#999', marginVertical: 10}} />
        
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.containerTitle}>Filter by Date</Text>
            <Button
              title={`Posted after: ${formattedDate}`}
              type="outline"
              onPress={() => setShowCalendar(true)}
              buttonStyle={styles.dateButton}
              titleStyle={styles.dateButtonText}
            />
            
            <DatePicker
              isVisible={showCalendar}
              onCancel={() => setShowCalendar(false)}
              onConfirm={handleDateConfirm}
              initialDate={new Date(pickedDate)}
              maximumDate={new Date()}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.containerTitle}>Filter by Tags</Text>
            <View style={styles.tagsContainer}>
              {allTags.map((tag, index) => (
                <Chip
                  key={index}
                  title={tag}
                  type={pickedTags.includes(tag) ? "solid" : "outline"}
                  buttonStyle={
                    pickedTags.includes(tag)
                      ? styles.selectedChip
                      : styles.chip
                  }
                  titleStyle={
                    pickedTags.includes(tag)
                      ? styles.selectedChipText
                      : styles.chipText
                  }
                  onPress={() => toggleTag(tag)}
                />
              ))}
            </View>
          </View>

          {clearFavorites && (
            <View style={styles.container}>
              <Button
                title="Clear All Favorites"
                buttonStyle={styles.clearFavoritesButton}
                titleStyle={styles.clearFavoritesText}
                icon={{
                  name: 'delete',
                  type: 'material',
                  size: 20,
                  color: 'white'
                }}
                onPress={clearFavorites}
              />
            </View>
          )}
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Apply Filters"
            buttonStyle={styles.applyButton}
            onPress={onDismiss}
          />
        </View>
        
        {/* <AdBanner unitId={'SQUARE'} size={'SMALL'} /> */}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 0,
    overflow: 'hidden',
    position: 'absolute', // Ensure proper positioning on Android
    backgroundColor: '#fff' // Explicitly set background color
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  clearButton: {
    color: '#2196f3',
    fontSize: 16
  },
  container: {
    marginVertical: 10
  },
  containerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  dateButton: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10
  },
  dateButtonText: {
    color: '#333'
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  chip: {
    backgroundColor: '#fff',
    marginRight: 6,
    marginBottom: 6
  },
  selectedChip: {
    backgroundColor: '#2196f3',
    marginRight: 6,
    marginBottom: 6
  },
  chipText: {
    color: '#333',
    fontSize: 12
  },
  selectedChipText: {
    color: '#fff',
    fontSize: 12
  },
  clearFavoritesButton: {
    backgroundColor: '#f44336',
    marginTop: 10
  },
  clearFavoritesText: {
    color: 'white'
  },
  footer: {
    marginTop: 10
  },
  applyButton: {
    backgroundColor: '#4caf50'
  }
});

export default FilterModal;

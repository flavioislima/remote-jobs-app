import React from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// We'll implement these components next
import Salary from './Salary';
import Tags from './Tags';

interface DescriptionProps {
  description: string;
  url: string;
  salary?: string;
  tags?: string[];
  date?: string;
  company?: string;
  position?: string;
  onClose: () => void;
}

const screenHeight = Dimensions.get('window').height;

const Description: React.FC<DescriptionProps> = ({ 
  description, 
  salary, 
  tags, 
  date, 
  company, 
  position, 
  url,
  onClose
}) => {
  // Format description by removing HTML tags and replacing special characters
  const formattedDescription: string = description
    ? description
        .replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&amp;/gm, '&')
        .replace(/&#8211;/gm, '-')
        .replace(
          /&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;|&nbsp;|&ldquo;|&rdquo;/gm,
          '"'
        )
        .trim()
    : 'Open Url for more information';

  const handleOpenUrl = () => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{position}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      {company && <Text style={styles.company}>{company}</Text>}
      
      <ScrollView style={styles.scrollContainer}>
        <Text numberOfLines={screenHeight > 600 ? 18 : 10}  style={styles.description}>
          {formattedDescription}
        </Text>
        
        {salary && <Salary salary={salary} />}
        {date && <Text style={styles.date}>Posted on: {date}</Text>}
        {tags && tags.length > 0 && <Tags tags={tags} />}
      </ScrollView>
      
      <TouchableOpacity style={styles.applyButton} onPress={handleOpenUrl}>
        <Text style={styles.applyButtonText}>Apply / View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  closeButton: {
    padding: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10
  },
  company: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15
  },
  scrollContainer: {
    flex: 1
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 15
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10
  },
  applyButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default Description;

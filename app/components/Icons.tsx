import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Using Expo's vector icons

interface IconsProps {
  isFavorite: boolean;
  url: string;
  onShare: () => void;
  onFavorite: () => void;
  onClose: () => void;
}

const iconSize = 25;
const iconColor = '#666';

const Icons: React.FC<IconsProps> = ({ 
  isFavorite, 
  url, 
  onShare,
  onFavorite,
  onClose
}) => {
  const handleOpenUrl = () => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Job Actions</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onFavorite} style={styles.iconButton}>
          <MaterialCommunityIcons
            name={isFavorite ? 'heart-broken' : 'heart'}
            size={iconSize}
            color={isFavorite ? '#f44336' : iconColor}
          />
          <Text style={styles.iconText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onShare} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="share-variant"
            size={iconSize}
            color={iconColor}
          />
          <Text style={styles.iconText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleOpenUrl} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="web"
            size={iconSize}
            color={iconColor}
          />
          <Text style={styles.iconText}>Open URL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeButton: {
    padding: 5
  },
  iconsContainer: {
    alignItems: 'center'
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0'
  },
  iconText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333'
  }
});

export default Icons;

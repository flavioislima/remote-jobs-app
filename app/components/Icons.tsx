import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Using Expo's vector icons
import { useTranslation } from 'react-i18next';

interface IconsProps {
  isFavorite: boolean;
  url: string;
  position?: string;
  onShare: () => void;
  onFavorite: () => void;
  onClose: () => void;
}

const iconSize = 25;
const iconColor = '#666';

const Icons: React.FC<IconsProps> = ({
  isFavorite,
  url,
  position,
  onShare,
  onFavorite,
  onClose
}) => {
  const { t } = useTranslation();
  const handleOpenUrl = () => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };  

  const isDesktop = Platform.OS === 'web';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{position || 'Job'}</Text>
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
          <Text style={styles.iconText}>{t(isFavorite ? 'icons.removeFromFavorites' : 'icons.addToFavorites')}</Text>
        </TouchableOpacity>

        {isDesktop ? null : <TouchableOpacity onPress={onShare} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="share-variant"
            size={iconSize}
            color={iconColor}
          />
          <Text style={styles.iconText}>{t('icons.share')}</Text>
        </TouchableOpacity>}

        <TouchableOpacity onPress={handleOpenUrl} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="web"
            size={iconSize}
            color={iconColor}
          />
          <Text style={styles.iconText}>{t('icons.openUrl')}</Text>
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
  closeButton: {
    padding: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
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

import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import JobsContext from '../context/JobsContext';
import ListJobs from '../components/ListJobs';
// import AdBanner from '../components/AdBanner';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, keys, refreshing, handleClearFavorites } = useContext(JobsContext);
  
  // Filter jobs to show only favorites
  const favs = data.filter(({ id }) => keys.includes(id));
  
  // Just force a re-render to update the UI
  const refresh = () => {};

  return (
    <View style={styles.container}>
      <ListJobs
        jobs={favs}
        navigate={router}
        refresh={refresh}
        refreshing={refreshing}
        clearFavorites={handleClearFavorites}
      />
      {favs.length > 0 && (
        <Button
          mode="outlined"
          textColor="red"
          style={styles.clearButton}
          icon="delete"
          onPress={handleClearFavorites}
        >
          {t('favorites.deleteAll')}
        </Button>
      )}
{/*       <AdBanner unitId={'FAVORITES'} size={'SMART'} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  clearButton: { 
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 10
  }
});

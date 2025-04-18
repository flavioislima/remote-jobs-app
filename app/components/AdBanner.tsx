/* import React from 'react';
import { StyleSheet, View } from 'react-native';
import { adSizes, adUnitIds } from '../constants';
import * as ExpoAds from 'expo-ads-admob';

interface AdBannerProps {
  unitId: 'JOBS' | 'SQUARE' | 'FAVORITES';
  size: 'SMART' | 'RECTANGLE' | 'SMALL';
}

const AdBanner: React.FC<AdBannerProps> = ({ size, unitId }) => {
  // Use the Expo AdMob component instead of firebase/admob
  return (
    <View style={styles[size]}>
      <ExpoAds.AdMobBanner
        adUnitID={adUnitIds[unitId]}
        servePersonalizedAds
        bannerSize={'banner'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  SMART: {
    maxHeight: 80,
    backgroundColor: '#FFF',
    alignSelf: 'center',
  },
  RECTANGLE: {
    height: 250,
    width: 300,
    alignSelf: 'center',
  },
  SMALL: {
    height: 60,
    alignSelf: 'center',
  }
});

export default AdBanner;
 */

export default <></>
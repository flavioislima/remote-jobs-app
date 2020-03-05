import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'

const unitId = 'ca-app-pub-4477713466828746/3523474164'
// const AdMobBanner = BannerAd

export default () => (
  <BannerAd
    unitId={unitId}
    size={'FULL_BANNER'}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true
    }}
    onAdLoaded={() => {
      console.log('Advert loaded');
    }}
    onAdFailedToLoad={(error) => {
      console.error('Advert failed to load: ', error);
    }}
  />
  )

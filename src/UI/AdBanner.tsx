import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'

const unitId = 'ca-app-pub-4477713466828746/3523474164'

export default () => (
  <BannerAd
    unitId={unitId}
    size={'FULL_BANNER'}
  />
  )

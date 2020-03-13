import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'

const unitId = 'ca-app-pub-4477713466828746/3523474164'

interface Props {
  size?: string
}

export default ({size = 'SMART_BANNER'}) => (
  <BannerAd
    unitId={unitId}
    size={size}
  />
  )

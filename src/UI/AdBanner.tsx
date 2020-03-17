import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'
import { View } from 'react-native'

import { adSizes, adUnitIds } from '../constants'

interface Props {
  unitId: 'JOBS' | 'SQUARE' | 'FAVORITES'
  size: 'SMART' | 'RECTANGLE'
}

const AdBanner: React.FC<Props> = ({ size, unitId }) => (
  <View style={size === 'SMART' ? { maxHeight: 80 } : {height: 250, width: 300}}>
    <BannerAd
      unitId={adUnitIds[unitId]}
      size={adSizes[size]}
      />
  </View>
  )

export default AdBanner

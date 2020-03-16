import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'
import { View } from 'react-native'

const unitId = 'ca-app-pub-4477713466828746/3523474164'
const squareUnit = 'ca-app-pub-4477713466828746/8984919217'
interface Props {
  size?: string
}

export default ({ size = 'SMART_BANNER' }) => (
  <View style={size === 'SMART_BANNER' ? { maxHeight: 80 } : {}}>
    <BannerAd
      unitId={size === 'SMART_BANNER' ? unitId : squareUnit}
      size={size}
      />
  </View>
  )

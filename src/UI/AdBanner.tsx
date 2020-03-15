import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'
import { View } from 'react-native'

const unitId = 'ca-app-pub-4477713466828746/3523474164'

interface Props {
  size?: string
}

export default ({ size = 'SMART_BANNER' }) => (
  <View style={size === 'SMART_BANNER' ? { maxHeight: 80 } : {}}>
    <BannerAd
      unitId={unitId}
      size={size}
      />
  </View>
  )

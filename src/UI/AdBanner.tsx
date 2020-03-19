import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { adSizes, adUnitIds } from '../constants'

interface Props {
  unitId: 'JOBS' | 'SQUARE' | 'FAVORITES'
  size: 'SMART' | 'RECTANGLE'
}

const AdBanner: React.FC<Props> = ({ size, unitId }) => (
  <View style={size === 'SMART' ? styles.smartBanner : styles.squareBanner}>
    <BannerAd
      unitId={adUnitIds[unitId]}
      size={adSizes[size]}
      />
  </View>
)

const styles = StyleSheet.create({
  smartBanner: {
    maxHeight: 80,
    backgroundColor: '#FFF'
  }, squareBanner: {
    height: 250,
    width: 300
  }
})

export default AdBanner

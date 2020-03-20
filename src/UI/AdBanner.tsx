import { BannerAd } from '@react-native-firebase/admob'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { adSizes, adUnitIds } from '../constants'

interface Props {
  unitId: 'JOBS' | 'SQUARE' | 'FAVORITES'
  size: 'SMART' | 'RECTANGLE' | 'SMALL'
}

const AdBanner: React.FC<Props> = ({ size, unitId }) => (
  <View style={styles[size]}>
    <BannerAd
      unitId={adUnitIds[unitId]}
      size={adSizes[size]}
      />
  </View>
)

const styles = StyleSheet.create({
  SMART: {
    maxHeight: 80,
    backgroundColor: '#FFF'
  },
  RECTANGLE: {
    height: 250,
    width: 300
  },
  SMALL: {
    marginTop: 4,
    height: 50,
    alignSelf: 'center'
  }
})

export default AdBanner

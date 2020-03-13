import React from 'react'
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import WebView from 'react-native-webview'
import AdBanner from '../UI/AdBanner'

interface Props {
  route: any
}

export default class BrowserScreen extends React.Component<Props> {
  render() {
    const { route: { params: { url } } } = this.props

    return (
      <View style={{ flex: 1 }}>
        <WebView
          javaScriptEnabled
          domStorageEnabled
          decelerationRate="normal"
          startInLoadingState
          source={{ uri: url }}
          style={{ marginVertical: 5 }}
        />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => Linking.openURL(url)}
        >
          <Text style={styles.text}>Open On External Browser</Text>
        </TouchableOpacity>
        <AdBanner size={'BANNER'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 15, fontWeight: '700', color: 'white' },
  touch: {
    height: 32,
    backgroundColor: '#1e2229',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
})

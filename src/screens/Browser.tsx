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
        <TouchableOpacity
          style={styles.touch}
          onPress={() => Linking.openURL(url)}
        >
          <Text style={styles.text}>Open On External Browser</Text>
        </TouchableOpacity>
        <WebView
          javaScriptEnabled
          domStorageEnabled
          decelerationRate="normal"
          startInLoadingState
          source={{ uri: url }}
          style={{ marginVertical: 5 }}
        />
        <AdBanner />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 16, fontWeight: '700', color: 'white' },
  touch: {
    height: 32,
    backgroundColor: '#A7C8FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
})

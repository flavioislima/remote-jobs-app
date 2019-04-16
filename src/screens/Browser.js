import React from 'react';
import {
  View,
  WebView,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet
} from 'react-native';

// import AdBanner from '../UI/AdBanner';

export default class BrowserScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('url', 'http://google.com');
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
          renderError
          decelerationRate="normal"
          startInLoadingState
          source={{ uri: url }}
          style={{ marginVertical: 5 }}
        />

        {/* <AdBanner /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 16, fontWeight: '700', color: 'white' },
  touch: {
    height: 32,
    backgroundColor: '#0dbc79',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
});

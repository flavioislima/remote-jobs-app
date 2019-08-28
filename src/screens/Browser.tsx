import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet,
  WebView
} from "react-native";
import { NavigationParams } from "react-navigation";

import AdBanner from "../UI/AdBanner";

interface Props {
  navigation: any;
}

export default class BrowserScreen extends React.Component<Props> {
  static navigationOptions: NavigationParams = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const url = navigation.getParam("url", "http://google.com");
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
    );
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 16, fontWeight: "700", color: "white" },
  touch: {
    height: 32,
    backgroundColor: "#A7C8FF",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  }
});

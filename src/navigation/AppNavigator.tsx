import React from "react";
import { Image } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import BrowserScreen from "../screens/Browser";
import TabNavigator from "./MainTabNavigator";

const BackButton = require("../assets/back.png");

const Back = <Image source={BackButton} style={{ height: 28, width: 35 }} />;

const BrowserStack = createStackNavigator({
  Browser: {
    screen: BrowserScreen
  }
});

const stackNavigator = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    navigationOptions: () => ({
      headerStyle: {
        display: "none"
      }
    })
  },
  Browser: {
    screen: BrowserStack,
    navigationOptions: () => ({
      headerTitle: "Back to Jobs Search",
      headerStyle: {
        height: 40,
        backgroundColor: "#112038"
      },
      headerTitleStyle: {
        color: "white",
        fontSize: 16
      },
      headerBackImage: Back,
      gesturesEnabled: true
    })
  }
});

export default createAppContainer(stackNavigator);

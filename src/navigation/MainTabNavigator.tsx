import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { Favorites, Jobs } from "../screens";
import Icon from "react-native-vector-icons/FontAwesome";

const JobsStack = createStackNavigator({
  Jobs
});

JobsStack.navigationOptions = {
  tabBarLabel: "All Jobs",
  tabBarIcon: () => <Icon name="globe" size={19} color="#A7C8FF" />
};

const FavoritesStack = createStackNavigator({
  Favorites
});

FavoritesStack.navigationOptions = {
  tabBarLabel: "Saved",
  tabBarIcon: () => <Icon name="heart" size={19} color="#A7C8FF" />
};

export default createBottomTabNavigator(
  {
    JobsStack,
    FavoritesStack
  },
  {
    tabBarOptions: {
      tabStyle: {
        borderLeftColor: "white",
        borderRightColor: "white",
        borderWidth: 0.5,
        borderColor: "green",
        flex: 1,
        width: "25%",
        justifyContent: "center",
        alignItems: "center"
      },
      labelStyle: {
        fontSize: 15
      },
      style: {
        backgroundColor: "#112038",
        height: 50
      },
      activeTintColor: "white",
      inactiveTintColor: "darkgray"
    }
  }
);
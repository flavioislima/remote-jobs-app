import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator'

const App = (props) => {
  props.navigationOptions = {
    header: null,
  }

  return (
    <AppNavigator />
  )
}

export default App
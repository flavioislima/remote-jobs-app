import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import GlobalState from "./src/state/GlobalState";

export default class App extends React.Component {
  render() {
    return (
      <GlobalState>
        <AppNavigator />
      </GlobalState>
    );
  }
}

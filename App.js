import React, { Component } from "react";
import { AppRegistry, Platform, StyleSheet, Text, View } from "react-native";
import Login from "./src/Components/Login";
import Home from "./src/Components/HomeScreen";

import RootController from "./src/RootController";

class DemoLogin extends Component {
  render() {
    return <RootController />;
  }
}

AppRegistry.registerComponent("DemoLogin", () => DemoLogin);

export default DemoLogin;

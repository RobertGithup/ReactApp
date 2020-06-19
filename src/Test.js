import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import CollapseView from "react-native-collapse-view";
import Collapsible from "react-native-collapsible";
import { TouchableOpacity } from "react-native-gesture-handler";

class Test extends Component {
  _renderView = (collapse) => {
    return (
      <View style={styles.view}>
        <Text>Hai</Text>
      </View>
    );
  };

  _renderTensionView = (collapse) => {
    return (
      <View style={styles.view}>
        <Text>With tension effect</Text>
      </View>
    );
  };

  _renderCollapseView = (collapse) => {
    return (
      <View style={styles.collapseView}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </Text>
      </View>
    );
  };
  state = {
    status: false,
  };
  hide() {
    coll: !this.state.coll;
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => this.setState({ status: !this.state.status })}
            style={{ width: 100, height: 100, backgroundColor: "red" }}
          ></TouchableOpacity>
        </View>
        <Collapsible collapsed={this.state.status}>
          <Text>Hai</Text>
        </Collapsible>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  view: {
    height: 50,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  collapseView: {
    height: 50,
    backgroundColor: "#ffffff",

    padding: 20,
  },
  iconView: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
});
export default Test;

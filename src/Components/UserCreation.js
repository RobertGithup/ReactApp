import React, { component } from "react";
import useState from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  CheckBox,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { height, width } = Dimensions.get("window");

class UserCreation extends Component {
  onButtonPress = () => {
    console.log("Button Clicked");
    this.props.navigation.navigate("HomeScreen");
  };
  onMenuPress() {
    this.props.navigation.openDrawer();
  }
  _onUserSwitch = () =>
    this.setState((state) => ({ isUserOn: !state.isUserOn }));
  _onSTSwitch = () => this.setState((state) => ({ isStOn: !state.isStOn }));
  _onPOSwitch = () => this.setState((state) => ({ isPoOn: !state.isPoOn }));
  _onSynchSwitch = () =>
    this.setState((state) => ({ isSyncOn: !state.isSyncOn }));

  state = {
    behavior: "position",
    isUserOn: false,
    isPoOn: false,
    isStOn: false,
    isSyncOn: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.onMenuPress()}>
            <MaterialCommunityIcons
              name="menu"
              size={35}
              style={{ paddingLeft: 10, color: "black" }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>User Creation</Text>
        </View>
        <View style={styles.bodycontainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="UserName"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Warehouse"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ warehouse: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No1"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ IMEINo1: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No2"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ IMEINo2: text })}
            />
          </View>
        </View>
        <View style={styles.checkboxRowContainer}>
          <View style={styles.checkboxContainer}>
            <Switch
              value={this.state.isPoOn}
              onValueChange={this._onPOSwitch}
              trackColor={{
                true: "#861F41",
                false: "gray",
              }}
              thumbColor="#861F41"
            />
            <Text style={styles.label}>PO</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              value={this.state.isStOn}
              onValueChange={this._onSTSwitch}
              trackColor={{
                true: "#861F41",
                false: "gray",
              }}
              thumbColor="#861F41"
            />
            <Text style={styles.label}>ST</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Switch
              value={this.state.isUserOn}
              onValueChange={this._onUserSwitch}
              trackColor={{
                true: "#861F41",
                false: "gray",
              }}
              thumbColor="#861F41"
            />
            <Text style={styles.label}>Lock User</Text>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.onButtonPress}
          >
            <Text style={styles.loginText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.onButtonPress}
          >
            <Text style={styles.loginText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bodycontainer: {
    marginTop: 20,
  },
  bottomcontainer: {
    flexDirection: "row",
    marginLeft: 10,
    bottom: 0,
    left: 0,
    width: "100%",
  },
  checkboxRowContainer: { flexDirection: "row" },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
    // alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#861F41",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    paddingLeft: 10,
  },
  label: {
    color: "black",
  },
  inputView: {
    width: "90%",
    borderWidth: 1,
    marginLeft: 20,
    height: 30,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    borderColor: "#A9A9A9",
  },
  inputText: {
    height: 50,
    color: "black",
  },

  loginText: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "#861F41",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
});
export default UserCreation;

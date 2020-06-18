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
  _onToggleSwitch = () =>
    this.setState((state) => ({ isSwitchOn: !state.isSwitchOn }));

  state = {
    behavior: "position",
    isSwitchOn: false,
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
          <View style={styles.checkboxContainer}>
            <CheckBox
              // value={isSelected}
              //  onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Lock User</Text>
          </View>
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
              value={this.state.isSwitchOn}
              onValueChange={this._onToggleSwitch}
              trackColor={{
                true: "#861F41",
                false: "#861F41",
              }}
            />
            <Text style={styles.label}>ST</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              // value={isSelected}
              //  onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>ST</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              // value={isSelected}
              //  onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Sync</Text>
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
    alignItems: "center",
  },
  bottomcontainer: {
    flexDirection: "row",
    //position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  checkboxRowContainer: { flexDirection: "row" },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 50,
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
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
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

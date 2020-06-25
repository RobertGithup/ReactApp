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
  constructor(props) {
    super(props);
    this.state = UserCreation.initialState;
  }
  static initialState = {
    behavior: "position",
    isUserOn: false,
    isPoOn: false,
    isStOn: false,
    isSyncOn: false,
    userId: "",
    userName: "",
    password: "",
    warehouse: "",
    IMEINo1: "",
    IMEINo2: "",
    PO: "",
    ST: "",
    Lock: "",
    data: "",
  };
  onCancelPress = () => {
    this.setState({
      behavior: "position",
      isUserOn: false,
      isPoOn: false,
      isStOn: false,
      isSyncOn: false,
      userId: "",
      userName: "",
      password: "",
      warehouse: "",
      IMEINo1: "",
      IMEINo2: "",
      PO: "",
      ST: "",
      Lock: "",
      data: "",
    });
    this.props.navigation.navigate("HomeScreen");
  };
  onButtonPress = () => {
    fetch(global.HttpLink + "Master/NewUser", {
      method: "POST",
      body: JSON.stringify({
        userName: this.state.userName,
        PassWord: this.state.password,
        warehouse: this.state.warehouse,
        IMEINo1: this.state.IMEINo1,
        IMEINo2: this.state.IMEINo2,
        PO: this.state.PO,
        ST: this.state.ST,
        Lock: this.state.Lock,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        });
        if (this.state.data.status == 0) {
          return alert(this.state.data.message);
        } else {
          return alert("User Created Successfully");
          this.state = UserCreation.initialState;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onMenuPress() {
    this.props.navigation.openDrawer();
  }

  _onUserSwitch = () => {
    if (this.state.isUserOn == true) {
      this.setState((state) => ({
        isUserOn: false,
        Lock: "N",
      }));
    } else {
      this.setState((state) => ({
        isUserOn: true,
        Lock: "Y",
      }));
    }
  };

  _onSTSwitch = () => {
    if (this.state.isStOn == true) {
      this.setState((state) => ({
        isStOn: false,
        ST: "N",
      }));
    } else {
      this.setState((state) => ({
        isStOn: true,
        ST: "Y",
      }));
    }
  };

  _onPOSwitch = () => {
    if (this.state.isPoOn == true) {
      this.setState((state) => ({
        isPoOn: false,
        PO: "N",
      }));
    } else {
      this.setState((state) => ({
        isPoOn: true,
        PO: "Y",
      }));
    }
  };
  selectUser = () => {
    fetch(
      global.HttpLink + "Master/GetUserProfile?UserId=" + this.state.userName,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        });

        if (this.state.data.userName == "") {
          return alert("UserName Not Found");
        } else {
          this.setState({
            userName: this.state.data.userName,
            password: this.state.data.PassWord,
            warehouse: this.state.data.WareHouse,
            IMEINo1: this.state.data.IMEINO1,
            IMEINo2: this.state.data.IMEINO2,
            isStOn: true,
          });
          if (this.state.data.ST == "Y") {
            this.setState((state) => ({
              isStOn: true,
            }));
          } else {
            this.setState((state) => ({
              isStOn: false,
            }));
          }

          if (this.state.data.PO == "Y") {
            this.setState((state) => ({
              isPoOn: true,
            }));
          } else {
            this.setState((state) => ({
              isPoOn: true,
            }));
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.onMenuPress()}>
            <MaterialCommunityIcons
              name="menu"
              size={35}
              style={{ paddingLeft: 10, color: "white" }}
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
              onChangeText={(text) => this.setState({ userName: text })}
              onSubmitEditing={() => this.selectUser()}
              value={this.state.userName}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Warehouse"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ warehouse: text })}
              value={this.state.warehouse}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No1"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ IMEINo1: text })}
              value={this.state.IMEINo1}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No2"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ IMEINo2: text })}
              value={this.state.IMEINo2}
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
            onPress={this.onCancelPress}
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
    alignItems: "center",
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

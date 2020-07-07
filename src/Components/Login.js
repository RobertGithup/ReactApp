import React, { component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Component } from "react";
import AntIcons from "react-native-vector-icons/AntDesign";
import MatIcon from "react-native-vector-icons/MaterialIcons";

class Login extends Component {
  state = {
    userId: "",
    userName: "",
    password: "",
    data: "",
    DeviceIMEI: "",
  };
  // getDeviceIMEI = () => {
  //   const IMEI = require("react-native-imei");
  //   IMEI.getImei().then((imeiList) => {
  //     console.log(imeiList); // prints ["AABBBBBBCCCCCCD"]
  //   });

  //   return alert(this.state.DeviceIMEI);
  // };

  onButtonPress = () => {
    if (this.state.userName == "") {
      return alert("User Name shoule Not be empty");
    }
    if (this.state.password == "") {
      return alert("Password shoule Not be empty");
    }

    fetch(
      global.HttpLink +
        "Master/ExsistingUser?UserName=" +
        this.state.userName +
        "&PassWord=" +
        this.state.password +
        "&IMEINo1=1" +
        "&IMEINo2=1",
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        });
        if (this.state.data.status == 1) {
          this.setState({
            userId: this.state.data.status,
          });
          this.props.navigation.navigate("HomeScreen");
        } else {
          // this.props.navigation.navigate("HomeScreen");
          return alert(this.state.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bodycontainer}>
          <View style={styles.header}>
            <Text style={styles.headertext}>Sign In</Text>
          </View>
          <View style={styles.inputView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntIcons
                name="user"
                onPress={() => {
                  this.onItemScanClick(item[1], item[2]);
                }}
                style={{
                  color: "gray",
                }}
                size={25}
              />
              <TextInput
                style={styles.inputText}
                placeholder="UserName..."
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ userName: text })}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MatIcon
                name="lock-outline"
                onPress={() => {
                  this.onItemScanClick(item[1], item[2]);
                }}
                style={{
                  color: "gray",
                }}
                size={25}
              />
              <TextInput
                style={styles.inputText}
                secureTextEntry={true}
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.onButtonPress}
          >
            <Text style={styles.loginText}>LOGIN</Text>
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

    justifyContent: "center",
  },
  header: {
    marginBottom: 30,
    marginLeft: 30,
  },
  headertext: {
    color: "#861F41",
    fontSize: 30,
  },
  bodycontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderColor: "#A9A9A9",
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginText: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#861F41",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});
export default Login;

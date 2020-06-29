import React, { component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Component } from "react";

class Login extends Component {
  onButtonPress = () => {
    if (this.state.userName == "") {
      return alert("User Name shoule Not be empty");
    }
    if (this.state.password == "") {
      return alert("Password shoule Not be empty");
    }

    this.props.navigation.navigate("HomeScreen");
  };
  state = {
    userId: "",
    userName: "",
    password: "",
    data: "",
  };
  onButtonPress = () => {
    fetch(
      global.HttpLink +
        "Master/ExsistingUser?UserName=" +
        this.state.userName +
        "&PassWord=" +
        this.state.password,
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
            <TextInput
              style={styles.inputText}
              placeholder="UserName..."
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ userName: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              placeholder="Password..."
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ password: text })}
            />
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

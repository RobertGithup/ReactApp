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
  FlatList,
} from "react-native";
import { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";

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
    branch: "",
    iMEINo1: "",
    iMEINo2: "",
    PO: "",
    ST: "",
    Lock: "",
    data: "",
    user: [],

    option: "",
  };

  componentDidMount = () => {
    fetch(global.HttpLink + "Master/GetAllUser", {
      method: "GET",
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

        this.state.data.map((item) => {
          this.setState((state) => {
            state.user.push([
              this.state.user.length + 1,
              item.userName,
              item.PassWord,
              item.WareHouse,
              item.IMEINO1,
              item.IMEINO2,
              item.PO,
              item.ST,
              item.Lock,
            ]);
          });
        });
        this.setState({
          user: this.state.user,
        });
        //   return alert(JSON.stringify(this.state.user));
      })
      .catch((error) => {
        console.error(error);
      });
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
      iMEINo1: "",
      iMEINo2: "",
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
        IMEINo1: this.state.iMEINo1,
        IMEINo2: this.state.iMEINo2,
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
          this.setState({
            userName: "",
            password: "",
            iMEINo1: "",
            iMEINo2: "",
            branch: "",
          });
          return alert("User Created Successfully");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onUpdatePress = () => {
    fetch(global.HttpLink + "Master/Updateuser", {
      method: "POST",
      body: JSON.stringify({
        userName: this.state.userName,
        PassWord: this.state.password,
        warehouse: this.state.warehouse,
        IMEINo1: this.state.iMEINo1,
        IMEINo2: this.state.iMEINo2,
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
          this.setState({
            userName: "",
            password: "",
            iMEINo1: "",
            iMEINo2: "",
            branch: "",
          });
          return alert("User Updated Successfully");
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
  onUserAddClick = () => {
    this.setState({
      userName: "",
      password: "",
      iMEINo1: "",
      iMEINo2: "",
      branch: "",
      option: "Add",
    });
  };
  onUserUpdateClick = (item) => {
    //  return alert(item[4]);
    this.setState({
      userName: item[1],
      password: item[2],
      branch: item[3],
      iMEINo1: item[4],
      iMEINo2: item[5],
      isPoOn: false,
      isStOn: false,
      isUserOn: false,
      option: "Update",
    });
    if (item[6] == "Y") {
      this.setState({ isPoOn: true });
    }
    if (item[7] == "Y") {
      this.setState({ isStOn: true });
    }
    if (item[8] == "Y") {
      this.setState({ isUserOn: true });
    }
  };
  onUserBackClick = () => {
    this.setState({ option: "" });
  };
  renderFlatList() {
    return (
      <View>
        <MatIcons
          name="add-circle-outline"
          onPress={() => {
            this.onUserAddClick();
          }}
          style={{
            marginLeft: 20,
            marginTop: 5,
            color: "black",
          }}
          size={40}
        />
        <FlatList
          scrollEnabled={true}
          data={this.state.user}
          extraData={this.state}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={styles.flatlistContainer}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.flatlisttext}>{item[1]}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 1,
                  }}
                >
                  <MatIcons
                    name="edit"
                    onPress={() => {
                      this.onUserUpdateClick(item);
                    }}
                    style={{
                      marginRight: 20,
                      marginTop: 5,
                    }}
                    size={25}
                  />
                </View>
              </View>

              <View style={{ marginLeft: 20 }}>
                <Text> {item[3]}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  render() {
    return (
      <StickyHeaderFooterScrollView
        makeScrollable={true}
        renderStickyHeader={() => (
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.onMenuPress()}>
              <MaterialCommunityIcons
                name="menu"
                size={35}
                style={{ paddingLeft: 10, color: "white" }}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>USER</Text>
          </View>
        )}
        renderStickyFooter={() => <View></View>}
      >
        <View style={styles.bodycontainer}>
          {this.state.option == "" && <View>{this.renderFlatList()}</View>}
          {this.state.option == "Add" && <View>{this.renderUseradd()}</View>}
          {this.state.option == "Update" && (
            <View>{this.renderUserupdate()}</View>
          )}
        </View>
      </StickyHeaderFooterScrollView>
    );
  }
  renderUseradd() {
    return (
      <View>
        <AntDesign
          name="left"
          onPress={() => {
            this.onUserBackClick();
          }}
          style={{
            marginLeft: 20,
            marginTop: 5,
            color: "black",
          }}
          size={30}
        />
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
              placeholder="Branch"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ branch: text })}
              value={this.state.warehouse}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No1"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ iMEINo1: text })}
              value={this.state.iMEINo1}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No2"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ iMEINo2: text })}
              value={this.state.iMEINo2}
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
  renderUserupdate() {
    return (
      <View>
        <AntDesign
          name="left"
          onPress={() => {
            this.onUserBackClick();
          }}
          style={{
            marginLeft: 20,
            marginTop: 5,
            color: "black",
          }}
          size={30}
        />
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
              placeholder="Branch"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ branch: text })}
              value={this.state.branch}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No1"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ iMEINo1: text })}
              value={this.state.iMEINo1}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="IMEI No2"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ iMEINo2: text })}
              value={this.state.iMEINo2}
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
            onPress={this.onUpdatePress}
          >
            <Text style={styles.loginText}>Update</Text>
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
  flatlistContainer: {
    marginBottom: 5,
    marginTop: 5,

    flex: 1,
    borderColor: "#A9A9A9",
    borderBottomWidth: 1,
  },
  flatlisttext: {
    marginTop: 5,
    fontSize: 17,
    marginLeft: 20,

    color: "black",
  },
});
export default UserCreation;

import React, { component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  CheckBox,
  FlatList,
  Calendar,
  Alert,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-datepicker";

import { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcons from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";
import Collapsible from "react-native-collapsible";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
arrItem = [];

class Grpo extends Component {
  onButtonPress = () => {
    console.log("Button Clicked");
    this.props.navigation.navigate("HomeScreen");
  };
  onMenuPress() {
    this.props.navigation.openDrawer();
  }
  toggleModal() {
    isModalVisible = true;
  }
  PoSelection() {}

  onAddItmes = () => {
    fetch(
      global.HttpLink +
        "Transaction/GetPO?PONum=4500009770" +
        this.state.PoNumber,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        });
        return alert(this.state.data.PONum);
        //  return alert(JSON.stringify(responseJson.get()));
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState((state) => {
      const list = state.arrItem.push([2, "Item1"]);
      return {
        list,
      };
    });
  };
  onAddSerialNo = () => {
    this.setState((state) => {
      const list = state.arrSerial.push([2, this.state.serialNo]);

      return {
        list,
      };
    });
  };
  state = {
    date: "2016-05-15",
    isModalVisible: false,
    status: true,
    modelItemDesc: "",
    arrSerial: [],
    serialNo: "",
    arrItem: [],
    PoNumber: "",
    VendorName: "",
    data: "",
  };

  constructor(props) {
    super(props);
  }
  renderFlatList() {
    return (
      <View>
        <FlatList
          scrollEnabled={true}
          data={this.state.arrItem}
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
                  <AntIcons
                    name="scan1"
                    onPress={() => {
                      this.setState({
                        isModalVisible: true,
                        modelItemDesc: item[1],
                      });
                    }}
                    style={{ marginRight: 10, marginTop: 5 }}
                    size={25}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 10 }}>
                  <Text>Receipt 0/5</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
  renderModelFlatList() {
    return (
      <View>
        <FlatList
          scrollEnabled={true}
          data={this.state.arrSerial}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.modelflatlistContainer}>
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
                ></View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
  render() {
    const state = this.state;

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
            <Text style={styles.headerText}>GRN</Text>
          </View>
        )}
        renderStickyFooter={() => <View></View>}
      >
        <View style={styles.bodycontainer}>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isModalVisible}
          >
            <ScrollView
              style={{ flex: 1 }}
              scrollEnabled={true}
              makeScrollable={true}
              keyboardShouldPersistTaps="always"
            >
              <View style={styles.modal}>
                <View style={styles.header}>
                  <Text style={styles.modelheaderText}>Serial Number</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <TextInput
                    value={this.state.modelItemDesc}
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      paddingLeft: 10,
                      color: "black",
                    }}
                  ></TextInput>
                </View>
                <View style={styles.modelBodyContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.singleinputViewIcon}>
                      <TextInput
                        style={styles.inputText}
                        placeholder="Scan"
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) =>
                          this.setState({ serialNo: text })
                        }
                      />
                    </View>
                    <AntIcons
                      name="scan1"
                      onPress={this.onAddSerialNo}
                      style={{ marginRight: 10, marginTop: 5 }}
                      size={25}
                    />
                  </View>
                  <View style={styles.menuContainer}>
                    {this.renderModelFlatList()}
                  </View>
                  <TouchableOpacity
                    style={styles.modelbutton}
                    onPress={() => {
                      this.setState({
                        isModalVisible: !this.state.isModalVisible,
                      });
                    }}
                  >
                    <Text>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Modal>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.singleinputViewIcon}>
              <TextInput
                style={styles.inputText}
                placeholder="PO Number"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ PoNumber: text })}
                onSubmitEditing={() => this.onAddItmes()}
                value={this.state.PoNumber}
              />
            </View>
            <MaterialIcons
              name="expand-more"
              size={35}
              style={{ paddingLeft: 10, color: "black" }}
              status
              onPress={() => this.setState({ status: !this.state.status })}
            />
          </View>

          <Collapsible collapsed={this.state.status}>
            <View style={styles.doubleinputContainer}>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Vendor Name"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                />
              </View>

              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Invoice Date"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                />
              </View>
            </View>

            <View style={styles.doubleinputContainer}>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Invoice No"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                />
              </View>

              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Invoice Date"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                />
              </View>
            </View>
            <View style={styles.doubleinputContainer}>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Vechicle No"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                />
              </View>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Storage Location"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ IMEINo1: text })}
                />
              </View>
            </View>
            <View style={styles.doubleinputContainer}>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Moment Type"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                />
              </View>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Movement Indicator"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ IMEINo1: text })}
                />
              </View>
            </View>
          </Collapsible>
          <View style={styles.tablecontainer}>
            <View style={styles.menuContainer}>{this.renderFlatList()}</View>
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
      </StickyHeaderFooterScrollView>
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
  bodycontainer: {
    marginTop: 20,
    // alignItems: "center",
  },
  bottomcontainer: {
    flexDirection: "row",
    position: "relative",
    marginLeft: 10,
    bottom: 0,
    left: 0,
    width: "100%",
    marginTop: 0,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 50,
    alignItems: "center",
  },
  flatlistContainer: {
    marginBottom: 5,
    marginTop: 5,

    flex: 1,
    borderColor: "#A9A9A9",
    borderBottomWidth: 1,
  },
  modelflatlistContainer: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderColor: "#A9A9A9",
    borderBottomWidth: 1,
  },
  flatlisttext: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
  },
  doubleinputContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  tablecontainer: {
    width: "90%",
    padding: 16,
    paddingTop: 10,
    //backgroundColor: "#fff",
  },
  head: { height: 40, backgroundColor: "#861F41" },
  text: { margin: 6, color: "#f1f8ff" },
  checkbox: {
    marginRight: 20,
    // alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#861F41",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    paddingLeft: 10,
    color: "white",
  },
  modelheaderText: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 10,
    color: "white",
  },
  label: {
    color: "white",
  },
  singleinputView: {
    width: "90%",
    borderWidth: 1,
    marginLeft: 20,
    height: 30,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    borderColor: "#A9A9A9",
  },
  singleinputViewIcon: {
    width: "80%",
    borderWidth: 1,
    marginLeft: 20,
    height: 30,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    borderColor: "#A9A9A9",
  },
  doubleinputView: {
    width: "45%",
    borderWidth: 1,

    marginLeft: 10,
    height: 30,
    marginBottom: 5,
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
  Scan: {
    width: 100,

    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,

    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    height: 500,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    marginTop: 80,
    marginLeft: 40,
  },
  modelBodyContainer: {
    marginTop: 10,
  },
  modelbutton: {
    width: "40%",
    backgroundColor: "#861F41",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
});
export default Grpo;

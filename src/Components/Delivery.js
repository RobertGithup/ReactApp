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
  ScrollView,
  Calendar,
} from "react-native";
import DatePicker from "react-native-datepicker";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcons from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";
import Collapsible from "react-native-collapsible";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const arrMenu = [
  { id: 0, name: "Item1" },
  {
    id: 1,
    name: "Item2",
  },
  {
    id: 2,
    name: "Item3",
  },

  { id: 3, name: "Item4" },
  { id: 4, name: "Item5" },
  { id: 5, name: "Item6" },
  { id: 6, name: "Item7" },
];

class Delivery extends Component {
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
  state = {
    date: "2016-05-15",
    isModalVisible: false,
    Collapsestatus: true,
  };

  constructor(props) {
    super(props);
  }
  renderFlatList() {
    return (
      <View>
        <FlatList
          scrollEnabled={true}
          scr
          data={arrMenu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.flatlistContainer}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.flatlisttext}>{item.name}</Text>
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
            <Text style={styles.headerText}>Delivery</Text>
          </View>
        )}
        renderStickyFooter={() => <View></View>}
      >
        <View style={styles.bodycontainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.singleinputViewIcon}>
              <TextInput
                style={styles.inputText}
                placeholder="Deliver Number"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <MaterialIcons
              name="expand-more"
              size={35}
              style={{ paddingLeft: 10, color: "black" }}
              onPress={() =>
                this.setState({ Collapsestatus: !this.state.Collapsestatus })
              }
            />
          </View>

          <Collapsible collapsed={this.state.Collapsestatus}>
            <View style={styles.doubleinputContainer}>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Supplying Site"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                />
              </View>

              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Delivery Date"
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
  flatlisttext: {
    marginTop: 5,
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
});
export default Delivery;

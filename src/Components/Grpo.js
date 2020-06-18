import React, { component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  CheckBox,
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
import Modal from "react-native-modal";
const { height, width } = Dimensions.get("window");

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
  state = {
    tableHead: ["Description", "PO Qty", "GRN Qty"],
    tableData: [
      ["1", "2", "3"],
      ["a", "b", "c"],
    ],
    date: "2016-05-15",
    isModalVisible: false,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const state = this.state;
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
          <Text style={styles.headerText}>GRN</Text>
        </View>
        <View style={styles.bodycontainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="PO Number"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Vendor Name"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>
          <View style={styles.textcontainer}>
            <View style={styles.inputContainerView}>
              <TextInput
                style={styles.inputText}
                placeholder="Invoice No"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ warehouse: text })}
              />
            </View>

            <View style={styles.inputContainerView}>
              <DatePicker
                style={{ width: 140 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({ date: date });
                }}
              />
            </View>
          </View>
          <View style={styles.textcontainer}>
            <View style={styles.inputContainerView}>
              <TextInput
                style={styles.inputText}
                placeholder="Vechicle No"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ warehouse: text })}
              />
            </View>
            <View style={styles.inputContainerView}>
              <TextInput
                style={styles.inputText}
                placeholder="Location"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ IMEINo1: text })}
              />
            </View>
          </View>
          <View style={styles.textcontainer}>
            <View style={styles.inputContainerView}>
              <TextInput
                style={styles.inputText}
                placeholder="Moment Type"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ warehouse: text })}
              />
            </View>
            <View style={styles.inputContainerView}>
              <TextInput
                style={styles.inputText}
                placeholder="Indicator"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ IMEINo1: text })}
              />
            </View>
          </View>

          <View style={styles.tablecontainer}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={state.tableData} textStyle={styles.text} />
            </Table>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.ItemSelectionbtn}
            onPress={this.onButtonPress}
          >
            <Text style={styles.loginText}>Item Select</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomcontainer}>
          {/* <TouchableOpacity
            style={styles.loginBtn}
            title="Show modal"
            onPress={this.toggleModal}
          />

          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 }}>
              <Text>Hello!</Text>

              <TouchableOpacity title="Hide modal" onPress={this.toggleModal} />
            </View>
          </Modal> */}
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
    position: "relative",
    // justifyContent: "center",
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
  textcontainer: {
    flexDirection: "row",
    justifyContent: "center",
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
  inputView: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputContainerView: {
    width: "40%",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 5,
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
  ItemSelectionbtn: {
    width: "30%",
    backgroundColor: "#861F41",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
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
export default Grpo;

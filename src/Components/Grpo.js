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
  TouchableOpacityBase,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { Header } from "react-navigation";
import { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcons from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";
import Collapsible from "react-native-collapsible";
import { RNCamera } from "react-native-camera";
import FloatLabelTextInput from "react-native-floating-label-text-input";
import { YellowBox } from "react-native";
//import Autocomplete from "react-native-autocomplete-input";
// import { openDatabase } from "react-native-sqlite-storage";
// var db = openDatabase({ name: "GrnDatabase.db" });
YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

class Grpo extends Component {
  onButtonPress = () => {
    this.props.navigation.navigate("HomeScreen");
  };
  onMenuPress() {
    this.props.navigation.openDrawer();
  }
  onItemScanClick(LineNo, ItemNo, Qty) {
    let filteredArray = this.state.arrSerialAll.filter(
      (item) => item[1] == ItemNo
    );
    this.setState({
      isModalVisible: true,
      modleLineNo: LineNo,
      modelItemDesc: ItemNo,
      modelItemQty: Qty,
      arrSerial: filteredArray,
      modelItemScanned: filteredArray.length,
    });
  }

  onAddItmes = () => {
    fetch(global.HttpLink + "Transaction/GetPO?PONum=" + this.state.PoNumber, {
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
        if (responseJson.length > 0) {
          this.setState({
            VendorName: this.state.data[0].VendorCode,
            arrItem1: [],
          });
          this.state.data[0].item.map((item) => {
            this.setState((state) => {
              state.arrItem1.push([item.LineId, item.ArtDesc, item.POQty, 0]);
            });
          });
          this.setState({
            arrItem: this.state.arrItem1,
          });
          // db.transaction(function (txn) {
          //   txn.executeSql(
          //     "INSERT INTO table_grpo (user_name, user_contact, user_address) VALUES (?,?,?)",
          //     [user_name, user_contact, user_address],
          //     (tx, results) => {
          //       console.log("Results", results.rowsAffected);
          //       if (results.rowsAffected > 0) {
          //         Alert.alert("Success");
          //       } else {
          //         alert("Registration Failed");
          //       }
          //     }
          //   );
          // });
        } else {
          return alert("No Data Found For Selected PO Number");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onSelectSerialNo(sSerialNo) {
    if (
      parseInt(this.state.modelItemScanned, 10) ==
      parseInt(this.state.modelItemQty, 10)
    ) {
      return alert("Scanned Qty Should Exceed Actual Qty");
    }
    let filteredArray = this.state.arrSerial.filter(
      (item) => item[2] == sSerialNo
    );
    if (filteredArray.length == 0) {
      this.setState((state) => {
        const list = state.arrSerial.push([
          this.state.arrSerial.length + 1,
          this.state.modelItemDesc,
          sSerialNo,
        ]);
        this.setState({
          serialNo: "",
          modelItemScanned: this.state.arrSerial.length,
        });
        return {
          list,
        };
      });
    }
  }
  onAddSerialNo = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
    let filteredArray = this.state.arrSerialAll.filter(
      (item) => item[1] !== this.state.modelItemDesc
    );
    let newArray = filteredArray.concat(this.state.arrSerial);

    this.setState({ arrSerialAll: newArray });

    const index = this.state.arrItem.findIndex(
      (item) => item[0] == this.state.modleLineNo
    );
    let arrItem1 = this.state.arrItem;
    arrItem1[index] = [
      this.state.modleLineNo,
      this.state.modelItemDesc,
      this.state.modelItemQty,
      this.state.modelItemScanned,
    ];
    this.setState({
      arrItem: arrItem1,
    });
  };
  removeSerialNo(SerialNo) {
    let filteredArray = this.state.arrSerial.filter(
      (item) => item[2] !== SerialNo
    );
    this.setState({
      arrSerial: filteredArray,
      modelItemScanned: filteredArray.length,
    });
  }
  showCameraView = () => {
    this.setState({ isCameraVisible: true });
  };
  HideCameraView = () => {
    this.setState({ isCameraVisible: false });
  };
  onBarCodeRead = (e) => {
    this.onSelectSerialNo(e.data);
    return alert("Barcode value is" + e.data, "Barcode type is" + e.type);
  };
  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach((barcode) => console.warn(barcode.data));
  };
  state = {
    date: "",
    postingdate: "",
    isModalVisible: false,
    status: true,
    modleLineNo: "",
    modelItemDesc: "",
    modelItemQty: "",
    modelItemScanned: "",
    arrSerial: [],
    arrSerialAll: [],
    serialNo: "",
    arrItem: [],

    PoNumber: "",
    VendorName: "",
    data: "",
    isCameraVisible: false,
  };

  constructor(props) {
    super(props);
    // db.transaction(function (txn) {
    //   txn.executeSql(
    //     "SELECT name FROM sqlite_master WHERE type='table' AND name='table_grpo'",
    //     [],
    //     function (tx, res) {
    //       console.log("item:", res.rows.length);
    //       if (res.rows.length == 0) {
    //         txn.executeSql("DROP TABLE IF EXISTS table_grpo", []);
    //         txn.executeSql("DROP TABLE IF EXISTS table_rpo1", []);
    //         txn.executeSql(
    //           "CREATE TABLE IF NOT EXISTS table_grpo(GrnNo INTEGER PRIMARY KEY AUTOINCREMENT, PONumber INTEGER,  VendorName VARCHAR(255))",
    //           "CREATE TABLE IF NOT EXISTS table_rpo1(GrnNo INTEGER , LineId INTEGER ,POQty INTEGER, PartNo VARCHAR(100), PartDesc VARCHAR(255))",
    //           []
    //         );
    //       }
    //     }
    //   );
    // });
  }
  renderFlatList() {
    return (
      <View>
        <FlatList
          scrollEnabled={true}
          data={this.state.arrItem}
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
                  <AntIcons
                    name="scan1"
                    onPress={() => {
                      this.onItemScanClick(item[0], item[1], item[2]);
                    }}
                    style={{
                      marginRight: 20,
                      marginTop: 5,
                      color: "black",
                    }}
                    size={25}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 20 }}>
                  <Text>
                    Receipt {item[3]}/{item[2]}
                  </Text>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    style={{ marginLeft: 20, color: "black" }}
                    onPress={() => {
                      this.removeSerialNo(item[2]);
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.flatlisttext}>{item[2]}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
  renderModel() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isModalVisible}
        style={styles.modal}
      >
        <StickyHeaderFooterScrollView
          makeScrollable={true}
          renderStickyHeader={() => (
            <View style={styles.header}>
              <Text style={styles.headerText}>Serial Number</Text>
            </View>
          )}
          renderStickyFooter={() => (
            <TouchableOpacity
              style={styles.modelbutton}
              onPress={() => this.onAddSerialNo()}
            >
              <Text style={styles.loginText}>OK</Text>
            </TouchableOpacity>
          )}
        >
          <View>
            <View
              style={{
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                flexDirection: "row",
              }}
            >
              <View>
                <Text style={styles.ModelDescText}>
                  {this.state.modelItemDesc}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.ModelDescText}>
                  {this.state.modelItemScanned}/{this.state.modelItemQty}
                </Text>
                <MaterialCommunityIcons
                  name="camera"
                  size={20}
                  style={{ marginLeft: 20, color: "black" }}
                  onPress={() => {
                    this.showCameraView();
                  }}
                />
              </View>
            </View>
            <View style={styles.modelBodyContainer}>
              <View style={styles.singleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Scan"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ serialNo: text })}
                  onSubmitEditing={() =>
                    this.onSelectSerialNo(this.state.serialNo)
                  }
                  value={this.state.serialNo}
                />
              </View>
              <View>{this.renderModelFlatList()}</View>
            </View>
          </View>
        </StickyHeaderFooterScrollView>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isCameraVisible && (
          <View style={styles.container}>
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style={{
                flex: 1,
                width: "100%",
                height: "50%",
              }}
              onBarCodeRead={this.onBarCodeRead}
              onGoogleVisionBarcodesDetected={this.barcodeRecognized}
            ></RNCamera>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={this.HideCameraView}
              ></TouchableOpacity>
            </View>
          </View>
        )}
        {!this.state.isCameraVisible && <View>{this.renderMain()}</View>}
      </View>
    );
  }
  renderMain() {
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
        renderStickyFooter={() => (
          <View>
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
        )}
      >
        <View>{this.renderModel()}</View>

        <View style={styles.bodycontainer}>
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
            <View style={styles.singleinputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Vendor Name"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ warehouse: text })}
                value={this.state.VendorName}
              />
            </View>
            <View style={styles.doubleinputContainer}>
              <View style={styles.doubleinputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="GIN No"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                  value={this.state.GinNo}
                />
              </View>

              <View style={styles.doubleinputView}>
                <DatePicker
                  style={{ width: 150, height: 50, backgroundcolor: "#3e82cf" }}
                  date={this.state.postingdate}
                  mode="date"
                  placeholder="Posting date"
                  format="YYYY-MM-DD"
                  minDate="2020-05-01"
                  maxDate="2025-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      left: 0,
                      position: "absolute",
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 30,
                      borderWidth: 0,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    this.setState({ postingdate: date });
                  }}
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
                <DatePicker
                  style={{ width: 150, height: 50, backgroundcolor: "#3e82cf" }}
                  date={this.state.date}
                  mode="date"
                  placeholder="Invoice date"
                  format="YYYY-MM-DD"
                  minDate="2020-05-01"
                  maxDate="2025-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      left: 0,
                      position: "absolute",
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 30,
                      borderWidth: 0,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    this.setState({ date: date });
                  }}
                />
                {/* <TextInput
                  style={styles.inputText}
                  placeholder="Invoice Date"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ warehouse: text })}
                /> */}
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
          <View>
            <View>{this.renderFlatList()}</View>
          </View>
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
    flex: 1,
    borderColor: "#A9A9A9",
    borderBottomWidth: 1,
    marginTop: 5,
  },
  Modelflatlisttext: {
    marginTop: 5,

    marginLeft: 2,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
  },
  flatlisttext: {
    marginTop: 5,
    fontSize: 17,
    marginLeft: 10,

    color: "black",
    paddingLeft: 10,
  },
  doubleinputContainer: {
    flexDirection: "row",
    marginLeft: 10,
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

  ModelDescText: {
    fontSize: 15,
    fontWeight: "bold",

    color: "black",
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
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
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
  cameraButton: {
    borderColor: "#861F41",
    borderWidth: 2,
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    marginTop: 10,
    marginBottom: 10,
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
    // height: screenHeight - 200,
    // width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    //marginTop: 80,
    // marginLeft: 40,
    flex: 1,
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

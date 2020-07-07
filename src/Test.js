import { RNCamera } from "react-native-camera";
import React, { component } from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FloatLabelTextInput from "react-native-floating-label-text-input";

class Test extends Component {
  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach((barcode) => console.warn(barcode.data));
  };
  onBarCodeRead = (e) => {
    return alert("Barcode value is" + e.data, "Barcode type is" + e.type);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10, flex: 0.1 }}>
          <FloatLabelTextInput placeholder="UserName" value="" />
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
  view: {
    height: 50,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  collapseView: {
    height: 50,
    backgroundColor: "#ffffff",

    padding: 20,
  },
  iconView: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
});
export default Test;

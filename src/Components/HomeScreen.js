import React from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Component } from "react";

const { height, width } = Dimensions.get("window");

class Home extends Component {
  sendToFoodListScreen(index) {
    let food = foods[index];
    this.props.navigation.navigate("FoodList", { title: food.title });
  }
  render() {
    return (
      <View>
        <StatusBar barStyle="default" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.onMenuPress()}>
              <MaterialCommunityIcons
                name="menu"
                size={35}
                style={{ paddingLeft: 10, color: "white" }}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Home</Text>
          </View>
        </View>
      </View>
    );
  }

  onMenuPress() {
    this.props.navigation.openDrawer();
  }
}

const styles = {
  container: {
    height: height,
    width: width,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#861F41",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    paddingLeft: 10,
    color: "white",
  },
};

export default Home;

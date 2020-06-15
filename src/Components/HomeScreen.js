import React from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import HomeItems from "./HomeItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Component } from "react";

const foods = [
  {
    key: 0,
    title: "NORTH INDIANS",
    text: "109 Places",
    // image: require("../../../assests/home/img_food5.jpg"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 1,
    title: "DESSERT",
    text: "145 Places",
    //image: require("../../../assests/home/img_food3.jpg"),
    backgroundColor: "#febe29",
  },
  {
    key: 2,
    title: "STARTERS",
    text: "127 Places",
    //image: require("../../../assests/home/img_food4.jpg"),
    backgroundColor: "#22bcb5",
  },
];

const { height, width } = Dimensions.get("window");

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

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
                style={{ paddingLeft: 10, color: "black" }}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Popular Cusines</Text>
          </View>
        </View>
      </View>
    );
  }

  onMenuPress() {
    this.props.navigation.openDrawer();
  }
}

const renderCustomItems = (item) => {
  return (
    <TouchableOpacity onPress={this.sendToFoodListScreen.bind(this)}>
      <HomeItems item={item} nav={navigation} />
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    height: height,
    width: width,
    backgroundColor: "#f7f7f7",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    paddingLeft: 10,
  },
};

export default Home;

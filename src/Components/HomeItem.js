import React from "react";
import { View, Text, ImageBackground, Dimensions } from "react-native";
import { Component } from "react";

const { height, width } = Dimensions.get("window");

class HomeItems extends Component {
  sendToLoginScreen() {
    this.props.nav.push("Login");
  }
  render() {
    const { title, image, text, key } = this.props.item;
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.foodBG}>
          <View style={[styles.textContainer, { justifyContent: "flex-end" }]}>
            <Text style={styles.title}> {title}</Text>
            <Text align style={styles.subTitle}>
              {text}
            </Text>
          </View>
          <ImageBackground
            source={image}
            style={styles.foodBG}
          ></ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#dddddd",
    shadowOffset: { width: 0, height: 1.0 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  foodBG: {
    height: (height - 150) / 3,
    width: width - 40,
    backgroundColor: "#ddddddd",
    borderRadius: 15,
    overflow: "hidden",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 5,
    color: "white",
  },
  subTitle: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 20,
    marginTop: 0,
    color: "white",
  },
  textContainer: {
    flex: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    // paddingTop:170,
  },
};

export default HomeItems;

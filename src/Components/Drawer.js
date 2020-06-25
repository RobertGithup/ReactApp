import { Icon, Thumbnail } from "native-base";
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

import FeatherIcons from "react-native-vector-icons/Feather";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const arrMenu = [
  { id: 0, name: "Home", icon: "home", navScreen: "HomeScreen" },
  {
    id: 1,

    name: "GRN",
    icon: "arrow-down-right",
    navScreen: "Grpo",
  },
  {
    id: 2,

    name: "Delivery",
    icon: "arrow-down-left",
    navScreen: "Delivery",
  },

  { id: 3, name: "User Creation", icon: "user", navScreen: "UserCreation" },
  { id: 4, name: "Log out", icon: "log-out", navScreen: "Login" },
];

class DrawerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToScreen = this.navigateToScreen.bind(this);
  }

  render() {
    const uri =
      "https://mobirise.com/bootstrap-template/profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg";

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.menuContainer}>{this.renderFlatList()}</View>
        <View
          style={[
            styles.footerContainer,
            { bottom: screenHeight > 800 ? 10 : 5 },
          ]}
        >
          <Text style={styles.footerText}>App v1.0.0</Text>
        </View>
      </SafeAreaView>
    );
  }

  renderIcon() {
    return <Icon name="menu" style={{ color: "#fff" }} />;
  }

  renderFlatList() {
    return (
      <FlatList
        scrollEnabled={screenHeight >= 667 ? false : true}
        data={arrMenu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.navigateToScreen(item.navScreen)}
          >
            <View
              style={{
                height: 55,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <FeatherIcons
                name={item.icon}
                size={35}
                style={{ paddingLeft: 20, color: "#fff" }}
              />
              <Text style={styles.menuText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  navigateToScreen(navScreen) {
    this.props.navigation.navigate(navScreen);
  }
}

export default DrawerMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#861F41",
  },
  ListBtn: {
    height: 55,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  headerContainer: {
    flex: 0.9,
    justifyContent: "center",
  },
  menuContainer: {
    marginTop: 60,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  menuText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginLeft: 20,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    height: 30,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
});

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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const arrMenu = [
  { id: 0, name: "Home", icon: "home-outline", navScreen: "HomeScreen" },
  {
    id: 1,
    name: "Favourite",
    icon: "heart-multiple-outline",
    navScreen: "FavouriteScreen",
  },
  {
    id: 2,
    name: "Messages",
    icon: "comment-text-multiple",
    navScreen: "MessagesScreen",
  },
  { id: 3, name: "My Walet", icon: "wallet", navScreen: "MyWaletScreen" },
  { id: 4, name: "Help", icon: "help", navScreen: "HelpScreen" },
  { id: 5, name: "Log out", icon: "logout", navScreen: "LoginScreen" },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: 15 }}>
              <Thumbnail circle source={{ uri: uri }} />
            </View>

            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "600",
                paddingLeft: 10,
              }}
            >
              Halli
            </Text>
          </View>
        </View>
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
              <MaterialCommunityIcons
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
    backgroundColor: "rgb(7,27,52)",
  },
  headerContainer: {
    flex: 0.9,
    justifyContent: "center",
  },
  menuContainer: {
    flex: 3,
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

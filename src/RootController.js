import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Dimensions } from "react-native";
import HomeScreen from "./Components/HomeScreen";
import Grpo from "./Components/Grpo";

import DrawerMenu from "./Components/Drawer";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HomeNavigator = createStackNavigator(
  {
    HomeScreen,
  },

  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
  }
);

const FavouriteNavigator = createStackNavigator(
  {
    Grpo,
  },
  {
    initialRouteName: "Grpo",
    headerMode: "none",
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: HomeNavigator,

    FavouriteScreen: FavouriteNavigator,
  },
  {
    navigationOptions: {
      headerMode: "none",
    },
    initialRouteName: "HomeScreen",
    drawerBackgroundColor: "red",
    contentComponent: DrawerMenu,
    drawerLockMode: "locked-closed",
    disableGestures: true,
    drawerWidth: screenWidth - 60,
    edgeWidth: 0,

    contentOptions: {
      activeTintColor: "yellow",
    },
    layout: {
      orientation: ["portrait"],
    },
  }
);
class RootController {}
export default RootController = createAppContainer(DrawerNavigator);

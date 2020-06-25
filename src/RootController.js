import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Dimensions } from "react-native";
import HomeScreen from "./Components/HomeScreen";
import Login from "./Components/Login";
import UserCreation from "./Components/UserCreation";
import Grpo from "./Components/Grpo";
import Delivery from "./Components/Delivery";

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

const GrpoNavigator = createStackNavigator(
  {
    Grpo,
  },
  {
    initialRouteName: "Grpo",
    headerMode: "none",
  }
);

const DeliveryNavigator = createStackNavigator(
  {
    Delivery,
  },
  {
    initialRouteName: "Delivery",
    headerMode: "none",
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login,
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);
const UserCreationNavigator = createStackNavigator(
  {
    UserCreation,
  },
  {
    initialRouteName: "UserCreation",
    headerMode: "none",
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: HomeNavigator,
    Grpo: GrpoNavigator,
    Delivery: DeliveryNavigator,
    Login: LoginNavigator,
    UserCreation: UserCreationNavigator,
  },
  {
    navigationOptions: {
      headerMode: "none",
    },

    initialRouteName: "Login",

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

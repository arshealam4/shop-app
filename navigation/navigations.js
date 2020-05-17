import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../css/Colors";
import Products from "../screens/products/Products";
import ProductDetails from "../screens/products/ProductDetails";
import Categories from "../screens/categories/Categories";
import Cart from "../screens/carts/Cart";
import Order from "../screens/orders/Order";
import Admin from "../screens/admin/Admin";

const HomeNavigationStack = createStackNavigator(
  {
    Categories: {
      screen: Categories,
    },
    Products: {
      screen: Products,
    },
    ProductDetails: ProductDetails,
    Cart: Cart,
  },
  {
    initialRouteName: "Categories",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitle: "A Screen",
    },
  }
);

const OrderNavigationStack = createStackNavigator(
  {
    Order: {
      screen: Order,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitle: "Orders",
    },
  }
);

const AdminNavigationStack = createStackNavigator(
  {
    Admin: {
      screen: Admin,
    },
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
      },
    },
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitle: "Admin",
    },
  }
);

const bottomTabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigationStack,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Orders: {
      screen: OrderNavigationStack,
      navigationOptions: {
        tabBarLabel: "Orders",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-list" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-home" : "ios-home"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    tabBarOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

const drawerNavigator = createDrawerNavigator(
  {
    Home: bottomTabNavigation,
    Admin: AdminNavigationStack,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(drawerNavigator);

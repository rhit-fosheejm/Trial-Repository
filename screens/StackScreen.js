import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import MainScreen from "./MainScreen";
import BarCode from "./BarCode";
//import PaymentScreen from "./PaymentScreen";
// import ExploreScreen from './ExploreScreen';
// import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const PaymentStack = createStackNavigator();

const StackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeStackScreen} />
      <Stack.Screen name="Payment" component={PaymentStackScreen} />
    </Stack.Navigator>
  );
};
export default StackScreen;
const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#7BD70B",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={MainScreen}
      options={{
        title: "Home",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#7BD70B"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const PaymentStackScreen = ({ navigation }) => (
  <PaymentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#7BD70B",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <PaymentStack.Screen
      name="Payment"
      component={BarCode}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#7BD70B"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </PaymentStack.Navigator>
);

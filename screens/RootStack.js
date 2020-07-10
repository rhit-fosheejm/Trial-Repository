import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
// import Data from "./Data";

const Stack = createStackNavigator();

const RootStack = ({ navigation }) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

  </Stack.Navigator>
);

export default RootStack;

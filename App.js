import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MainScreen from "./screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./screens/DrawerContent";
import Icon from "react-native-vector-icons/Ionicons";
import RootStack from "./screens/RootStack";
import { AuthorizationContext } from "./component/context";
import AsyncStorage from "@react-native-community/async-storage";

const Drawer = createDrawerNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initiallLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (previousState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...previousState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...previousState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...previousState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...previousState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initiallLoginState
  );
  const authorizContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setUserToken("abcd");
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = String(foundUser[0].username);
        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setUserToken("abcd");
        // setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthorizationContext.Provider value={authorizContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Home"
              component={MainScreen}
              options={{
                title: "Map",
                headerLeft: () => (
                  <Icon.Button
                    name="ios-menu"
                    size={25}
                    options={() => {
                      props.navigation.openDrawer();
                    }}
                  ></Icon.Button>
                ),
              }}
            />
          </Drawer.Navigator>
        ) : (
          <RootStack />
        )}
      </NavigationContainer>
    </AuthorizationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "react-native-reanimated";

const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/IndyGo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text> Hail Indy !!! </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Ride with IndyGo, Safe and Convenient!</Text>
        <Text style={styles.text}> A Safe and easy way to Commute!</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SignInScreen")}
          >
            <LinearGradient
              colors={["#08d4c4", "#09A6E3"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Start</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#7BD70B",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 15,
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});

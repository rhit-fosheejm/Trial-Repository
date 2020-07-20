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
import * as Animatable from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require("../assets/HailLogoCircle.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>EZ Hail!</Text>
        <Text style={styles.text}>
          The convenience of ride share, with the safety and reliability of
          IndyGo
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SignInScreen")}
          >
            <LinearGradient
              colors={["#7BD70B", "#09A6E3"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Start</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={32} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.35;

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
    backgroundColor: "#003a85",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    marginTop: 30,
    width: height_logo * 1.2,
    height: height_logo * 1.2,
  },
  title: {
    color: "white",
    fontSize: 30,
    marginLeft: WIDTH * 0.3,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontStyle: "italic",
    justifyContent: "center",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
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
    fontSize: 22,
  },
});

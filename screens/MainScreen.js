import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Home Page Guys !</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

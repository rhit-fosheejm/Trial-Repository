import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  AutoCompleteBox: {
    //     flexDirection: 'row',
    //     marginHorizontal: 20,
    //     padding: 10,
    //     alignSelf: 'stretch',
    //     backgroundColor: '#FFF',
    //     borderColor: '#BBB',
    //     borderWidth: 2,
    //     borderRadius: 3,
    //     elevation: 3
    //   },
    //   AutoCompleteInput: {
    //     flexGrow: 1
    //   },
    //   AutoCompleteClose: {
    //     padding: 5,
    //     color: '#999',
    //     fontWeight: '900',
    //     elevation: 5,
    //     fontSize: 18
    //   }
    // });
    zIndex: 9,
    position: "absolute",
    flexDirection: "row",
    width: WIDTH - 40,
    height: 60,
    top: 20,
    left: 20,
    borderRadius: 2,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  leftCol: {
    flex: 1,
    alignItems: "center",
  },
  searchIcon: {
    padding: 10,
  },
  centerCol: {
    flex: 4,
  },
  rightCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: "#20232a",
    //borderColor: "eded", somethinf wrong with value 'ededed
  },
  AutoCompleteInput: {
    flexGrow: 1,
  },
  AutoCompleteClose: {
    padding: 5,
    color: "#999",
    fontWeight: "900",
    elevation: 5,
    fontSize: 18,
  },
});

const AutoCompleteBox = (props) => (
  <View style={styles.AutoCompleteBox}>
    <MaterialIcons
      style={styles.searchIcon}
      name="search"
      size={20}
      color="#000"
    />
    <TextInput
      {...props}
      underlineColorAndroid="#FFF"
      style={styles.AutoCompleteInput}
    />
    <TouchableOpacity onPress={() => props.clearInput()}>
      <MaterialIcons name="clear" size={20} />
    </TouchableOpacity>
  </View>
);

AutoCompleteBox.defaultProps = {
  clearInput: () => console.log("Clear Input Pressed"),
};

export default AutoCompleteBox;

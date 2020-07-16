import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
//import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
//import { BarCode } from "react-native-barcode-expo";

const BarCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(
      "Thank you For Riding with EZHail. Charges: 1.75$ Reward earned: 5 Points"
    );
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  //   const [hasPermission, setHasPermission] = useState(null);
  //   const [type, setType] = useState(Camera.Constants.Type.back);

  //   useEffect(() => {
  //     (async () => {
  //       const { status } = await Camera.requestPermissionsAsync();
  //       setHasPermission(status === "granted");
  //     })();
  //   }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    // <View style={{ flex: 1 }}>
    //   <Camera style={{ flex: 1 }} type={type}>
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: "transparent",
    //         flexDirection: "row",
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={{
    //           flex: 0.1,
    //           alignSelf: "flex-end",
    //           alignItems: "center",
    //         }}
    //         onPress={() => {
    //           setType(
    //             type === Camera.Constants.Type.back
    //               ? Camera.Constants.Type.front
    //               : Camera.Constants.Type.back
    //           );
    //         }}
    //       >
    //         <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
    //           {" "}
    //           Flip{" "}
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </Camera>
    // </View>
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* <TouchableOpacity
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
      /> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default BarCode;

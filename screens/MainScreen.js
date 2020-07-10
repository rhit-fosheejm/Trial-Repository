import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline,
} from "react-native-maps";
import { locations } from "./Data";
import RNGooglePlaces from "react-native-google-places";
import {DestinationButton} from './component/DestinationButton'

// export function MainScreen(props) {
const MainScreen = (props) => {
  return (
    <View style={styles.container}>
     
        <DestinationButton/>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 39.76691,
          longitude: -86.14996,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((marker) => (
          <Circle
            center={{ latitude: marker.latitude, longitude: marker.longitude }}
            radius={550}
          />
        ))}

        {locations.map((marker) => (
          <Polyline coordinates={locations} />
        ))}

        {locations.map((marker) => (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          ></Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
});

export default MainScreen;

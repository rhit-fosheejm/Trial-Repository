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
  Permissions,
} from "react-native-maps";
import { locations } from "./Data";
import RNGooglePlaces from "react-native-google-places";
import { DestinationButton } from "../component/DestinationButton";
// import {Driver} from "../component/Driver"

export default class MainScreen extends React.Component{
// export function MainScreen(props) {
// const MainScreen = (props) => {
  // constructor(props){
  //   super(props);
  
  //   this.state = {
  //     region: null,
  //   }
  //   this._getLocationAsync();
  // }

  // _getLocationAsync = async () => {
  //   let {status} = await Permissions.askAsync(Permissions.location);
  //   if(status !== 'granted')
  //   console.log('Permission to access location was denied.');

  //   let location = await Location.getCurrentPositionAsync({enabledHighAccuracy})
  //   let region = {
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 0.045,
  //     longitudeDelta: 0.045,
  //   }
  //   this.setState({region: region})
  // }
  render(){
  return (
    <View style={styles.container}>
      <DestinationButton />
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion=
        // {this.state.region}
         {{ latitude: 39.76691,
          longitude: -86.14996,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {/* <Driver driver ={{uid: 'null', location:{
        latitude: 39.76691,
        longitude: -86.14996,
      }}}/> */}
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
  );}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
});

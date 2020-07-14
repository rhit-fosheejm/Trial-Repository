
// export default MainScreen;
// import React, { Component, useState, useEffect } from "react";
// import MapViewDirections from 'react-native-maps-directions';
// import { locations } from "./Data";
// import { DestinationButton } from "../component/DestinationButton";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Dimensions
// } from "react-native";
// import MapView, {
//     PROVIDER_GOOGLE, Marker
//   } from "react-native-maps";
// import GooglePlacesAutocomplete from "../component/GooglePlacesAutocomplete";
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';


// const GOOGLE_MAPS_APIKEY = "AIzaSyCkNvrH4iYOhuIrUsmFE1bEgDCBJSTX9Fg";

// const coordinates = [
//   {
//   latitude:  null,
//   longitude:null,
// },
// {latitude:  39.75691,
//   longitude: -86.17996
// }]

// export default function MainScreen() {
// const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     if (Platform.OS === 'android' && !Constants.isDevice) {
//       setErrorMsg(
//         'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
//       );
//     } else {
//       (async () => {
//         let { status } = await Location.requestPermissionsAsync();
//         if (status !== 'granted') {
//           setErrorMsg('Permission to access location was denied');
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location);
//         coordinates[0]={latitude:location.latitude, longitude:location.longitude}
//       })();
//     }
//   });
// // export default class MainScreen extends React.Component{

//   //  render(){
//     return (
//     <View style={styles.container}>
//     <DestinationButton />
// <MapView
// style={{ flex: 1 }}
//         showsUserLocation
//  initialRegion=
//          {{latitude: 39.76691,
//           longitude: -86.14996,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//   <MapViewDirections
//   strokeWidth = {3}
//     origin={coordinates[0]}
//     destination={coordinates[1]}
//     apikey={GOOGLE_MAPS_APIKEY}
//   />
//   {locations.map((marker) => (
//           <Marker
//             coordinate={{
//               latitude: marker.latitude,
//               longitude: marker.longitude,
//             }}
//           ></Marker>))}
// </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: "#fff",
//   },
// });



import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity } from "react-native";
import MapViewDirections from "react-native-maps-directions";

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

const GOOGLE_MAPS_APIKEY = "AIzaSyCkNvrH4iYOhuIrUsmFE1bEgDCBJSTX9Fg";
class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude:39.76,
      cordLongitude: -86.14,
    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );

   }

  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, " 39.76691, -86.14996");
       });
     }

   }

   async getDirections(startLoc, destinationLoc) {

         try {
          const KEY = "GOOGLE_MAPS_APIKEY";
             let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
             let respJson = await resp.json();
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             this.setState({coords: coords})
             this.setState({x: "true"})
             return coords
         } catch(error) {
           console.log('masuk fungsi')
             this.setState({x: "error"})
             return error
         }
     }
    

  render() {

    return (
      
  
     
      <MapView 
        apikey={GOOGLE_MAPS_APIKEY}
      style={styles.map} initialRegion={{
       latitude:39.76691,
       longitude: -86.14996,
       latitudeDelta: 0.1,
       longitudeDelta: 0.1
      }}>
    
      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}


       {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
          title={"Your Destination"}
        />}


        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapViewDirections
        apikey={GOOGLE_MAPS_APIKEY}
        origin =  {{latitude: this.state.latitude, longitude: this.state.longitude}}
        destination = {{latitude: this.state.cordLatitude, longitude: this.state.cordLongitude}}
         
          strokeWidth={2}
          strokeColor="black"/>
         }
    
       
       
        
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MainScreen;



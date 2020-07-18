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
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';
// // import Search from "../component/Search";
// import AutoCompleteBox from '../component/AutoCompleteBox';
// import AutoCompleteResultList from '../component/AutoCompleteResultList';
// import { getPredictionWithDetail } from '../services.js';

// const GOOGLE_MAPS_APIKEY = "AIzaSyCkNvrH4iYOhuIrUsmFE1bEgDCBJSTX9Fg";

// const coordinates = [
//   {
//   latitude:  39.85691,
//   longitude:-86.27996,
// },
// {latitude:  39.75691,
//   longitude: -86.17996
// }]

// export default class MainScreen extends React.Component{
//   constructor(props) {
//     super(props);
//   this.state = {
//     query: '',
//     data: [],
//     loading: false
//   };
// }
// onChangeText(query) {
//   this.setState({ query });
//   getPredictionWithDetail(query, KEY).then(result => {
//     this.setState({ data: result, loading: false });
//   });
// }
//    render(){
//     return (
//     <View style={styles.container}>
//     {/* <DestinationButton /> */}
//     <AutoCompleteBox
//           placeholder="Masukan Nama Tempat"
//           value={this.state.query}
//           onChangeText={query => this.onChangeText(query)}
//         />
//         <AutoCompleteResultList data={this.state.data} />
//     {/* <Search/> */}
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
// };}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: "#fff",
//   },
// });

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
// import Search from "../component/Search";
import { DestinationButton } from "../component/DestinationButton";
import Geojson from "react-native-geojson";
import AutoCompleteBox from "../component/AutoCompleteBox";
import AutoCompleteResultList from "../component/AutoCompleteResultList";
import { getPredictionWithDetail } from "../services.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView from "react-native-maps";
import Polyline from "@mapbox/polyline";
import { LinearGradient } from "expo-linear-gradient";
//import { CurrentButton } from "../component/CurrentButton";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const alcatraz = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.42305755615234, 37.82687023785448],
      },
    },
  ],
};

const GOOGLE_MAPS_APIKEY = "AIzaSyCkNvrH4iYOhuIrUsmFE1bEgDCBJSTX9Fg";
// export class MainScreen extends React.Component{
export default class MainScreen extends React.Component {
  // class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords: [],
      x: "false",
      cordLatitude: 39.76,
      cordLongitude: -86.14,
      query: "",
      data: [],
      KEY: "GOOGLE_MAPS_APIKEY",
      loading: false,
    };

    this.mergeLot = this.mergeLot.bind(this);
  }

  onChangeText(query) {
    this.setState({ query });
    getPredictionWithDetail(query, GOOGLE_MAPS_APIKEY).then((result) => {
      //console.log(result);
      this.setState({ data: result, loading: false });
      // console.log(this.state.data);
    });
  }

  // onChangeText(query) {
  //   this.setState({ query });
  //   getPredictionWithDetail(query, GOOGLE_MAPS_APIKEY).then((result) => {
  //     this.setState({ data: result, loading: false });
  //   });
  // }

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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  mergeLot() {
    if (this.state.latitude != null && this.state.longitude != null) {
      let concatLot = this.state.latitude + "," + this.state.longitude;
      this.setState(
        {
          concat: concatLot,
        },
        () => {
          this.getDirections(concatLot, " 39.76691, -86.14996");
        }
      );
    }
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      const KEY = "GOOGLE_MAPS_APIKEY";
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      this.setState({ coords: coords });
      this.setState({ x: "true" });
      return coords;
    } catch (error) {
      this.setState({ x: "error" });
      return error;
    }
  }
  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    } = this.state.region;
  }

  render() {
    return (
      <View style={styles.map}>
        <AutoCompleteBox
          placeholder="Search here"
          value={this.state.query}
          onChangeText={(query) => this.onChangeText(query)}
        />
        <AutoCompleteResultList data={this.state.data} />
        <MapView
          apikey={GOOGLE_MAPS_APIKEY}
          style={styles.map}
          initialRegion={{
            latitude: 39.76691,
            longitude: -86.14996,
            latitudeDelta: 0.522,
            longitudeDelta: 0.0421,
          }}
          showsCompass={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsTraffic={false}
          showsBuildings={true}
          showsScale={true}
          ref={(map) => (this.map = map)}
        >
          <Geojson geojson={alcatraz} />
          {!!this.state.latitude && !!this.state.longitude && (
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title={"Your Location"}
            />
          )}

          {!!this.state.cordLatitude && !!this.state.cordLongitude && (
            <MapView.Marker
              coordinate={{
                latitude: this.state.cordLatitude,
                longitude: this.state.cordLongitude,
              }}
              title={"Your Destination"}
            />
          )}

          {!!this.state.latitude &&
            !!this.state.longitude &&
            this.state.x == "error" && (
              <MapViewDirections
                apikey={GOOGLE_MAPS_APIKEY}
                origin={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
                destination={{
                  latitude: this.state.cordLatitude,
                  longitude: this.state.cordLongitude,
                }}
                strokeWidth={2}
                strokeColor="black"
              />
            )}
        </MapView>
        {/* <CurrentButton
          cb={() => {
            this.centerMap();
          }}
        /> */}
        <View style={styles.button}>
          <TouchableOpacity>
            <LinearGradient colors={["#08d4c4", "#08D45D"]} style={styles.hail}>
              <MaterialCommunityIcons name="hail" size={40} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // container: {
  //   flex: 1,

  //   backgroundColor: "#fff",
  // },
  button: {
    //marginTop: HEIGHT - 170,
    marginTop: HEIGHT * 0.75,
    // marginHorizontal: WIDTH - 250,
    marginHorizontal: WIDTH * 0.4,
  },
  hail: {
    padding: 5,
    height: 80,
    width: 80,
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: "#fff",
//   },
// });

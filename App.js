
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import {MapView} from 'react-native-maps';

// // export default class App extends React.Component{
//   constructor(props) {
//     super(props);

//     this.state= {
//       region: {
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.922,
//         longitudeDelta: 0.0421,
//       }
//     }
//   }
//  render() {
//   return (
//     <View style={styles.container}>
//       <Text>HomeScreen</Text>
//       <MapView
//           initialRegion={this.state.region}
//           showsCompass ={true}
//           rotateEnabled ={false}
//           style={{ flex: 1}}
//           />
//     </View>
//   );
// }
// }



import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Polyline} from 'react-native-maps';
import {locations } from './Data'
import RNGooglePlaces from 'react-native-google-places';
// import CustomMarker from './CustomMarker'

export default class App extends React.Component {
  // openSearchModal(){
  //   RNGooglePlaces.openAutocompleteModal().then((place) => {
  //     console.log(place);
  //     // place represents user's selection from the suggestions
  //     //and it is a simplified Google Place Object
  //   })
  //   .catch(error => console.log(error.message)); // error is a Javascript Error Object
  // }

  render() {
    return (
      <View style ={styles.container}>
        {/* <TouchableOpacity
        // style={styles.button}
        onPress ={()=> this.openSearchModal()}
        >
          <Text style = {{marginTop:40, padding:30}}>Pick a Place</Text>
        </TouchableOpacity> */}

      <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: 39.76691,
         longitude:-86.14996 ,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
         }}
      >

        {locations.map(marker => (
          <Circle center = {{latitude: marker.latitude, longitude: marker.longitude}} radius= {550} />
         ))}
         

         {locations.map(marker => (
          <Polyline coordinates=  {locations} />
         ))}
      

        {
          locations.map(marker => (
          <Marker
          coordinate = {{latitude: marker.latitude, 
          longitude: marker.longitude}}>

          {/* <CustomMarker item = {marker}/> */}
          </Marker>
         ))
         }

      </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
})
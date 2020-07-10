// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Circle, Polyline} from 'react-native-maps';
// import {locations } from './Data'
// import RNGooglePlaces from 'react-native-google-places';
// // import CustomMarker from './CustomMarker'

// export default class App extends React.Component {
//   // openSearchModal(){
//   //   RNGooglePlaces.openAutocompleteModal().then((place) => {
//   //     console.log(place);
//   //     // place represents user's selection from the suggestions
//   //     //and it is a simplified Google Place Object
//   //   })
//   //   .catch(error => console.log(error.message)); // error is a Javascript Error Object
//   // }

//   render() {
//     return (
//       <View style ={styles.container}>
//         {/* <TouchableOpacity
//         // style={styles.button}
//         onPress ={()=> this.openSearchModal()}
//         >
//           <Text style = {{marginTop:40, padding:30}}>Pick a Place</Text>
//         </TouchableOpacity> */}

//       <MapView
//          style={{ flex: 1 }}
//          provider={PROVIDER_GOOGLE}
//          showsUserLocation
//          initialRegion={{
//          latitude: 39.76691,
//          longitude:-86.14996 ,
//          latitudeDelta: 0.0922,
//          longitudeDelta: 0.0421,
//          }}
//       >

//         {locations.map(marker => (
//           <Circle center = {{latitude: marker.latitude, longitude: marker.longitude}} radius= {550} />
//          ))}
         

//          {locations.map(marker => (
//           <Polyline coordinates=  {locations} />
//          ))}
      

//         {
//           locations.map(marker => (
//           <Marker
//           coordinate = {{latitude: marker.latitude, 
//           longitude: marker.longitude}}>

//           {/* <CustomMarker item = {marker}/> */}
//           </Marker>
//          ))
//          }

//       </MapView>
//       </View>
//     )}}

//     const styles = StyleSheet.create({

//         container: {
      
//           flex: 1,
      
//           backgroundColor: "#fff",
      
//         },
      
//       });


// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Circle, Polyline, Permissions, Location} from 'react-native-maps';
// import {locations } from './Data'
// import RNGooglePlaces from 'react-native-google-places';

// const state =(props)=>{
 
//   this.state ={
//     region: null,
//     //   latitude: 39.76691,
//     //  longitude:-86.14996 ,
//     //  latitudeDelta: 0.0922,
//     //  longitudeDelta: 0.0421,
//   }
//   this._getLocationAsync();
// }
// export default class MainScreen extends React.Component {
//   // const MainScreen = (props) => {
    
//   constructor(props){
//     super(props);
//   this.state ={
//     region: null,
//     //   latitude: 39.76691,
//     //  longitude:-86.14996 ,
//     //  latitudeDelta: 0.0922,
//     //  longitudeDelta: 0.0421,
//   }
//   this._getLocationAsync();
// }

//     _getLocationAsync =async() =>{
//       let {status} = await Permissions.askAsync(Permissions.LOCATION);
//       if(status !== 'granted')
//       console.log("Permission to access location was denied.");

//       let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true});
//         let region ={
//      latitude: location.coords.latitude,
//      longitude:location.coords.longitude ,
//      latitudeDelta: 0.045,
//      longitudeDelta: 0.045,
//         }
//         this.setState({region: region})
//     }
//       render(){
//         return (
//       <View style ={styles.container}>
//       <MapView
//          style={{ flex: 1 }}
//          provider={PROVIDER_GOOGLE}
//          showsUserLocation = {true}
//          initialRegion={
//           this.state.region
      
//          }
//          showsCompass = {true}
//          rotateEnabled = {false}
//       >

//         {locations.map(marker => (
//           <Circle center = {{latitude: marker.latitude, longitude: marker.longitude}} radius= {550} />
//          ))}
         

//          {locations.map(marker => (
//           <Polyline coordinates=  {locations} />
//          ))}
      

//         {
//           locations.map(marker => (
//           <Marker
//           coordinate = {{latitude: marker.latitude, 
//           longitude: marker.longitude}}>

        
//           </Marker>
//          ))
//          } 

//        </MapView>
//       </View>
//     )}}

//     const styles = StyleSheet.create({

//         container: {
      
//           flex: 1,
      
//           backgroundColor: "#fff",
      
//         },
      
//       });

 



import React from 'react';
import {
    Stylesheet, 
    Text, 
    View, 
    Dimensions, 
    TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

export const DestinationButton = function(props){
    return(
        <TouchableOpacity onPress={( ) => {} }
        style ={styles.container}></TouchableOpacity>

    )
}

const styles = Stylesheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: (WIDTH-40),
        height: 60,
        top: 110,
        left: 20,
        borderRadius:2,
        backgroundColor: 'white',
        alignItems: 'center',
    }
})
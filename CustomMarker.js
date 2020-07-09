import React from 'react'
import {View, StyleSheet, Image } from 'react-native'

const CustomMarker = ({item}) => {
    return(
        <View style ={styles.roundMarker}>
            <Image style = {styles.roundImage} source={{url: item.markerImage}}/>
        </View>
    )
}

const styles = StylesSheet.create({
    roundMarker: {
        height:50,
        width: 50,
        backgroundColor: 'white',
        borderRadius:25,
    },
    roundImage: {
        height:50,
        width: 50,
        borderRadius:25
    }
})

export default CustomMarker
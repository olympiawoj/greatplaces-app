import React from "react"

import { Image, StyleSheet, View, Text } from "react-native"
import ENV from "../env"


const MapPreview = (props) => {
    const { location, children, style } = props
    //generate image preview URL
    let imagePreviewUrl

    if (location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmapmarkers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleApiKey}`
        console.log('this is the imagePreviewUrl', imagePreviewUrl)
    }


    return (
        //let's you set styles outside and merge them
        <View style={{
            ...styles.mapPreview, ...style
        }}>
            {location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : children}
        </View >
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    mapImage: {
        //must set width/height bc it's a network image
        width: '100%',
        height: '100%'
    }
})

export default MapPreview;
import React from "react"

import { Image, StyleSheet, TouchableOpacity, Text } from "react-native"
import ENV from "../env"


const MapPreview = (props) => {
    const { location, children, style, onPress } = props
    //generate image preview URL
    let imagePreviewUrl

    if (location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmapmarkers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleApiKey}`

    }


    return (
        //let's you set styles outside and merge them
        <TouchableOpacity onPress={onPress} style={{
            ...styles.mapPreview, ...style
        }}>
            {location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : children}
        </TouchableOpacity >
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
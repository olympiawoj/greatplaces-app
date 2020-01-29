import React, { useState, useEffect } from "react"
//Button allows us to start getting user location, text for default text
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet, Image } from "react-native"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapPreview from "./MapPreview"

import Colors from "../constants/Colors"

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const mapPickedLocation = props.navigation.getParam('pickedLocation')

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
        }
    }, [mapPickedLocation])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app',
                [{ text: 'Okay' }]
            )
            return false;
        }
        return true;
    }


    const getLocationHandler = async () => {
        //check permissions
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return;
        }
        //uses location API to get user location, returns a promise that will resolve when we get location
        try {
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            console.log('coords', location.coords)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            console.log('thisi s the picked location', pickedLocation)

        } catch (error) {
            Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map.', [{ text: "Okay!" }])
        }
        setIsFetching(false)

    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview
                style={styles.mapPreview}
                location={pickedLocation}
                onPress={pickOnMapHandler}>
                {isFetching ?
                    <ActivityIndicator size='large' color={Colors.primary} /> :
                    <Text>No location chosen yet!</Text>}

            </MapPreview>
            <View style={styles.actions}>

                <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
                <Button title="Pick On Map" color={Colors.primary} onPress={pickOnMapHandler} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})

export default LocationPicker
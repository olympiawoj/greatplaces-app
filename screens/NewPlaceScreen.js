import React, { useState, useCallback } from "react"
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from "react-native"
import Colors from "../constants/Colors"
import { useDispatch } from "react-redux"
import * as placesActions from "../store/places-actions"
import ImagePicker from "../components/ImagePicker"
import LocationPicker from "../components/LocationPicker"

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()

    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        //could add valudation before settings
        setTitleValue(text)
    }

    const savePlaceHandler = () => {
        //save the place using redux
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))
        props.navigation.goBack()
    }

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath)
    }

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location)
    }, [])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
                <ImagePicker onImageTake={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: "Add Place"
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }

})

export default NewPlaceScreen
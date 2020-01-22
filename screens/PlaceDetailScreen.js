import React from "react"
import { View, Text, StyleSheet } from "react-native"

const PlaceDetailScreen = props => {
    return (
        <View>
            <Text>PlaceDetailScreen</Text>
        </View>
    )
}
PlaceDetailScreen.navigationOptions = navData => {
    //set headerTitle based on the params I'm getting from PlaceListScreen, must use function for navData
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({})

export default PlaceDetailScreen
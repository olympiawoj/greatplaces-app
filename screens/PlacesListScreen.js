import React from "react"
import { Platform, FlatList, StyleSheet } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../components/HeaderButton"
import { useSelector } from "react-redux"
import PlaceItem from "../components/PlaceItem"

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places)
    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                //no image or address yet so pass in null - for onSelect, go to new page after all

                <PlaceItem
                    onSelect={() => {
                        //2nd arg passes params
                        props.navigation.navigate('PlaceDetail',
                            {
                                placeTitle: itemData.item.title,
                                placeId: itemData.item.id
                            })
                    }}
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={null} />
            }
        />
    )
}

const styles = StyleSheet.create({})

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: "All Places",
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Add Place"
                        iconName={Platform.OS === "android" ? 'md-add' : 'ios-add'}
                        onPress={() => {
                            navData.navigation.navigate('NewPlace')
                        }} />
                </HeaderButtons>
            )
        }
    }
}

export default PlacesListScreen
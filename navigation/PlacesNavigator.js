import { Platform } from "react-native"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../constants/Colors"

//screens we want to work with
import PlacesListScreen from "../screens/PlacesListScreen"
import PlaceDetailScreen from "../screens/PlaceDetailScreen"
import NewPlaceScreen from "../screens/NewPlaceScreen"
import MapScreen from "../screens/MapScreen"

//set-up stack navigator
const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
},
    //sets up default navigation options
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
        }
    })

//export app navigator
export default createAppContainer(PlacesNavigator)
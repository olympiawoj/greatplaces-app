import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = "ADD_PLACE"
export const SET_PLACES = "SET_PLACES"
import { insertPlace, fetchPlaces } from "../helpers/db"
import ENV from "../env"

//image is temp path to the image
export const addPlace = (title, image, location) => {

    return async  dispatch => {
        //fetch human readable address - sends a get request, therefore we await the res
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)
        if (!response.ok) {
            throw new Error('Something went wrong while fetching address')
        }
        //extracts body of response and converts to normal JS
        const resData = await response.json()
        if (!resData.results) {
            throw new Error('Something went wrong in resData.results')
        }

        const address = resData.results[0].formatted_address

        console.log('resData', resData)

        //split by slashes and it converts this string into an arr of string segments
        //pop gives you the last segment
        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng)
            // console.log(dbResult)
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            })
        } catch (error) {
            console.log(error)
            throw (error)

        }

    }

}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces()
            console.log(dbResult)
            dispatch({ type: SET_PLACES, places: dbResult.rows._array })
        }
        catch (error) {
            throw error
        }

    }
}
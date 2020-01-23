import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = "ADD_PLACE"
import { insertPlace } from "../helpers/db"

//image is temp path to the image
export const addPlace = (title, image) => {
    return async  dispatch => {
        //split by slashes and it converts this string into an arr of string segments
        //pop gives you the last segment
        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(title, newPath, 'dummy address', 15.6, 12.3)
            console.log(dbResult)
            dispatch({
                type: ADD_PLACE,
                placeData: { id: dbResult.insertId, title: title, image: newPath }
            })
        } catch (error) {
            console.log(error)
            throw (error)

        }

    }

}
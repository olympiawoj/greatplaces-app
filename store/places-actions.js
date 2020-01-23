import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = "ADD_PLACE"

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
        } catch (error) {
            console.log(error)
            throw (error)

        }
        dispatch({
            type: ADD_PLACE,
            placeData: { title: title, image: newPath }
        })
    }

}
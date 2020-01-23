import { ADD_PLACE } from "./places-actions"
import Place from "../models/place"

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            //id is dummy id using new Date
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image)
            return {
                ...state,
                //concat takes array, adds new item, and returns a new array
                places: state.places.concat(newPlace),

            }
        default:
            return state
    }

}
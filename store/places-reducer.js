import { ADD_PLACE, SET_PLACES } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(pl => new Place(pl.id.toString(), pl.title))
      };
    case ADD_PLACE:
      //id is dummy id using new Date
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title
      );
      return {
        ...state,
        //concat takes array, adds new item, and returns a new array
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
};

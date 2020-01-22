import React from 'react';
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from "./navigation/PlacesNavigator"
import placesReducer from "./store/places-reducer"

//create our root reducer with combineReducer
const rootReducer = combineReducers({
  places: placesReducer
})

//2nd arg is for apply middleWare
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}


import React from 'react';
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from "./navigation/PlacesNavigator"
import placesReducer from "./store/places-reducer"
import { init } from "./helpers/db"

//initialize database
init().then(() => {
  console.log("Initialized database")
}).catch(err => {
  console.log("Initializing db failed")
  console.log(err)
})

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


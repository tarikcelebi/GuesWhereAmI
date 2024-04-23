
import React from "react";
import RootNavigation from "./src/navigation/rootNavigation.js"
import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";


export default function App() {

  return (
    <Provider store={store}>
        <RootNavigation/>
    </Provider>
)}



import React, { useState, useEffect } from "react";
import RootNavigation from "./src/navigation/rootNavigation.js";
import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";
import * as Location from "expo-location";
import { UserLocationContext } from "./src/context/UserLocationContext.js";

export default function App() {

  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}

import React, { useState, useEffect } from "react";
import RootNavigation from "./src/navigation/rootNavigation.js";
import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync,2000);

  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}

import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import app from "../firebaseConfig";
import { useSelector } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const RootNavigation = () => {
  const { isAuth } = useSelector((state) => state.user);
  console.log(isAuth);

  const [fontsLoaded] = useFonts({
    black: require("../../assets/fonts/Inter-Black.ttf"),
    bold: require("../../assets/fonts/Inter-Bold.ttf"),
    medium: require("../../assets/fonts/Inter-Medium.ttf"),
    regular: require("../../assets/fonts/Inter-Regular.ttf"),
    semiBold: require("../../assets/fonts/Inter-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing until the fonts are loaded
  }

  return (
    
      <NavigationContainer onReady={onLayoutRootView}>
        {isAuth ? <UserStack /> : <AuthStack />}
      </NavigationContainer>

  );
};

export default RootNavigation;

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { retry } from "@reduxjs/toolkit/query";
import {
  ProfilePage,
  HomePage,
  PlacesPage,
  ChatPage,
  NotificationsPage,
} from "../screens/Index";
import TabBar from "../components/TabBar";


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyBoard: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "white",
  },
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}  tabBar={props=><TabBar{...props}/>} >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        size={24}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        size={24}
        options={{
          title: "Profile",
        }}
      />
      <Tab.Screen
        name="PlacesPage"
        component={PlacesPage}
        size={24}
        options={{
          title: "Places",
        }}
      />
      <Tab.Screen
        name="ChatPage"
        component={ChatPage}
        size={24}
        options={{
          title: "Chat",
        }}
      />
      <Tab.Screen
        name="NotificationsPage"
        component={NotificationsPage}
        size={24}
        options={{
          title: "Notifications",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({});

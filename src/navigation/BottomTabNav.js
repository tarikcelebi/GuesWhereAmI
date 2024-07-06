import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  SimpleLineIcons,

  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { retry } from "@reduxjs/toolkit/query";
import {
  ProfilePage,
  HomePage,
  PlacesPage,
  ChatPage,
  NotificationPage,
} from "../screens/Index";

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
    backgrountColor: "white",
  },
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        size={24}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
                size={24}
                color={focused ? "black" : "white"}
              />
            );
          },
        }}
      />
      {/*       <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        size={24}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? "black" : "white"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="PlacesPage"
        component={PlacesPage}
        size={24}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
                size={24}
                color={focused ? "black" : "white"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ChatPage"
        component={ChatPage}
        size={24}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color={focused ? "black" : "white"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="NotificationsPage"
        component={NotificationPage}
        size={24}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="settings"
                size={24}
                color={focused ? "black" : "white"}
              />
            );
          },
        }}
      />
      */}
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({});

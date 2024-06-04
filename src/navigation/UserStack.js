// kullanıcı giriş yaptıktan sonra ulaşabileceği sayfalar.
import React from "react";

import {
  HomePage,
  PlacesPage,
  ProfilePage,
  PlaceWallPage,
  CreatePostPage
} from "../screens/Index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlacesPage"
        component={PlacesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaceWallPage"
        component={PlaceWallPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePostPage"
        component={CreatePostPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;

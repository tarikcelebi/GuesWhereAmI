// Kullanıcı giriş yaptıktan sonra ulaşabileceği sayfalar.
import React from "react";

import {
  HomePage,
  PlacesPage,
  ProfilePage,
  PlaceWallPage,
  CreatePostPage,
  ChatPage,
  ChatRoomPage,
} from "../screens/Index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

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
      <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRoomPage"
        component={ChatRoomPage}
        options={({ route, navigation }) => ({
          title: route.params.item ? `Chat with ${route.params.item}` : "Chat Room",
          headerShadowVisible: false,
          headerLeft: () => (
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={hp(4)} color={"#737373"} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserStack;

// burada kullanıcı giriş yapmadan erişebileceği sayfalar.
import React from "react";
import { Login, SignUpPage } from "../screens/Index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
    </Stack.Navigator>
  );
};

export default AuthStack;

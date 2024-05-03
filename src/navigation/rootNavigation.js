// root ile auth stack arasında turnery görevi görerek giriş yapıp yapmamasına göre auth ile user stack arasında yönlendirme yapacak.
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./UserStack.js";
import AuthStack from "./AuthStack.js";
import app from "../firebaseConfig.js";
import { useSelector } from "react-redux";


const rootNavigation = ()=>{

    const {isAuth} = useSelector(state=>state.user);
    console.log(isAuth);

    return(
        <NavigationContainer>
            {isAuth ? <UserStack/> : <AuthStack/>}
        </NavigationContainer>

    )
}


export default rootNavigation;
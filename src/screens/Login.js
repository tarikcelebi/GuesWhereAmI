import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React,{useState} from "react";
import {Loading, TextInputCustom, ButtonCustom} from '../components/Index.js';
import { useSelector, useDispatch } from "react-redux";
import { setEmail,setIsLoading,setPwd } from "../redux/userSlice.js";
import { login } from "../redux/userSlice.js";



const Login = ({ navigation }) => {
  
  const[email,setEmail]=useState("");
  const[pwd,setPwd]=useState("");
  const { isLoading} = useSelector((state)=>state.user);
  // userSlice içerisindeki reducer yapılarını kullanmak için.
  const dispacth = useDispatch();

  console.log(email," ", pwd, " ", isLoading);

  return (
    <View style={styles.container}>
      <Text style={styles.WelcomeText}>WELCOME</Text>
      <Image
        style={styles.image}
        source={require("../../assets/loginIcon.png")}
      />

      <StatusBar style="auto" />

      <TextInputCustom 
        title="Email:"
        secureTextEntry= {false}
        handleOnChangeText={setEmail}
        handleValue={email}
        handlePlaceHolder= "Lütfen emailinizi giriniz."
      />

      <TextInputCustom
        title="Password:"
        secureTextEntry= {true}
        handleOnChangeText={setPwd}
        handleValue={pwd}
        handlePlaceHolder= "Lütfen parolanızı giriniz."
      />

      <ButtonCustom
        title="Sign In"
        handleOnPress={() => dispacth(login({email,pwd}))}
        buttonColor="white"
        pressedButtonColor="blue"
      />

      <ButtonCustom
        title="Sign Up"
        handleOnPress={() => navigation.navigate("SignUpPage")}
        buttonColor="white"
        pressedButtonColor="blue"
      />

      {isLoading ? <Loading /> : null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 12,
  },
  WelcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 10,
  },
});

export default Login;

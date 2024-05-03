import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView,Image, Pressable } from "react-native";
import { TextInputCustom, ButtonCustom, Loading } from "../components/Index.js";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/userSlice.js";

const SignUpPage = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpwd, setConfirmPwd] = useState("");
  const dispatch = useDispatch();
  const {isLoading}=useSelector(state=>state.user)

  const handleRegister = ()=>{
    dispatch(register({email,password}))
  }

  if(isLoading){
    return <Loading/>
  }

  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.title}>
            <Image style={styles.Image} source={require('../../assets/SignUpIcon.png')}/>
          <Text style={styles.SignUp}>Sign Up</Text>
        </View>

        <View style={styles.textInputContainer}>
          <TextInputCustom
            title="Name:"
            secureTextEntry={false}
            handlePlaceHolder="Please enter your name.."
            handleValue={name}
            handleOnChangeText={setName}
          />
          <TextInputCustom
            title="E-Mail:"
            secureTextEntry={false}
            handlePlaceHolder="Please enter your email.."
            handleValue={email}
            handleOnChangeText={setEmail}
          />
          <TextInputCustom
            title="Password:"
            secureTextEntry={true}
            handlePlaceHolder="Please enter your password.."
            handleValue={password}
            handleOnChangeText={setPassword}
          />
        </View>

        <View style={styles.signUpOptions}>
            <ButtonCustom
                title="Sign Up"
                buttonColor="white"
                pressedButtonColor="blue"
                handleOnPress={handleRegister}
            />
        </View>

        <Pressable onPress={()=>navigation.navigate("Login")}>
          <Text style={styles.signInButton}>Already have an account? Sign In</Text>
        </Pressable>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  SignUp: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 10,
  },
  textInputContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent:'space-between',
    padding: 20,
  },
  title: {
    flex: 2,
    paddingTop:50,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpOptions: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    
  },Image: {
    width: 100,
    height: 100,
    margin: 12,
  },signInButton:{
    
  }
});

export default SignUpPage;

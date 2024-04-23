import React from "react";
import { StyleSheet,Pressable,Text } from "react-native";

const ButtonCustom =({title,handleOnPress,buttonColor,pressedButtonColor})=>{

    return(
        <Pressable
        onPress={() => handleOnPress()}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? pressedButtonColor : buttonColor,
          },
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>

    );
}


const styles = StyleSheet.create({
    button: {
        width: "80%",
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius: 10,
        opacity: 0.5,
      },
      buttonText: {
        color: "black",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
      },
});


export default ButtonCustom;
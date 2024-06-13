import React from "react";
import { View, Text, TouchableOpacity, Image,StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const ChatItem = ({ item }) => {
  return (

      <TouchableOpacity style={styles.container}> 
        <Image source={require("../../assets/imageKro.jpeg")} style={{height:hp(6),aspectRatio:1}}/>
      </TouchableOpacity>

  );
};
const styles = StyleSheet.create({
    container:{
      margin:10,
      padding:10,
      
    }
})

export default ChatItem;

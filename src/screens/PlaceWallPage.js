import react, { useState, useEffect } from "react";
import { Text, StyleSheet, Button, SafeAreaView,View,TouchableOpacity } from "react-native";
import { NavBar, ButtonCustom, TextInputCustom,Posts,Header } from "../components/Index.js";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";




const PlaceWallPage = ({ navigation }) => {
  console.log("7.line(PlaceWallPage):");

  const placeName = useSelector((state) => state.user);
  console.log(placeName.placeName);
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Posts/>
      <Text>{placeName.placeName}</Text>
      <View>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
        
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
  },
});

export default PlaceWallPage;

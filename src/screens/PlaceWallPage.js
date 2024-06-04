import react, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import {
  NavBar,
  ButtonCustom,
  TextInputCustom,
  Posts,
  Header,
} from "../components/Index.js";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const PlaceWallPage = ({ navigation }) => {
  console.log("7.line(PlaceWallPage):");

  const user = useSelector((state) => state.user);
  console.log(user.placeName);
  const placeName = user.placeName;
  return (
    <SafeAreaView style={styles.container}>
      <Header title={placeName}/>
      <Posts  />

      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};
      
{/*       <View style={styles.main}>
        <Text style={styles.debugBorder}>{placeName}</Text>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View> */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
});

export default PlaceWallPage;

import React from "react";
import MapView from "react-native-maps";
import { View, StyleSheet, SafeAreaView } from "react-native"
import NavBar from "../components/NavBar";
import * as Location from 'expo-location';


const PlacesPage = ({navigation}) => {

  

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default PlacesPage;

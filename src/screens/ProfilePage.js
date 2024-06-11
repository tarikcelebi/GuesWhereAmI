import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import NavBar from "../components/NavBar";

const ProfilePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ProfilePage</Text>
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 3,
  },
});

export default ProfilePage;

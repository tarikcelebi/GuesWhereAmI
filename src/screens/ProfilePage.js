import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [errorMsg, setErrorMsg] = useState(null);
  console.log(user);

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    async () => {
      requestPermission();
      if (permission?.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg + "line 28");
        return;
      }
    };
  }, []);

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

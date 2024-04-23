import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import ButtonCustom from "../components/ButtonCustom.js";

const HomePage = () => {
  const [data, setData] = useState({});
  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        title: "zero to hero",
        content: "First mobile app exercise.",
        lesson: 97,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      setData([...doc.data()]);
    });
  };

  //Delete data

  const deleteData = async () => {
    const docRef = await deleteDoc(doc(db, "users", "1"));
    console.log("Document deleted with ID: ", docRef.id);
  };

  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
      <Text>{data.title}</Text>
      <Text>{data.content}</Text>
      <Text>{data.lesson}</Text>
      <ButtonCustom
        title="Save"
        buttonColor="white"
        pressedButtonColor="blue"
        handleOnPress={sendData}
      />
      <ButtonCustom
        title="Get Data"
        buttonColor="white"
        pressedButtonColor="blue"
        handleOnPress={getData}
      />
      <ButtonCustom
        title="delete Data"
        buttonColor="white"
        pressedButtonColor="blue"
        handleOnPress={deleteData}
      />
    </View>
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

export default HomePage;

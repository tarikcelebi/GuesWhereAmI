import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice.js";
import NavBar from "../components/NavBar.js";
import ButtonCustom from "../components/ButtonCustom.js";


const HomePage = ({navigation}) => {
  const [data, setData] = useState([]);
  const dispacth = useDispatch();

  const handleLogout = () => {
    dispacth(logout());
  };

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
    const allData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`, "line 31");
        allData.push({ ...doc.data(), id: doc.id });
      });
      setData(allData);
    } catch (error) {
      console.log(error, "line 35");
    }
  };

  const updateData = async (value) => {
    const userData = await doc(db, "users", value);
    const update = await updateDoc(userData, {
      title: "Updated title",
    });
  };

  //Delete data

  const deleteData = async () => {
    const docRef = await deleteDoc(doc(db, "users", "1"));
    console.log("Document deleted with ID: ", docRef.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>HomePage</Text>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <Text>{item.id}</Text>
              <Text>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text>{item.lesson}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.main}>
        <ButtonCustom
          title="Save"
          buttonColor="white"
          pressedButtonColor="blue"
          handleOnPress={sendData}
        />
        <ButtonCustom
          title="logout"
          buttonColor="white"
          pressedButtonColor="blue"
          handleOnPress={handleLogout}
        />
      </View>
      <NavBar
      navigation={navigation}
      />
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
  main: {
    flex: 3,
  },

});

export default HomePage;

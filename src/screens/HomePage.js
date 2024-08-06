import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice.js";
import NavBar from "../components/NavBar.js";
import ButtonCustom from "../components/ButtonCustom.js";
import Datas from "../../Data.js";
import * as geofire from "geofire-common";

const HomePage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState({});
  const dispacth = useDispatch();

  const handleLogout = () => {
    dispacth(logout());
  };

  const sendData = async () => {
    try {
      const promises = Datas.map(async (item) => {
        const { id, latitude, longitude, title, image } = item;
        console.log(`Processing item: ${title}`); // Debugging
        const imageUrl = await uploadImageToStorage(image);
        const hash = geofire.geohashForLocation([latitude, longitude]);

        await addDoc(collection(db, "locations"), {
          id,
          geohash: hash,
          lat: latitude,
          lng: longitude,
          title,
          image: imageUrl,
        });
      });

      await Promise.all(promises);
      console.log("All documents have been written successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const uploadImageToStorage = async (image) => {
    try {
      // Resolve the asset source to get the URI
      const assetSource = Image.resolveAssetSource(image);
      console.log(`Image URI: ${assetSource.uri}`); // Debugging
      const response = await fetch(assetSource.uri);
      const blob = await response.blob();

      // Extract file name from the URI
      const fileName = assetSource.uri.split("/").pop();
      const storageRef = ref(storage, `images/${fileName}`);
      console.log(`Uploading ${fileName} to Firebase Storage`); // Debugging

      // Upload the blob to Firebase Storage
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);
      console.log(`Uploaded Image URL: ${imageUrl}`); // Debugging
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
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
        <StatusBar barStyle="light-content" />
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

      {/*    <NavBar navigation={navigation} />  */}
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
  footer: {
    flex: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
});

export default HomePage;

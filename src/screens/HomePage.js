import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform,
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/userSlice.js";
import NavBar from "../components/NavBar.js";
import Datas from "../../Data.js";
import * as geofire from "geofire-common";
import { fetchPlaces, fetchPopularPlaces } from "../redux/reducers/placeSlice";
import * as Location from "expo-location";
import { MapCallout } from "react-native-maps";
import { PopularPlaceList, ButtonCustom } from "../components/Index";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const HomePage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState({});
  const dispatch = useDispatch();
  const initialLocation = {
    latitude: 37.785834,
    longitude: -122.406417,
  };
  const [mylocation, setMyLocation] = useState(initialLocation);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState({});
  const posts = useSelector((state) => state.place.places);
  const popularPlaces = useSelector((state) => state.place.popularPlaces);
  console.log(popularPlaces);

  const postsNumber = posts.length;
  /*   console.log("mekanlar: ", posts);
   */
  const local = {
    latitude: "37.785834",
    longitude: "-122.406417",
  };

  useEffect(() => {
    setPin(local),
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          console.log(errorMsg + "line 28");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setMyLocation(location.coords);
        /* console.log("Line 53(PlacesPage):");
        console.log(location.coords); */
      })();
  }, []);

  // Fetch the cafes only nearby to the user from the firebase

  useEffect(() => {
    if (mylocation.latitude && mylocation.longitude) {
      // Dispatch the fetchPlaces action with the current location
      dispatch(fetchPlaces(mylocation));
      dispatch(fetchPopularPlaces());
    }
  }, [mylocation, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const sendData = async () => {
    /*  try {
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
    } */
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
      <StatusBar barStyle="light-content" />
      <View style={styles.textConStyle}>
        <Text style={{ fontWeight: "600", color: "white" }}>
          Recommended Places
        </Text>
      </View>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 12,
          paddingBottom: 80,
        }}
        data={popularPlaces}
        renderItem={({ item }) => <PopularPlaceList item={item} />}
        keyExtractor={(item, idx) => item.title + idx}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ marginVertical: 10 }}
        ListHeaderComponent={() => {
          return (
            <View>
              <FlatList
                horizontal={true}
                style={{ paddingVertical: 5 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
                data={popularPlaces}
                keyExtractor={(item, idx) => item.title + idx}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      height: hp(30),
                      width: wp(90),
                      borderRadius: 20,
                      ...Platform.select({
                        ios: {
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                        },
                        android: {
                          elevation: 5,
                        },
                      }),
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "stretch",
                        borderRadius: 20,
                      }}
                    />
                    
                  </TouchableOpacity>
                )}
              />
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: 12,
                  marginTop: 15,
                }}
              >
                <Text style={{ fontWeight: "600", color: "white" }}>
                  Popular Places
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  textConStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 15,
  },
});

export default HomePage;

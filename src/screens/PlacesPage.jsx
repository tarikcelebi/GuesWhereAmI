import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Callout,
  CalloutSubview,
} from "react-native-maps";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  Button,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import NavBar from "../components/NavBar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "../../environment";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { userEnteredPlaceInfo } from "../redux/reducers/userSlice.js";
import Datas from "../../Data.js";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as geofire from "geofire-common";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { fetchPlaces } from "../redux/reducers/placeSlice";
import { CustomMarker, PlaceMarkerItem } from "../components/Index.js";
import BottomSheet, {
  useBottomSheet,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
/* const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}; */

const PlacesPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nearbyCafes = useSelector((state) => state.place.places);
  console.log("cafes:", nearbyCafes);
  const [selectedPlace, setSelectedPlace] = useState("");
  console.log(selectedPlace);

  const local = {
    latitude: "40.9776",
    longitude: "28.8189",
  };
  const sheetRef = useRef < BottomSheet > null;

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  // Fetch the cafes only nearby to the user from the firebase

  const handleCalloutPress = ({ id, title, lat, lng }) => {
    console.log("sss",id);
    dispatch(
      userEnteredPlaceInfo({
        placeId: id,
        placeName: title,
        latitude: lat,
        longitude: lng,
      })
    );
    navigation.navigate("PlaceWallPage");

  };
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: local.latitude,
          longitude: local.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        showsUserLocation
      >
        {/*          {local.latitude && local.longitude && (
            <Marker
              style={styles.marker}
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              region={{
                latitude: local.latitude,
                longitude: local.longitude,
                latitudeDelta: 0.4,
                longitudeDelta: 0.4,
              }}
              title="Default Location"
              description="I am here"
            >
              <Callout style={styles.placeCallout} onPress={handleCalloutPress}>
                <Text style={styles.text}>Heyy</Text>
                <Button title="Go to Place Wall" />
              </Callout>
            </Marker>
          )} 
          {local.latitude && local.longitude && (
            <Marker
              style={styles.marker}
              coordinate={{
                latitude: parseFloat(local.latitude),
                longitude: parseFloat(local.longitude),
              }}
              title="Default Location"
              description="I am here"
            >
              <Callout style={styles.placeCallout} onPress={handleCalloutPress}>
                <Text style={styles.text}>California CoffeeShop</Text>
                <Button title="Go to Place Wall" />
              </Callout>
            </Marker>
          )} */}
        {nearbyCafes.map((cafe) => (
          <CustomMarker
            key={cafe.id}
            cafe={cafe}
            onPress={() => setSelectedPlace(cafe)}
          />
        ))}
      </MapView>
      {selectedPlace && (
        <View style={styles.selectedContainer}>
          <PlaceMarkerItem
            place={selectedPlace}
            onPress={()=>handleCalloutPress({
              id: selectedPlace.id,
              title: selectedPlace.title,
              lng: selectedPlace.lng,
              lat: selectedPlace.lat,
            })}
          />
        </View>
      )}
      {/* <BottomSheet
        ref={sheetRef}
        onChange={handleSheetChange}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet> */}

      <View style={styles.searchingContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: API_KEY,
            language: "en",
          }}
        />
      </View>

      {/*       <BottomSheet index={0} snapPoints={snapPoints}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listTitle}>Over {nearbyCafes.length} places</Text>
          <BottomSheetFlatList
            data={nearbyCafes}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => <PlaceMarkerItem place={item} />}
          />
        </View>
      </BottomSheet> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  marker: {
    position: "absolute",
    width: 100,
    height: 100,
  },
  searchingContainer: {
    position: "absolute",
    width: "95%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 4,
    marginTop: 70,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  placeCallout: {
    width: wp("50%"),
    height: hp("60%"),
    padding: 5,
    alignItems: "center",
  },
  image: {
    width: wp("40%"),

    marginBottom: 5,
    resizeMode: "stretch",
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  calloutView: {
    flex: 1,
  },
  listTitle: {
    textAlign: "center",
    fontFamily: "InterSemi",
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
  selectedContainer: {
    position: "absolute",
    bottom: 100,
    right: 10,
    left: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default PlacesPage;

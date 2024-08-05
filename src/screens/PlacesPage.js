import React, { useState, useEffect, useContext, useCallback } from "react";
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
} from "react-native";
import NavBar from "../components/NavBar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "../../environment";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { userEnteredPlaceInfo } from "../redux/reducers/userSlice.js";
import Datas from "../../Data.js";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAt, 
  endAt
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as geofire from 'geofire-common';
 
const calculateDistance = (lat1, lon1, lat2, lon2) => {
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
};

const calculateBoundingBox = (lat, lon, distanceInKm) => {
  const R = 6371; // Radius of the Earth in km
  const angularDistance = distanceInKm / R;

  const latChange = angularDistance * (180 / Math.PI);
  const lonChange =
    (angularDistance * (180 / Math.PI)) / Math.cos(lat * (Math.PI / 180));

  const minLat = lat - latChange;
  const maxLat = lat + latChange;
  const minLon = lon - lonChange;
  const maxLon = lon + lonChange;

  return { minLat, maxLat, minLon, maxLon };
};

const PlacesPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialLocation = {
    latitude: 37.785834,
    longitude: -122.406417,
  };
  const [mylocation, setMyLocation] = useState(initialLocation);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState({});
  const [cafes, setCafes] = useState([]);
  const [nearbyCafes, setNearbyCafes] = useState([]);

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
    const fetchCafes = async () => {
      try {
        const center = [mylocation.latitude, mylocation.longitude];
        const radiusInM = 7 * 1000;


        // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
        // a separate query for each pair. There can be up to 9 pairs of bounds
        // depending on overlap, but in most cases there are 4.
        const bounds = geofire.geohashQueryBounds(center, radiusInM);
        const promises = [];
        for (const b of bounds) {
          const q = query(
            collection(db, "locations"),
            orderBy("GeoPoint"),
            startAt(b[0]),
            endAt(b[1])
          );
         console.log(q);
          promises.push(getDocs(q));
        }
       

        // Collect all the query results together into a single list
        const snapshots = await Promise.all(promises);

        const matchingDocs = [];
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get("lat");
            const lng = doc.get("lng");


            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        setNearbyCafes(matchingDocs);
        console.log("Datas:", matchingDocs);
      } catch (err) {
        console.log("Error fetching cafes:", err);
      }
    };

    fetchCafes();
  }, [mylocation]);

  /*   useEffect(() => {
    if (mylocation && cafes.length > 0) {
      const nearbyCafes = cafes.filter(
        (cafe) =>
          calculateDistance(
            mylocation.latitude,
            mylocation.longitude,
            cafe.latitude,
            cafe.longitude
          ) <= 2
      );
      setNearbyCafes(nearbyCafes);
      console.log("Line 95(PlacePage)");
      console.log(nearbyCafes);
    }
  }, [mylocation, cafes]); */

  const handleCalloutPress = ({ id, title }) => {
    dispatch(
      userEnteredPlaceInfo({
        placeId: id,
        placeName: title,
        latitude: mylocation.latitude,
        longitude: mylocation.longitude,
      })
    );
    navigation.navigate("PlaceWallPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: mylocation.latitude,
            longitude: mylocation.longitude,
          }}
        >
          {mylocation.latitude && mylocation.longitude && (
            <Marker
              style={styles.marker}
              coordinate={{
                latitude: mylocation.latitude,
                longitude: mylocation.longitude,
              }}
              region={{
                latitude: mylocation.latitude,
                longitude: mylocation.longitude,
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
          {pin.latitude && pin.longitude && (
            <Marker
              style={styles.marker}
              coordinate={{
                latitude: parseFloat(pin.latitude),
                longitude: parseFloat(pin.longitude),
              }}
              title="Default Location"
              description="I am here"
            >
              <Callout style={styles.placeCallout} onPress={handleCalloutPress}>
                <Text style={styles.text}>California CoffeeShop</Text>
                <Button title="Go to Place Wall" />
              </Callout>
            </Marker>
          )}
          {nearbyCafes.map((cafe) => (
            <Marker
              key={cafe.id}
              coordinate={{
                latitude: cafe.latitude,
                longitude: cafe.longitude,
              }}
            >
              <Callout
                style={styles.placeCallout}
                onPress={() => {
                  handleCalloutPress({ id: cafe.id, title: cafe.title });
                }}
              >
                <Text style={styles.text}>{cafe.title}</Text>
                <Button title="Go to place wall" />
              </Callout>
            </Marker>
          ))}
        </MapView>

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
      </View>
      {/*  <NavBar navigation={navigation} /> */}
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
    width: 200,
    height: 200,
    flex: 1,
    alignItems: "center",
  },
});

export default PlacesPage;

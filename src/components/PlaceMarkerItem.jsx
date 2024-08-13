import {
  View,
  Text,
  Image,
  Pressable,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React,{useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/reducers/placeSlice";

const PlaceMarkerItem = ({ place,onPress }) => {
  console.log("place mark ", place.id);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(place.id));
  }, [dispatch, place.id]);

  return (
    <View style={styles.card}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.price}>Go to Place Wall</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{place.title}</Text>
      </View>
      <View style={styles.footer}>
        {/*         <Text style={styles.price}>${place.price} / night</Text>
        <Text style={styles.price}>hi</Text> */}
      </View>
    </View>
  );
};

// StyleSheet for the component
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom:10
  },
  image: {
    width: wp("40%"),
    height: hp("15%"),
    borderRadius: 10,
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlaceMarkerItem;

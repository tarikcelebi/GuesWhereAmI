import react, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  NavBar,
  ButtonCustom,
  TextInputCustom,
  Post,
  Header,
} from "../components/Index.js";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/reducers/placeSlice.js";
import { Loading } from "../components/Index.js";

const PlaceWallPage = ({ navigation }) => {
  console.log("7.line(PlaceWallPage):");

  const user = useSelector((state) => state.user);
  const placeName = user.placeName;
  const dispatch = useDispatch();
  const placeId = user.placeId;
  console.log("placeName", placeName);
  console.log("placeId", placeId);
  const { places,posts, isLoading } = useSelector((state) => state.place);
  console.log("placeWallPage: ", posts, "isloading: ", isLoading);

/*     useEffect(() => {
    dispatch(fetchPosts(placeId));
  }, [dispatch, placeId]); */

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Header title={placeName} />
          </View>
          <ScrollView>
            {posts.map((post, index) => {
              return <Post post={post} key={index} />;
            })}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

{
  /*       <View style={styles.main}>
        <Text style={styles.debugBorder}>{placeName}</Text>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View> */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  headerContainer: {
    marginTop: 10,
  },
});

export default PlaceWallPage;

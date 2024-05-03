import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomePage");
        }}
      >
        <Image
          style={styles.image}
          source={require("../../assets/HomePageIcon.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfilePage");
        }}
      >
        <Image
          style={styles.image}
          source={require("../../assets/ProfileIcon.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PlacesPage");
        }}
      >
        <Image
          style={styles.image}
          source={require("../../assets/LocationIcon.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require("../../assets/MessageIcon.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require("../../assets/notificationIcon.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "tomato",
    height: 80, // Adjust the height as needed
    borderTopWidth: 1,
    borderTopColor: "gray",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default NavBar;

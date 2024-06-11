import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get('window');
const NAVBAR_HEIGHT = height * 0.10; 

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
      <TouchableOpacity onPress={()=>{
        navigation.navigate("ChatPage");
      }}>
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
    height: NAVBAR_HEIGHT, 
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

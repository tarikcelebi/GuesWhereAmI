import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';


const ChatItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("ChatRoomPage",{item})}} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Image
            source={require("../../assets/imageKro.jpeg")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Nami</Text>
            <Text style={styles.statusText}>Last Message</Text>
          </View>
        </View>
        <Text style={styles.titleText}>time</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(6) / 2,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  titleText: {
    fontSize: 14,
    color: "black", // Adjust color as needed
  },
  statusText:{
    fontSize: 12,
    color: "gray",
    padding:5
  },
  textContainer:{
    justifyContent:"space-between",
    flexDirection:"column"
  }
});

export default ChatItem;

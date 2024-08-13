import { View, Text, StyleSheet, Image,Platform } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import Octicons from "@expo/vector-icons/Octicons";

export default function PopularPlaceList({ item }) {
  console.log(item.image);
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={{
          flex: 4,
          height: "100%",
          width: "100%",
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
      </View>
      <View
        style={{
          flex: 2,
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ color: "white", fontWeight: "500", paddingLeft: 10,paddingTop:5 }}>
          {item.title}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Octicons name="feed-discussion" size={24} color="white" />
            <Text style={{ color: "white", fontWeight: 600, paddingLeft: 10 }}>
              {item.numberOfPosts}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Octicons name="people" size={24} color="white" />
            <Text style={{ color: "white", fontWeight: 600, paddingLeft: 10 }}>
              {item.numberOfPosts}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "tomato",
    flex: 1,
    height: hp(25),
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
  },
});

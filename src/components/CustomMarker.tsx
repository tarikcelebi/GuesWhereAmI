import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import Foundation from "@expo/vector-icons/Foundation";

const CustomMarker = ({ cafe, onPress }) => {
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: cafe.lat,
        longitude: cafe.lng,
      }}
    >
      {
        <View
          style={{
            backgroundColor: "white",
            padding: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 20,
          }}
        >
          <Foundation name="marker" size={24} color="black" />
        </View>
      }
    </Marker>
  );
};

export default CustomMarker;

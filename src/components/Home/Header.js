import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = (prop) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.TextHeader}>{prop.title}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate("CreatePostPage")}>
          <Ionicons style={styles.icon} name="add-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  TextHeader: {
    width: 150,
    height: 30,
    fontSize:20,

  },
  iconContainer: {
    flexDirection: "row",
    color: "black",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    color:"black"
  },
});

export default Header;

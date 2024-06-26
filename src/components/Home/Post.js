import React from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import Datas from "../../../Data";
import { terminate } from "firebase/firestore";
import { Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import iconSet from "@expo/vector-icons/build/Fontisto";
import { useNavigation } from "@react-navigation/native";

const Post = ({ post }) => {
  return (
    <View style={styles.container}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostFooter post={post} />
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://imgv3.fotor.com/images/slider-image/Female-portrait-photo-enhanced-with-clarity-and-higher-quality-using-Fotors-free-online-AI-photo-enhancer.jpg",
          }}
        ></Image>
        <Text style={styles.text}>{post.postContent}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons
          style={styles.icon}
          name="ellipsis-horizontal-outline"
          size={25}
          color="black"
        ></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

const PostFooter = ({ post }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <View
        style={{
          flexDirection: "row",
          width: "32%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChatRoomPage", { userId: post.userId })
          }
        >
          <Ionicons name="paper-plane-outline" size={25} />
        </TouchableOpacity>
        {/*         <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={25} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  text: {
    color: "white",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    marginLeft: 5,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 70,
  },
  footer: {
    flexDirection: "row",
    margin: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
});

export default Post;

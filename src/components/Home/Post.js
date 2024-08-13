import React, { useState } from "react";
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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TimeCalculator from "../../utils/TimeCalculator";

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
  const date = TimeCalculator(post.createdAt);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.imageStyle}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://imgv3.fotor.com/images/slider-image/Female-portrait-photo-enhanced-with-clarity-and-higher-quality-using-Fotors-free-online-AI-photo-enhancer.jpg",
          }}
        />
      </View>
      <View style={styles.contentStyle}>
        <Text style={styles.text}>{post.postContent}</Text>
      </View>
      <View style={styles.detailStyle}>
        <TouchableOpacity>
          <Ionicons
            style={styles.icon}
            name="ellipsis-horizontal-outline"
            size={25}
            color="black"
          ></Ionicons>
        </TouchableOpacity>
        <Text style={styles.text}>{date}</Text>
      </View>
    </View>
  );
};

const PostFooter = ({ post }) => {
  const navigation = useNavigation();
  const [isHeartFilled, setHeartFilled] = useState(false);
  
  const handleHeartClick = () => {
    setHeartFilled(!isHeartFilled);
  };
  return (
    <View style={styles.footer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: wp("15%"),
        }}
      >
        <TouchableOpacity onPress={handleHeartClick}>
          <Ionicons
            name={isHeartFilled ? "heart" : "heart-outline"}
            style={{ color: isHeartFilled ? "red" : "black" }}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChatRoomPage", { userId: post.userId })
          }
        >
          <Ionicons name="paper-plane-outline" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    borderWidth: 1,
  },
  text: {
    color: "white",
    padding: 10,
  },
  headerContainer: {
    borderWidth: 1,
    flexDirection: "row",
  },
  imageStyle: {
    flex: 1,
    borderWidth: 1,
    height: hp(10),
    alignItems: "center",
    justifyContent: "center",
  },
  contentStyle: {
    flex: 3,

    justifyContent: "flex-start",
    borderWidth: 1,
  },
  detailStyle: {
    flex: 1,
    borderWidth: 1,
    flexDirection: "column",
  },
  avatar: {
    borderWidth: 1,
    height: hp("8%"),
    width: wp("16%"),
    borderRadius: 999,
  },
  footer: {
    flexDirection: "row",
    margin: 5,
  },
  icon: {
    width: wp(25),
    height: hp(25),
    marginLeft: 15,
  },
});

export default Post;

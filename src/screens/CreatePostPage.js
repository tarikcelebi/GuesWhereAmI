import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput,Alert } from "react-native";
import { ButtonCustom, Loading } from "../components/Index.js";
import { useDispatch, useSelector } from "react-redux";
import { AddPostToPlaceWall } from "../redux/reducers/placeSlice.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const getCurrentUserFromDB = async () => {
  const docRef = doc(db, "Users", "currentUser");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const userID = docSnap.data();
    console.log("docDATA", userID.id);
    return userID.id;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

const CreatePostPage = () => {
  const [content, setPostContent] = useState("");
  const dispatch = useDispatch();
  const placeID = useSelector((state) => state.user.placeId);

  const handlePostContentChange = (text) => {
    setPostContent(text);
  };

  console.log(typeof AddPostToPlaceWall);

  const shareContentHandling = async () => {
    try {
      const currentUser = await getCurrentUserFromDB();
      if (currentUser && placeID) {
        await dispatch(AddPostToPlaceWall({
          placeUID: placeID,
          text: content,
          userUID: currentUser // Use the document ID from the returned data
        }));
        Alert.alert("Success", "Post shared successfully!");
      } else {
        console.log("User or Place ID is not available");
        Alert.alert("Error", "User or Place ID is not available");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
      Alert.alert("Error", "Error sharing content");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Please write something to share"
          style={styles.PostContent}
          multiline={true}
          textAlignVertical="top"
          value={content}
          onChangeText={handlePostContentChange}
        />
        <ButtonCustom
          title="Share Post&Check-In"
          handleOnPress={shareContentHandling}
          buttonColor="white"
          pressedButtonColor="blue"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  PostContent: {
    height: 200,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "white",
    color: "white",
    fontWeight: "bold",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});

export default CreatePostPage;

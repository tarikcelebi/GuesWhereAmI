import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput,Alert } from "react-native";
import { ButtonCustom, Loading } from "../components/Index.js";
import { useDispatch, useSelector } from "react-redux";
import { AddPostToPlaceWall } from "../redux/reducers/placeSlice.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { getAuth } from "firebase/auth";

/* const getCurrentUserFromDB = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  console.log(currentUser,"line 13 createPost");

  if (currentUser) {
    const docRef = doc(db, "Users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();  // Return the whole document data if needed
    } else {
      console.log("No such document!");
      return null;
    }
  } else {
    console.log("No user is authenticated");
    return null;
  }
}; */

const CreatePostPage = () => {
  const [content, setPostContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const placeID = user.placeId;
  const userUID = user.user.uid;
  console.log(placeID,userUID);
  

  const handlePostContentChange = (text) => {
    setPostContent(text);
  };

  const handleShareContent = async () => {
    try {
      if (userUID && placeID) {
        await dispatch(AddPostToPlaceWall({
          placeUID: placeID,
          text: content,
          userUID: userUID 
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
          handleOnPress={handleShareContent}
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

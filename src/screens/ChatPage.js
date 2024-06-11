import { GiftedChat } from "react-native-gifted-chat";
import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import NavBar from "../components/NavBar";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Loading,ChatList } from "../components/Index";

const ChatPage = ({ navigation }) => {
  const [people, setPeople] = useState([1,2,3]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text}>Mesajlar</Text>
      </View>
      <ScrollView style={styles.body}>
        {people?.length > 0 ? (
          <ChatList users={people} />
        ) : (
            <Loading />
        )}
      </ScrollView>
        <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  text: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    height: "%10",
  },
  body: {
    flex: 4,
    borderColor: "white",
    borderWidth: 1,
  },

});
/* const ChatPage = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const getCurrentUserFromDB = async () => {
      const docRef = doc(db, "Users", "currentUser");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCurrentUserId(userData.id);
      } else {
        console.log("No such document!");
      }
    };

    getCurrentUserFromDB();
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(messages) => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
        textInputStyle={{
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
        user={{
          _id: currentUserId,
          avatar: "https://i.pravatar.cc/300",
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); */

export default ChatPage;

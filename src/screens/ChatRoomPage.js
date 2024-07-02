import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef,useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import getRoomId from "../utils/common.js";
import { useDispatch, useSelector } from "react-redux";
import { State } from "react-native-gesture-handler";
import { Timestamp, setDoc, doc, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import {MessagesList} from "../components/Index.js"

const ChatRoomPage = ({ route,navigation }) => {
  const { item } = route.params || {};
  const { users } = item || {};
  const userId = users?.[1]; 
  console.log(userId);
  const user = useSelector((state) => state.user);
  const currentUserId = user.user.uid;
  console.log(user.user.uid);
  const textRef = useRef("");
  const inputRef = useRef("");
  const [messages,setMessages]=useState([]);

  useEffect(() => {
    createRoomIfNotExist();
    if(userId===currentUserId){
      
    }
    let roomId = getRoomId(currentUserId, userId);
    const docRef = doc(db,"rooms", roomId);
    const messageRef = collection(docRef,"messages");

    const q = query(messageRef, orderBy("createdAt","asc"));

    let onSub = onSnapshot(q, (snapshot)=>{
      let allMessages = snapshot.docs.map(doc=>{
        return doc.data();
      })
      setMessages([...allMessages]);
    })

  }, []);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(currentUserId, userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const newRef = await addDoc(messagesRef, {
        userId: currentUserId,
        text: message,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log(newRef.id, "new Message id--");
    } catch (err) {
      console.log(err, "line 39 chatRoomPage");
    }
  };

  const createRoomIfNotExist = async () => {
    if (currentUserId && userId) {
      let roomId = getRoomId(currentUserId, userId);
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        users: [currentUserId, userId],
        createdAt: Timestamp.fromDate(new Date()),
      });
    } else {
      alert("Kullanıcı bulunamadı.");
    }
  };

  return (
    <View>
      <View style={styles.chatContainer}>
        <View style={styles.chatListContainer}>
          <MessagesList messages={messages} currentUser={currentUserId}/>
        </View>
        <View style={styles.typeHereContainer}>
          <TextInput
            ref={inputRef}
            onChangeText={(value) => (textRef.current = value)}
            style={styles.textInput}
            placeholder="type here..."
            autoFocus={true}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Feather name="send" size={hp(3)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    margin: 5,
  },
  chatListContainer: {
    height: hp("80%"),
    borderWidth: 1,
    marginBottom: 5,
  },
  typeHereContainer: {
    marginBottom: 5,
    height: hp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: hp("2%"),
    borderColor: "gray",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textInput: {
    height: hp("100%"),
    width: wp("85%"),
    borderRadius: hp("2%"),
    fontSize: hp(2),
  },
});

export default ChatRoomPage;

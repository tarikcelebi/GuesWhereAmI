import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
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
import getRoomId from "../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { State } from "react-native-gesture-handler";

const ChatRoomPage = ({ route }) => {
  const { userId } = route.params;  // Access userId from route.params
  console.log(userId);
  const user = useSelector((state) => state.user);
  const currentUserId = user.user.user_id;
  console.log(user.user.user_id);

  useEffect(() => {
    createRoomIfNotExist(); 
  }, []);

  const createRoomIfNotExist = async () => {
    if(currentUserId&&userId){
      let roomId = getRoomId(userId,currentUserId)
    }
    else{
      alert("Kullanıcı bulunamadı.")
    }
    
  };

  return (
    <View>
      <View style={styles.chatContainer}>
        <View style={styles.chatListContainer}>
          <Text>ChatRoomPage</Text>
        </View>
        <View style={styles.typeHereContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="type here..."
            autoFocus={true}
            
          />
          <TouchableOpacity>
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

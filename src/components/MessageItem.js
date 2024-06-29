import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from "react-native-responsive-screen";


const MessageItem = ({ message, index, currentUser }) => {
    if(currentUser===message?.userId){// means logged in user message
        console.log(message)
        return (
            <View style={styles.container}>
                <Text>{message?.text}</Text>
            </View>
        )
    }

};

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    marginVertical:hp(1),
    marginHorizontal:wp(5),
    backgroundColor:"#fff",
    padding:wp(3),
    borderRadius:wp(2),
    elevation:3,
    shadowColor:"#000",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.5,
    shadowRadius:3,
    },
});

export default MessageItem;

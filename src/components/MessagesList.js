import React from "react";
import { View,Text,StyleSheet,ScrollView } from "react-native";
import MessageItem from "./MessageItem";

const MessagesList = ({messages,currentUser})=>{
    console.log(messages);
    return(
        <ScrollView showsVerticalScrollIndicator={false}  style={styles.container}>
            {
                messages.map((message,index)=>{
                    return(
                        <MessageItem message={message} key={index} currentUser={currentUser}/>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10

    }
})

export default MessagesList;
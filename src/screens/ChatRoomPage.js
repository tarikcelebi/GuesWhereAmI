import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatRoomPage = ({route}) => {

    const { item } = route.params;
    console.log(item);
  return (
    <View style={styles.container}>
      <Text>ChatRoomPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ChatRoomPage;

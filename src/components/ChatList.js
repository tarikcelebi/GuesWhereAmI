import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ChatItem from "./ChatItem";

const ChatList = ({ users }) => {
  return (
    <View>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 15 }}
        keyExtractor={(item) => Math.random()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <ChatItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatList;

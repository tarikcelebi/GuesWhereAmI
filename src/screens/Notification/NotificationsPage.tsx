import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
import AppNotificationsLayout from "./_layout";
import { useNavigation } from "@react-navigation/native";

const NotificationsPage = ({ navigation }) => {
  const navigate=useNavigation();
  return (
    <View style={styles.container}>
      <Text>NotificationsPage</Text>
      <Button
        title="Schedule Test notifications"
        onPress={schedulePushNotification}
      ></Button>
       <Button
        title="go to notifications"
        onPress={() => navigate.navigate("AppNotificationsLayout")}
      ></Button>

    </View>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: { seconds: 2 },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationsPage;

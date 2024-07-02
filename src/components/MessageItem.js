import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";

const MessageItem = ({ message, index, currentUser }) => {
    if (currentUser === message?.userId) { // means logged in user message
        return (
            <View style={styles.senderWrapper}>
                <View style={styles.senderContainer}>
                    <Text style={styles.senderText}>{message?.text}</Text>
                </View>
                <View style={styles.senderPointer}></View>
            </View>
        );
    } else {
        return (
            <View style={styles.receiverWrapper}>
                <View style={styles.receiverPointer}></View>
                <View style={styles.receiverContainer}>
                    <Text style={styles.receiverText}>{message?.text}</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    senderWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: hp(1),
        marginHorizontal: wp(5),
    },
    receiverWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: hp(1),
        marginHorizontal: wp(1),
    },
    senderContainer: {
        backgroundColor: "#d1e7dd",
        padding: wp(3),
        borderRadius: wp(2),
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        maxWidth: '80%',
        flexShrink: 1,
        flexGrow: 0,
    },
    receiverContainer: {
        backgroundColor: "#f8d7da",
        padding: wp(3),
        borderRadius: wp(2),
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        maxWidth: '80%',
        flexShrink: 1,
        flexGrow: 0,
    },
    senderPointer: {
        width: 0,
        height: 0,
        borderTopWidth: wp(2),
        borderTopColor: 'transparent',
        borderBottomWidth: wp(2),
        borderBottomColor: 'transparent',
        borderLeftWidth: wp(2),
        borderLeftColor: "#d1e7dd",
        alignSelf: "flex-end",
        marginLeft: -wp(1),
        marginBottom: wp(1.5),
    },
    receiverPointer: {
        width: 0,
        height: 0,
        borderTopWidth: wp(2),
        borderTopColor: 'transparent',
        borderBottomWidth: wp(2),
        borderBottomColor: 'transparent',
        borderRightWidth: wp(2),
        borderRightColor: "#f8d7da",
        alignSelf: "flex-start",
        marginRight: -wp(1),
        marginBottom: wp(1.5),
    },
    senderText: {
        color: "#000",
    },
    receiverText: {
        color: "#000",
    },
});

export default MessageItem;

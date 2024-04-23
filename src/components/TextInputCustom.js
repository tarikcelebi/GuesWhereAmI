import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const TextInputCustom = ({
  title,
  secureTextEntry,
  handleOnChangeText,
  handleValue,
  handlePlaceHolder,
}) => {
  return (
    <View style={styles.inputContainer}>
      <StatusBar style="auto" />
      <Text style={styles.inputTextBox}>{title}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholder={handlePlaceHolder}
        value={handleValue}
        onChangeText={handleOnChangeText}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
  },
  inputTextBox: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "white",
    color: "white",
    fontWeight: "bold",
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
  },
});

export default TextInputCustom;

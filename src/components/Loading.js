import React from "react";
import { ActivityIndicator, Text,View,StyleSheet } from "react-native";

const Loading = (props)=>{
    return(
        <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loading}>Loading..</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loading:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:10
    }
})

export default Loading;
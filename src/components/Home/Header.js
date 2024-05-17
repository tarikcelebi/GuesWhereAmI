import React from "react";
import { View,Text,TouchableOpacity,StyleSheet,Image ,SafeAreaView} from "react-native";



const Header=()=>{
    return(
        <SafeAreaView>
            <TouchableOpacity>
                <Text style={styles.TextHeader}>
                    Place Name and Wall
                </Text>
            </TouchableOpacity>
            <View>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:20
    },
    TextHeader:{
       
        width:100,
        height:60,
        marginTop:100
    }

})

export default Header;
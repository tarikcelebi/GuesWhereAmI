import React from "react";
import { View,TouchableOpacity,SafeAreaView,Image,ScrollView,Text } from "react-native";
import Datas from "../../../Data";

const Posts=()=>{

    return(
        <View style={{marginBottom:13}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    Datas.map((item,index)=>(
                        <View key={index} style={{alignItems:"center", justifyContent:"center" }}>
                            <Image></Image>
                        </View>
                    )
                )}
                
                <Text>Stories</Text>
            </ScrollView>
        </View>
    )
}

/* const styles = StyleSheet.create({
    
}) */

/* const styles = StyleSheet.create({
    container: {

    }
})
 */
export default Posts;
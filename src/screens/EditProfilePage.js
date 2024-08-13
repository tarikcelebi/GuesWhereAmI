import { View, Text,SafeAreaView ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const EditProfilePage = () => {
    const user = useSelector(state => state.user.user);
    console.log(user);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                    <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
        </View>
      <Text>EditProfilePage</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:"tomato",
        flex:1,
    },
    header:{
        flex:2,
        height:hp("20%"),
        padding:12,


    }
})

export default EditProfilePage;
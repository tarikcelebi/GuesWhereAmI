import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { SceneMap, TabView, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";

const PlacesRoutes = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Places</Text>
  </View>
);

const VisitedPlaces = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Visited Places</Text>
  </View>
);



const ProfilePage = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const navigate= useNavigation();

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <PlacesRoutes />;
      case "second":
        return <VisitedPlaces />;
      default:
        return null;
    }
  };

  const [routes] = useState([
    { key: "first", title: "Places" },
    { key: "second", title: "Visited" },
  ]);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        setErrorMsg("Permission to access camera was denied");
        console.log(errorMsg + " line 28");
      }
    };
    getPermission();
  }, []);

  const rendertabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "gray",
      }}
      style={{
        backgroundColor: "white",
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text
          style={{
            color: focused ? "gray" : "black",
            fontSize: hp(2.5),
            fontWeight: "bold",
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="gray"
        barStyle="light-content" // This changes the text/icons color to light
        hidden={false}
      />
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../assets/InSpaceYesilkoy.jpeg")}
          resizeMode="cover"
          style={{
            height: hp("30%"),
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("../../assets/InSpaceYesilkoy.jpeg")}
          style={{
            height: hp("16%"),
            width: wp("35%"),
            borderRadius: 999,
            borderColor: "black",
            borderWidth: 2,
            marginTop: -hp("10%"),
          }}
        />
        <Text style={{ fontSize: wp(5), marginVertical: 8 }}>Tarık Çelebi</Text>
        <Text style={{ color: "black", fontSize: wp(3) }}>
          Software Developer
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 6,
          }}
        >
          <Ionicons name="location" size={24} color="black" />
          <Text style={{ fontSize: wp(3), color: "black", fontWeight: "bold" }}>
            User last location
          </Text>
        </View>

        <View style={{ flexDirection: "row", paddingVertical: 8 }}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <Text
              style={{ fontSize: wp(3), color: "black", fontWeight: "bold" }}
            >
              122
            </Text>
            <Text
              style={{ fontSize: wp(3), color: "black", fontWeight: "bold" }}
            >
              Places that user visited
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <Text
              style={{ fontSize: wp(3), color: "black", fontWeight: "bold" }}
            >
              122
            </Text>
            <Text
              style={{ fontSize: wp(3), color: "black", fontWeight: "bold" }}
            >
              Places that user visited
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: wp("25%"),
              height: hp("4%"),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "gray",
              borderRadius: 10,
              marginHorizontal: 25,
            }}
            onPress={()=>{navigation.navigate("EditProfilePage")}}
          >
            <Text
              style={{ fontSize: wp(3), color: "black", fontWeight: "bold" }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: wp("25%"),
              height: hp("4%"),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "gray",
              borderRadius: 10,
              marginHorizontal: 25,
            }}
          >
            <Text
              style={{ fontSize: wp(3), color: "black", fontWeight: "bold" }}
            >
              Visited Places
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}  // Ensure you're calling renderScene as a function
          onIndexChange={setIndex}
          renderTabBar={rendertabBar}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
});

export default ProfilePage;

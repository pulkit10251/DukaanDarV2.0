import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const AboutScreen = (props) => {
  return (
    <ScrollView style={styles.about}>
      <View style = {styles.imageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.image} />
      </View>

      <Text style={styles.Text}>DukaanDar is not just an application but a convenience that you were seeking for so long. </Text>

      <Text style={styles.Text}>It brings a plethora of options that will make your life hassle-free and your necessities will be just a click away.</Text>
     
      <Text style={styles.Text}>DukaanDar integrates the local stores of your area for both Customer and the retailers. You can now shop online even from your favourite local store,
you can compare the prices from various stores and make the best purchase. The safe and timely delivery of your items will be taken care of by the retailer.
Your local market is in your pocket.</Text>

    <Text style={styles.Text}>DukaanDar is a great initiative to promote 'Vocal for Local'.</Text>
    <Text style={styles.Text}>Go hit your cart now!</Text>

    <Text style={styles.BoldText}>DEVELOPED BY </Text>
    <View style ={{...styles.imageContainer, marginBottom: 40 }} >
      <Image source ={require('../../assets/devPic.jpg')} style={styles.devImage}/>
    </View>
    <Text style={styles.Text}>
    This application is the repliction of the hard work of a 20 year boy named Pulkit Sharma. Pulkit is very eager to learn and apply new concepts. 
Coding and Programming is his bread and butter. He keeps upskilling himself with an approach to contribute towards humanity and make human life easy.
If you like this app, then please review it and let us know your thoughts. You can give us feedback @dukaandar@gmail.com  
    </Text>
    </ScrollView>
  );
};


const styles = StyleSheet.create({

  about:{
    flex: 1,
    backgroundColor : "white",
    paddingHorizontal:12,
    paddingBottom: 60
  },

  imageContainer:{
    width : "80%",
    aspectRatio: 1,
    justifyContent:"center",
    alignItems:"center",
    alignSelf: "center",
    marginVertical: 20,
  },
  devImage:{
    width: "100%",
    height: "100%",
    borderRadius: 240,
  },

  Text:{
    fontFamily: 'open-sans',
    textAlign:"justify",
    paddingVertical: 5,
  },
  image : {
    width: "100%",
    height: "100%"
  },

  BoldText:{
    fontSize: 30,
    alignSelf: "center",
    marginVertical: 40,
    fontFamily:"open-sans-bold",
  }
})


AboutScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "About",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            NavData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default AboutScreen;

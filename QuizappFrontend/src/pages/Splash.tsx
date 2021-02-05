import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image} from "react-native";
import splash_logo from '../assets/images/splash_logo.svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Splash = () => {
  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashLogoTitleWrap}>
        <Text style={styles.splashLogoTitleOne}> coding </Text>
        <Text style={styles.splashLogoTitleTwo}> Kidz </Text>
      </View>
      <View style={styles.splashLogoImgWrap}>
        <View style={styles.splashLogoCirclePortrait}>
          <Image source={require('../assets/images/splash_logo.svg')} />
        </View>
      </View>
      <View style={styles.splashCaptionWrap}>
        <Text> lorem ipsum dolor sit amet, cosnectetur adipiscing elit. </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer:{
    height: hp('100%'),
    width: wp('100%'),
    display: "flex",
    alignItems:"center",
    justifyContent: "center",
    flexDirection: "column",
  },
  splashLogoTitleWrap:{
    height: 80,
    width: 360,
    display: "flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    color:"white",
    position:"absolute",
    top:100
  },
  splashLogoTitleOne:{
    fontWeight:"bold",
    fontSize: 30,
  },
  splashLogoTitleTwo:{
    fontSize: 30,
    marginLeft:-10
  },
  splashLogoImgWrap:{
    height: 270,
    width: 270,
    display:"flex",
    alignItems: "center",
    justifyContent:"center",
    marginTop:3,
  },
  splashLogoCirclePortrait:{
    borderRadius: 200,
    width: 270,
    height: 270,
    backgroundColor: "#FCFADD",
    borderWidth: 5,
    borderColor: "#F8EB30",
    marginTop:3
  },
  splashCaptionWrap:{
    color:"white",
    fontSize: 20,
    fontWeight: "bold",
    width: 250,
    marginTop:50,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  splashBtnWrap:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    height: 70,
    width: 300,
    marginTop:3
  },
  splashBtn:{
    height: 50,
    width: 120,
    display:"flex",
    alignItems:"center",
    justifyContent: "center",
    borderRadius: 7,
    fontWeight: "bold",
  },
  splashBtnOne:{
    borderWidth:3,
    borderColor:"#F8EB30",
    color: "#F8EB30"
  },
  splashBtnTwo:{
    color: "#FF671D",
    backgroundColor: "#F8EB30",
  },
  splashBtnLink:{
  }
})

export default Splash;
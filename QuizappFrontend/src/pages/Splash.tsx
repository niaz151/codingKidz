import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image} from "react-native";
import splash_logo from '../assets/images/splash_logo.svg';

const Splash = (props: { auth: boolean }) => {
  const { auth } = props;
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
        <View>
          <Text> lorem ipsum dolor sit amet, cosnectetur adipiscing elit. </Text>
        </View>
      </View>
      {auth && (
        <View style={styles.splashBtnWrap}>
          <View style={styles.splashBtnOne}>
            <Text>LOG IN</Text>
          </View>
          <View style={styles.splashBtnTwo}>
            <Text> SIGN UP </Text> 
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer:{
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems:"center",
    justifyContent: "center",
    flexDirection: "column"
  },
  splashLogoTitleWrap:{
    height: "80px",
    width: "360px",
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    color:"white",
    position:"absolute",
    top:0
  },
  splashLogoTitleOne:{
    fontWeight:"bold",
    fontSize: 50,
  },
  splashLogoTitleTwo:{
    fontSize: 45,
  },
  splashLogoImgWrap:{
    height: "270px",
    width: "270px",
    display:"flex",
    alignItems: "center",
    justifyContent:"center",
    marginTop:"3rem"
  },
  splashLogoCirclePortrait:{
    borderRadius: 50,
    width: "270px",
    height: "270px",
    backgroundColor: "#FCFADD",
    borderWidth: 5,
    borderColor: "#F8EB30",
    marginTop:"3rem"
  },
  splashCaptionWrap:{
    color:"white",
    fontSize: 16,
    fontWeight: "bold",
    width: "250px",
    textAlign: "center",
    marginTop:"3rem"
  },
  splashBtnWrap:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    height: "70px",
    width: "300px",
    marginTop:"3rem"
  },
  splashBtn:{
    height: "50px",
    width: "120px",
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
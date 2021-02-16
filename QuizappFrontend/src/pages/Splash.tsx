import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
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
          <Image source={require('../assets/images/splash_logo.png')} style={styles.splashImg} />
        </View>
      </View>
      <View style={styles.splashCaptionWrap}>
        <Text> lorem ipsum dolor sit amet, cosnectetur adipiscing elit. </Text>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity
          onPress={() => console.log('login')}
          style={[styles.btn, styles.loginBtn]}>
            <Text style={styles.yellowText}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('register')}
          style={[styles.btn, styles.registerBtn]}>
            <Text style={styles.orangeText}> Register </Text>
        </TouchableOpacity>
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
  splashImg:{
    height: 300,
    width: 300
  },
  splashLogoCirclePortrait:{
    borderRadius: 200,
    width: 270,
    height: 270,
    backgroundColor: "#FCFADD",
    borderWidth: 5,
    borderColor: "#F8EB30",
    marginTop:3,
    display:"flex",
    alignItems: "center",
    justifyContent:"center",
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
  btnWrap:{
    width: 350,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp("6%"),
  },
  btn:{
    height: 50,
    width: 110,
    borderColor:'red',
    borderWidth:2.5,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn:{
    color: '#F8EB30',
    borderColor: '#F8EB30'
  },
  registerBtn:{
    backgroundColor: '#F8EB30',
    borderColor: '#F8EB30'
  },
  whiteText:{
    color:'white'
  },
  yellowText:{
    color:'#F8EB30'
  },
  orangeText:{
    color:'#FF671D'
  }
})

export default Splash;
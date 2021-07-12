import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FailedQuizHouse from "../../../assets/images/FailedQuizHouse.svg";

const FailedQuiz = () => {
  return(
    <View style={styles.container}>
      <FailedQuizHouse style={styles.house}/>
      <View style={styles.topContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.largerText}> OOPS, SORRY!</Text>  
        </View>
      </View>    
      <View style={styles.bottomContainer}>
          <View style={styles.backContainer}>
            <Text style={styles.bottomText}> START AGAIN </Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height: hp("100%"),
    width: wp("100%"),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  topContainer:{
    height: "55%",
    width: "100%",
    backgroundColor: "#F1ECD7",
    display: "flex",
    alignItems: "center"
  },
  topTextContainer: {
    height: 200,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: hp("10%"),
  },
  largerText:{
    fontFamily: "Nexa Bold",
    fontSize: 52,
    color: "#EC1B24"
  },
  smallerTextWrap:{
    height: 100,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  smallerText:{
    fontFamily: "Nexa Bold",
    fontSize: 36,
    color: "#EC1B24"
  },
  bottomContainer:{
    height: "45%",
    width: "100%",
    backgroundColor: "#FFF7DD",
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex:0,
  },
  backContainer:{
    height: 80,
    width: wp("50%"),
    borderRadius: 25,
    borderColor: "#4DB74D",
    borderWidth: 4,
    position: "absolute",
    bottom: hp("10%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomText:{
    fontFamily: "Nexa Bold",
    fontSize: 35,
    color: "#4DB74D",
    marginTop: 5
  },
  house:{
    height: 1000,
    width: 1000,
    position: 'absolute',
    zIndex: 10,
  }
})

export default FailedQuiz;
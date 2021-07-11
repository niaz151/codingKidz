import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PassedQuiz = () => {
  return(
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.largerText}> CONGRATS! </Text>
          <View style={styles.smallerTextWrap}>
            <Text style={styles.smallerText}> SCORE:  </Text>
            <Text style={styles.smallerText}> CORRECT ANSWERS </Text>  
          </View>     
        </View>
      </View>
      <View style={styles.bottomContainer}>
          <View style={styles.backContainer}>
            <Text style={styles.bottomText}> BACK TO LESSONS </Text>
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
    backgroundColor: "#646565",
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
    color: "#FF671D"
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
    color: "#FFF7DD"
  },
  bottomContainer:{
    height: "45%",
    width: "100%",
    backgroundColor: "#FFF8DD",
    display: "flex",
    alignItems: "center",
    position: "relative"
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
  }
})

export default PassedQuiz;
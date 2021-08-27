import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FailedQuizHouse from "../../../assets/images/FailedQuizHouse.svg";
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';

type Props = StackScreenProps<UnitsStackParamList, 'FailedQuiz'>;
export const FailedQuiz = (props: Props) => {

  const {navigation, route} = props;
  const {unitId, unitName} = route.params;

  return(
    <View style={styles.container}>
      <FailedQuizHouse style={styles.house}/>
      <View style={styles.topContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.largerText}> OOPS SORRY!</Text>  
        </View>
      </View>    
      <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.backContainer} onPress={() =>
            navigation.navigate("Topics",{
              unitId: unitId,
              unitName: unitName
            })
          }>
            <Text style={styles.bottomText}> BACK TO LESSONS </Text>
          </TouchableOpacity>
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
    height: "45%",
    width: "100%",
    backgroundColor: "#F1ECD7",
    display: "flex",
    alignItems: "center",
    marginTop:hp("-20%")
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
    height: "35%",
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
    bottom: hp("5%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8
  },
  bottomText:{
    fontFamily: "Nexa Bold",
    fontSize: 35,
    color: "#4DB74D",
  },
  house:{
    height: 1000,
    width: 1000,
    position: 'absolute',
    zIndex: 10,
    top: 0
  }
})

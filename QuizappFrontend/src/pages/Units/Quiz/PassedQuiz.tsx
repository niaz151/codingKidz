import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Rocket from "../../../assets/images/rocket.svg";
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from './../UnitsStack';
import {getQuizzes, udpateQuizData} from './quizSlice';
import {useAppDispatch, useAppSelector} from '../../../ducks/store';
import {TokenService} from '../../../services';

type Props = StackScreenProps<UnitsStackParamList, 'PassedQuiz'>;

export const PassedQuiz = (props: Props) => {
  const {navigation, route} = props;
  const {numberQuestions, numberCorrect, unit, topic} = route.params;
  const score = Math.round(((numberCorrect / numberQuestions) * 100));
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const {id} = TokenService.readToken(accessToken);
  const quizDataStatus = useAppSelector(
    (state) => state.quizReducer.status,
  );

 console.log("Status :", quizDataStatus)
  var user_id = id;
  var topic_id = topic.id;
  // @ts-expect-error
  var quiz_id = topic.quizResults[0].id;
  // @ts-expect-error
  var status = topic.quizResults[0].status;
  // @ts-expect-error
  var grade = topic.quizResults[0].grade;

  useEffect(() => {
    if (quizDataStatus === 'idle') {
      console.log("Console Log Effect", topic.quizResults)
      dispatch(udpateQuizData({user_id, topic_id, quiz_id, status, grade}));
    }
  }, [dispatch, quizDataStatus]);

  return(
    <View style={styles.container}>
      <Rocket style={styles.rocket} />
      <View style={styles.topContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.largerText}> CONGRATS! </Text>
          <View style={styles.smallerTextWrap}>
            <Text style={styles.smallerText}> SCORE: {score}% </Text>
            <Text style={styles.smallerText}> CORRECT ANSWERS </Text>  
          </View>     
        </View>
      </View>     
      <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.backContainer} onPress={() =>
            navigation.navigate("Topics",{unit: unit})
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
    backgroundColor: "#646565",
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
    height: "35%",
    width: "100%",
    backgroundColor: "#FFF8DD",
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
  },
  bottomText:{
    fontFamily: "Nexa Bold",
    fontSize: 35,
    color: "#4DB74D",
    marginTop: 5
  },
  rocket:{
    height: 800,
    width: 800,
    position: 'absolute',
    zIndex: 10,
    top:150
  }
})

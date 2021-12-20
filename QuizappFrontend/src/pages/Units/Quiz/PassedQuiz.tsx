import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Rocket from '../../../assets/images/rocket.svg';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from './../UnitsStack';
import {udpateQuizData, updateQuizStatus} from './quizSlice';
import {useAppDispatch, useAppSelector} from '../../../ducks/store';
import {TokenService} from '../../../services';
import {QuizResultStatus} from '../../../utils/Models';
import axios from 'axios';

type Props = StackScreenProps<UnitsStackParamList, 'PassedQuiz'>;

export const PassedQuiz = (props: Props) => {
  const {navigation, route} = props;
  const {numberQuestions, numberCorrect, unitId, topicId, unitName, topic} =
    route.params;
  const score = Math.round((numberCorrect / numberQuestions) * 100);

  const dispatch = useAppDispatch();
  const quizDataStatus = useAppSelector((state) => state.quizReducer.status);
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  // @ts-expect-error
  const {id} = TokenService.readToken(accessToken);
  var topic_id = topicId;
  var user_id = id; 
  //@ts-expect-error
  var quiz_id = topic.quizResults[0].id;
  var status = QuizResultStatus.COMPLETED;
  // @ts-expect-error
  var grade = topic.quizResults[0].grade;
  
  useEffect(() => {
    if (quizDataStatus === 'idle') {
      dispatch(udpateQuizData({user_id, topic_id, quiz_id, status, grade})) ;
      status = QuizResultStatus.PENDING;
      topic_id += 1;
      quiz_id += 1;
      dispatch(updateQuizStatus({user_id, topic_id, quiz_id, status}))
    }
  }, [dispatch, quizDataStatus]);

  const handlePress = () => {
    dispatch(udpateQuizData({user_id, topic_id, quiz_id, status, grade})) ;
    
    status = QuizResultStatus.PENDING;
    topic_id += 1;
    quiz_id += 1;

    dispatch(updateQuizStatus({user_id, topic_id, quiz_id, status}))
    navigation.navigate('Topics', {
      unitId: unitId,
      unitName: unitName,
    });
  };

  useEffect(() => {
    console.log("running new effect")
    axios.post(`http://localhost:8000/api/language/topic/${topicId}/passed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  });



  return (
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
        <TouchableOpacity style={styles.backContainer} onPress={handlePress}>
          <Text style={styles.bottomText}> BACK TO LESSONS </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    height: '45%',
    width: '100%',
    backgroundColor: '#646565',
    display: 'flex',
    alignItems: 'center',
    marginTop: hp('-20%'),
  },
  topTextContainer: {
    height: 200,
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp('10%'),
  },
  largerText: {
    fontFamily: 'Nexa Bold',
    fontSize: 52,
    color: '#FF671D',
  },
  smallerTextWrap: {
    height: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  smallerText: {
    fontFamily: 'Nexa Bold',
    fontSize: 36,
    color: '#FFF7DD',
  },
  bottomContainer: {
    height: '35%',
    width: '100%',
    backgroundColor: '#FFF8DD',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0,
  },
  backContainer: {
    height: 80,
    width: wp('50%'),
    borderRadius: 25,
    borderColor: '#4DB74D',
    borderWidth: 4,
    position: 'absolute',
    bottom: hp('5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontFamily: 'Nexa Bold',
    fontSize: 35,
    color: '#4DB74D',
    marginTop: 5,
  },
  rocket: {
    height: 800,
    width: 800,
    position: 'absolute',
    zIndex: 10,
    top: 150,
  },
});

import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Animated} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {MultipleChoiceQuestion, shuffleArray} from '../../../../utils';
import { Slider } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  question: MultipleChoiceQuestion;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  numQuestions: number;
  score: number | null;
};

const MultipleChoiceQuestionContainer = (props: Props) => {
  const {question, onCorrectAnswer, onIncorrectAnswer, score} = props;

  const shuffledAnswers = shuffleArray([
    question.correctAnswer,
    question.wrongAnswer0,
    question.wrongAnswer1,
    question.wrongAnswer2,
  ]);

  const checkAnswer = (answer: MultipleChoiceQuestion['correctAnswer']) => {
    if (answer === question.correctAnswer) {
      return onCorrectAnswer();
    } else {
      return onIncorrectAnswer();
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        minimumValue={0}
        maximumValue={props.numQuestions}
        value={0}
        step={1}
        maximumTrackTintColor="#F9D2C0"
        minimumTrackTintColor="#FF6A00"
        style={styles.sliderStyle}
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
        thumbTintColor="#FED500"
      />
      <View style={styles.questionContainer}>
        <Text>{question.question}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.optionsContainer}
        directionalLockEnabled={true}>
        {['A', 'B', 'C', 'D'].map((letter, idx) => {
          const currentAnswer = shuffledAnswers[idx];
          const handleAnswer = () => checkAnswer(currentAnswer);
          return (
            <View style={styles.multipleChoiceContainer}>
              <View style={styles.choiceWrap}>
                <View style={styles.letter}>
                  <Text> {letter} </Text>
                </View>
                <View style={styles.answer}>
                  <Button onPress={handleAnswer}>
                    <Text> {currentAnswer} </Text>
                  </Button>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    height: hp("100%"),
    width: wp('100%'),
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingTop:20,
    position: 'relative',
    flex:1,
  },
  questionContainer: {
    height: hp('30%'),
    width: wp('100%'),
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  optionsContainer: {
    height: 550,
    width: wp('100%'),
    display: 'flex',
    flexDirection: 'column',
  },
  multipleChoiceContainer: {
    flex: 1,
    width: wp('100%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  choiceWrap: {
    borderColor: 'black',
    borderTopWidth: 1,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  letter: {
    borderTopWidth: 1,
    borderColor: 'black',
    height: '100%',
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answer: {
    borderTopWidth: 1,
    borderColor: 'black',
    height: '100%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
  sliderStyle:{
    width: 500,
    height: 50,
    borderWidth:1,
    borderColor:'#DEDEDE',
    borderRadius:20,
    paddingLeft:20,
    backgroundColor:'white',
  },
  trackStyle:{
    width: "90%",
    marginLeft: "5%",
    height: 10,
    borderRadius: 25,
    backgroundColor:"#FF6A00",
  },
  thumbStyle:{
    marginLeft:"5.1%",
    height: 40,
    borderRadius:200,
    width:20,
  }
});

export default MultipleChoiceQuestionContainer;

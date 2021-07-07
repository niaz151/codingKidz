import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {MultipleChoiceQuestion, shuffleArray} from '../../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Slider from "react-native-sliders";

type Props = {
  question: MultipleChoiceQuestion;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  numQuestions: number;
};

const MultipleChoiceQuestionContainer = (props: Props) => {
  const {question, onCorrectAnswer, onIncorrectAnswer} = props;

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
        value={10}
        step={1}
        style={styles.sliderStyle}
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
        onValueChange={console.log('hi')}
      />
      <View style={styles.questionContainer}>
        <Text>{question.question}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.optionsContainer}
        horizontal={false}
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
    height: hp('100%'),
    width: wp('100%'),
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingTop:20,
  },
  questionContainer: {
    height: hp('30%'),
    width: wp('100%'),
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  optionsContainer: {
    flex: 1,
    width: wp('100%'),
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  },
  multipleChoiceContainer: {
    flex: 1,
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
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
    borderColor:'black',
    borderRadius:20,
    backgroundColor:'white',
  },
  trackStyle:{
    height: 10,
    borderRadius: 25,
    backgroundColor:"#FF6A00",
  },
  thumbStyle:{
    
  }
});

export default MultipleChoiceQuestionContainer;

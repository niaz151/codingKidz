import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {MultipleChoiceQuestion, shuffleArray} from '../../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  question: MultipleChoiceQuestion;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
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
      <View style={styles.questionContainer}>

      </View>
      <ScrollView contentContainerStyle={styles.optionsContainer} horizontal={false} directionalLockEnabled={true} >
          <View style={styles.multipleChoiceContainer}>
            <View style={styles.choiceWrap}>
              <View style={styles.letter}>
                <Text> A </Text>
              </View>
              <View style={styles.answer}> 
                <Text> Other </Text>
              </View>
            </View>
          </View>
          <View style={styles.multipleChoiceContainer}>
            <View style={styles.choiceWrap}>
              <View style={styles.letter}>
                <Text> B </Text>
              </View>
              <View style={styles.answer}> 
                <Text> Other </Text>
              </View>
            </View>
          </View> 
          <View style={styles.multipleChoiceContainer}>
            <View style={styles.choiceWrap}>
              <View style={styles.letter}>
                <Text> C </Text>
              </View>
              <View style={styles.answer}> 
                <Text> Other </Text>
              </View>
            </View>
          </View>
          <View style={styles.multipleChoiceContainer}>
            <View style={styles.choiceWrap}>
              <View style={styles.letter}>
                <Text> D </Text>
              </View>
              <View style={styles.answer}> 
                <Text> Other </Text>
              </View>
            </View>
          </View>
      </ScrollView>



      {/*
      <Text>{question.question}</Text>
      {shuffledAnswers.map((answer) => {
        return (
          <Button onPress={() => checkAnswer(answer)} key={answer}>
            <Text>{answer}</Text>
          </Button>
        );
      })}
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    borderColor:'black',
    borderWidth:1,
    height: hp("100%"),
    width: wp("100%"),
  },
  questionContainer:{
    height: hp("30%"),
    width:wp("100%")
  },
  optionsContainer:{
    flex:1,
    width:wp("100%"),
    overflow:'scroll',
    display:'flex',
    flexDirection:'column',
  },
  multipleChoiceContainer:{
    flex:1,
    width:wp("100%"),
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  choiceWrap:{
    borderColor:'black',
    borderTopWidth:1,
    height: '100%',
    width: '100%',
    display:'flex',
    flexDirection:'row'
  },
  letter:{
    borderTopWidth:1,
    borderColor:'black',
    height: '100%',
    width: '10%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  answer:{
    borderTopWidth:1,
    borderColor:'black',
    height: '100%',
    width: '90%',
    display:'flex',
    justifyContent:'center'
  }
})

export default MultipleChoiceQuestionContainer;

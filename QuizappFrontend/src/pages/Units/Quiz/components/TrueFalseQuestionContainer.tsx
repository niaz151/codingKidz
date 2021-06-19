import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {TrueFalseQuestion, shuffleArray} from '../../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


type Props = {
  question: TrueFalseQuestion;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
};

const TrueFalseQuestionContainer = (props: Props) => {
  const {question, onCorrectAnswer, onIncorrectAnswer} = props;

  const checkAnswer = (answer: TrueFalseQuestion['correctAnswer']) => {
    if (answer === question.correctAnswer) {
      return onCorrectAnswer();
    } else {
      return onIncorrectAnswer();
    }
  };

  const selectedTrue = () => {
    return checkAnswer(true);
  };

  const selectedFalse = () => {
    return checkAnswer(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text>{question.question}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Button style={styles.optionButton} onPress={selectedTrue}>
          <Text style={styles.optionText}> True </Text>
        </Button>
        <Button style={styles.optionButton} onPress={selectedFalse}>
          <Text style={styles.optionText}> False </Text>
        </Button>
      </View>
      {/*
        <Text>{question.question}</Text>
        <Button onPress={selectedTrue}>True</Button>
        <Button onPress={selectedFalse}>False</Button>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    height: hp("100%"),
    width:wp("100%")
  },
  questionContainer: {
    height: hp('30%'),
    width: wp('100%'),
  },
  optionsContainer:{
    height: hp("25%"),
    width: wp("100%"),
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around'
  },
  optionButton:{
    height: hp("7%"),
    width: wp("60%"),
    borderRadius: 20,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FF6A00',
    paddingTop:10
  },
  optionText:{
    fontFamily:'Nexa Bold',
    fontSize: 30,
    color:'white'
  }
})

export default TrueFalseQuestionContainer;

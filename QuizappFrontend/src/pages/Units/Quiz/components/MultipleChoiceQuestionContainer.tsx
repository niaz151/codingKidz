import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Animated} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {MultipleChoiceQuestion, shuffleArray} from '../../../../utils';
import { Image, Slider } from 'react-native-elements';
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
  questionNumber: number;
};

const MultipleChoiceQuestionContainer = (props: Props) => {
  const {question, onCorrectAnswer, onIncorrectAnswer, score, questionNumber} = props;

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
        value={questionNumber}
        step={1}
        maximumTrackTintColor="#F9D2C0"
        minimumTrackTintColor="#FF6A00"
        style={styles.sliderStyle}
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
        thumbTintColor="#FED500"
      />
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.optionsContainer}
        directionalLockEnabled={true}
      >
        {['A', 'B', 'C', 'D'].map((letter, idx) => {
          const currentAnswer = shuffledAnswers[idx];
          const handleAnswer = () => {
            console.log("Current Answer: ", currentAnswer)
            checkAnswer(currentAnswer);
          }
          const imgNum = Math.floor(Math.random() * 3);
          
          var imgRef:any = "";

          if(imgNum === 0){ imgRef =  <Image source={require('../../../../res/greenflag.png')} style={styles.mc_image} />};
          if(imgNum === 1){ imgRef = <Image source={require('../../../../res/space_pressed.png')} style={styles.mc_image} />};
          if(imgNum === 2){ imgRef = <Image source={require('../../../../res/backdrop_switches.png')} style={styles.mc_image} />};

          if(letter === 'A'){
            return(
              <View style={styles.multipleChoiceContainer}>
              <View style={styles.choiceWrap}>
                <View style={styles.letter}>
                  <Text style={styles.letterText}> {letter} . </Text>
                </View>
                <View style={styles.answer}>
                <Button onPress={handleAnswer}>
                    <Image source={require('../../../../res/sprite_clicked.png')} style={styles.mc_image} />
                    {/* <Text style={styles.answerText}> {currentAnswer} </Text> */}
                  </Button>
                </View>
              </View>
            </View>
            )
          }
          else{
            return (
              <View style={styles.multipleChoiceContainer}>
                <View style={styles.choiceWrap}>
                  <View style={styles.letter}>
                    <Text style={styles.letterText}> {letter} . </Text>
                  </View>
                  <View style={styles.answer}>
                  <Button onPress={handleAnswer}>   
                      {imgRef}
                      {/* <Text style={styles.answerText}> {currentAnswer} </Text> */}
                    </Button>
                  </View>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    width: wp('100%'),
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingTop:20,
    position: 'relative',
    flex:1,
  },
  questionContainer: {
    height: hp('20%'),
    width: wp('80%'),
    //borderColor: 'black',
    //borderWidth: 1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  questionText:{
    fontSize: 30,
    textAlign: 'center',
    fontFamily:'Nexa Bold',
    lineHeight: 50,
    letterSpacing: 1,
  },
  optionsContainer: {
    height:hp("100%"),
    width: wp('100%'),
    display: 'flex',
    flexDirection: 'column',
    overflow:'scroll',
    flexWrap: 'wrap',
  },
  multipleChoiceContainer: {
    height: hp("20%"),
    width: wp('100%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  choiceWrap: {
    //borderColor: 'black',
    //borderTopWidth: 1,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  letter: {
    height: '100%',
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
  },
  letterText:{
    fontSize: 30,
    fontFamily: 'Nexa Bold'
  },
  answer: {
    //borderWidth: 1,
    //borderColor: 'black',
    height: '100%',
    width: '90%',
    display: 'flex',
    alignItems:'flex-start',
    justifyContent: 'center',
  },
  answerText:{
    fontSize: 20,
    fontFamily:'Nexa Bold',
  },
  sliderStyle:{
    width: 500,
    height: 50,
    borderWidth:1,
    borderColor:'#DEDEDE',
    borderRadius:20,
    paddingLeft:20,
    backgroundColor:'white',
    marginTop: 30,
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
  },
  mc_image:{
    height: 150,
    width: 320,
    marginTop: 50,
    //borderColor:'black',
    //borderWidth: 1
  }
});

export default MultipleChoiceQuestionContainer;

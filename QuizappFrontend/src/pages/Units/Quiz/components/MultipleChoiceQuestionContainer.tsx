import React, { useState } from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Animated, Alert} from 'react-native';
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

// const mapImageRefToLink = (input: number) => {

//   var imgLink: string = '';

//   switch(input){
//     case 0:
//       imgLink = "../../../../res/0.png"
//       break;
//     case 1:
//       imgLink = "../../../../res/3.png";
//       break;
//     case 2:
//       imgLink = "../../../../res/5.png";
//       break;
//     case 3:
//       imgLink = "../../../../res/1.png";
//       break;
//     case 4:
//       imgLink = "../../../../res/6.png";
//       break;
//     case 5:
//       imgLink = "../../../../res/2.png";
//       break;
//     case 6:
//       imgLink = "../../../../res/7.png";
//       break;
//     case 7:
//       imgLink = "../../../../res/4.png";
//       break;
//   }
//   return imgLink;
// }

const MultipleChoiceQuestionContainer = (props: Props) => {


  const {question, onCorrectAnswer, onIncorrectAnswer, score, questionNumber} = props;
  let isQuestionImage: boolean = false;

  type imgArrayType = { [key: number]: any };

  const imgArray: imgArrayType = {
    0: require("../../../../res/0.png"),
    1: require("../../../../res/3.png"),
    2: require("../../../../res/5.png"),
    3: require("../../../../res/1.png"),
    4: require("../../../../res/6.png"),
    5: require("../../../../res/2.png"),
    6: require("../../../../res/7.png"),
    7: require("../../../../res/4.png"),
  }

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

  const checkForQuestionImg = () => {
    if(question.questionImage !== null){
      //setImgLink(mapImageRefToLink(question.questionImage!));
      const key = Object.keys(imgArray)[question.questionImage!];
      console.log("Link: ", imgArray[0]);
      isQuestionImage = true;
      return(
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          <Image source={imgArray[question.questionImage!]} style={{height: 500, width: 500}} />
        </View>
      )    
    }
    else{
      isQuestionImage = false;
      return(
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>
      )
    }
  }

  // const renderQuestionOptions = (input: any, re) => {
  //   if(isQuestionImage){
  //     return(
  //       <Text style={styles.answerText}> {input} </Text>
  //     )
  //   }
  //   else{
  //     return(
  //       <Image source={require('../../../../res/starts_with_when_sprite_clicked.png')} style={styles.mc_image} />
  //     )
  //   }

  // }

  //checkForQuestionImg()

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
        <Text style={styles.questionText}>{checkForQuestionImg()}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.optionsContainer}
        directionalLockEnabled={true}
      >
        {['A', 'B', 'C', 'D'].map((letter, idx) => {
 
          const currentAnswer = shuffledAnswers[idx];
          const handleAnswer = () => {
            checkAnswer(currentAnswer);
          }
          const imgNum = Math.floor(Math.random() * 3);
          
          var imgRef:any = "";

          if(imgNum === 0){ imgRef =  <Image source={require('../../../../res/greenflag.png')} style={styles.mc_image} />};
          if(imgNum === 1){ imgRef = <Image source={require('../../../../res/when_space_key_pressed.png')} style={styles.mc_image} />};
          if(imgNum === 2){ imgRef = <Image source={require('../../../../res/when_backdrop_switches.png')} style={styles.mc_image} />};

          if(currentAnswer === "When this Sprite Clicked"){
            return(
              <View style={styles.multipleChoiceContainer}>
              <View style={styles.choiceWrap}>
                <View style={styles.letter}>
                  <Text style={styles.letterText}> {letter} . </Text>
                </View>
                <View style={styles.answer}>
                <Button onPress={handleAnswer}>
                    <Image source={require('../../../../res/starts_with_when_sprite_clicked.png')} style={styles.mc_image} />
                    {/* <Text style={styles.answerText}> {currentAnswer} </Text>  */}
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
                      {/* <Text style={styles.answerText}> {currentAnswer} </Text>  */}
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
    width: wp('80%'),
    // borderColor: 'black',
    // borderWidth: 1,
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop:hp("2%")
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
    height: 300,
    width: 380,
    marginTop: 50,
    //borderColor:'black',
    //borderWidth: 1
  },
  q_image:{
    height: 250,
    width: 380,
    borderWidth: 1,
    marginTop:30,
    borderColor: "black"
  }
});

export default MultipleChoiceQuestionContainer;

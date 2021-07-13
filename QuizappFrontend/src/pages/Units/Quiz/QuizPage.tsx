import {StackScreenProps} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {
  MultipleChoiceQuestion,
  shuffleArray,
  TrueFalseQuestion,
} from '../../../utils';
import {UnitsStackParamList} from '../UnitsStack';
import QuestionContainer from './components/QuestionContainer';
import HappyFace from '../../../assets/images/happy_face.png';
import SadFace from '../../../assets/images/sad_face.png';

const QUESTIONS_PER_QUIZ = 10;

type Props = StackScreenProps<UnitsStackParamList, 'Quiz'>;

export const QuizPage = (props: Props) => {
  const {navigation, route} = props;
  const {topic} = route.params;
  const {multipleChoiceQuestions, trueFalseQuestions} = topic;
  const [lives, setLives] = useState(3);
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log('rendering quiz');
  }, []);

  const loseLife = () => setLives((l) => l - 1);

  const nextQuestion = () => setQuestionNum((num) => num + 1);

  const previousQuestion = () => setQuestionNum((num) => num - 1);

  const selectedQuestions = shuffleArray<
    MultipleChoiceQuestion | TrueFalseQuestion
  >(multipleChoiceQuestions!.concat(trueFalseQuestions!)).slice(
    0,
    QUESTIONS_PER_QUIZ,
  );

  const returnToLessons = () => {
    navigation.goBack();
  };

  const onCorrectAnswer = () => {
    var new_score = score + 1;
    setScore(new_score);
    nextQuestion();
  };

  const onIncorrectAnswer = () => {
    loseLife();
    nextQuestion();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (_props) => (
        <View style={styles.livesContainer}>
          <View style={styles.emojiContainer}>
            <Image source={HappyFace} style={styles.happyFace} /> 
            <Text style={styles.livesText}>{lives} </Text>
          </View>
          <View style={styles.emojiContainer}>
            <Image source={SadFace} style={styles.sadFace} />
            <Text style={styles.livesText}>{3 - lives}</Text>
          </View>
        </View>
      ),
    });
  }, [lives, navigation]);

  if(lives > 0 && questionNum >= selectedQuestions.length){
    navigation.navigate('PassedQuiz', {
        numberQuestions: questionNum,
        numberCorrect: score
    })
  }

  if(lives <= 0){
    navigation. navigate('FailedQuiz',{});
  }


  return (
    <View style={styles.container}>
      {lives > 0 ? (
        questionNum < selectedQuestions.length ? (
          <>
            {/* LIFE MANAGEMENT */}
            {/*
            {[...Array(lives).keys()].map((k) => {
              return <Text key={k}>L</Text>;
            })}
          */}
            {/* QUESTION RENDER */}
            <QuestionContainer
              onCorrectAnswer={onCorrectAnswer}
              onIncorrectAnswer={onIncorrectAnswer}
              question={selectedQuestions[questionNum]}
              numQuestions={QUESTIONS_PER_QUIZ}
              score={score}
            />
          </>
        ) : (
          // IF YOU PASS THE QUIZ
          <View>
            <Text>You Passed</Text>
            <Button onPress={returnToLessons}>Return to Lessons</Button>
          </View>
        )
      ) : (
        // IF NO LIVES LEFT
        <View>
          <Text>You Failed</Text>
          <Button onPress={returnToLessons}>Return to Lessons</Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDF9DF',
    height: hp('100%'),
    width: wp('100%'),
  },
  livesContainer: {
    height: '100%',
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  emojiContainer: {
    height: '100%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  livesText:{
    fontSize: 20,
  },
  happyFace:{
    height: 50,
    width: 50,
  },
  sadFace:{
    height: 50,
    width: 50
  }
});

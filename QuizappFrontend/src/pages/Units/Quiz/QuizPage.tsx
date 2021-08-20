import React, {useLayoutEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, View, Image} from 'react-native';
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
  const {topic, unit} = route.params;
  const {multipleChoiceQuestions, trueFalseQuestions} = topic;
  const [lives, setLives] = useState(5);
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);

  var topic_quoted = JSON.stringify(topic.name);
  var topic_unquoted = JSON.parse(topic_quoted);

  navigation.setOptions({headerTitle: topic_unquoted})

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
        numberCorrect: score,
        unit: unit,
        topic: topic
    })
  }

  if(lives <= 0){
    navigation. navigate('FailedQuiz',{unit:unit});
  }

  if(lives > 0 && questionNum < selectedQuestions.length){
    return(
      <View style={styles.container}>
        <QuestionContainer
          onCorrectAnswer={onCorrectAnswer}
          onIncorrectAnswer={onIncorrectAnswer}
          question={selectedQuestions[questionNum]}
          numQuestions={QUESTIONS_PER_QUIZ}
          score={score}
          questionNum={questionNum}
        />
      </View>
    )
  }

  return <View></View>
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

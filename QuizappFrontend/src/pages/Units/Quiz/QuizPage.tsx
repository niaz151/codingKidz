import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../ducks/store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';
import {Button} from 'react-native-paper';

type Props = StackScreenProps<UnitsStackParamList, 'Quiz'>;

export const QuizPage = (props: Props) => {
  const {navigation, route} = props;
  const {topic} = route.params;

  // const nextQuestion = () => {
  //   setQuestionNum(questionNum + 1);
  // };

  // const previousQuestion = () => {
  //   setQuestionNum(questionNum - 1);
  // };

  // const shuffleArray = (array: Question[]) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // };

  return (
    <View>
      <ScrollView>
        <Text>Multiple Choice Questions:</Text>
        {topic.multipleChoiceQuestions?.map((question) => {
          return <Text key={question.id}>{question.question}</Text>;
        })}
        <Text>True False Questions:</Text>
        {topic.trueFalseQuestions?.map((question) => {
          return <Text key={question.id}>{question.question}</Text>;
        })}
        <Button
          onPress={() => {
            navigation.goBack();
          }}>
          Back to Topics
        </Button>
      </ScrollView>
    </View>
  );
};

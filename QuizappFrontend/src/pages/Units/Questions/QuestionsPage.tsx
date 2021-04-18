import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../ducks/store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MultipleChoiceQuestion, TrueFalseQuestion} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const QuestionsPage = () => {
 
  const route:any = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [MC_Question, setMC_Questions] = useState<MultipleChoiceQuestion[]>();
  const [TF_Question, setTF_Questions] = useState<TrueFalseQuestion[]>();
  const accessToken = useAppSelector( (state) => state.userReducer.accessToken);

  useEffect(() => {
    const getQuestions = async () => {
      return await axios
        .get(`http://localhost:8000/api/unit/${id}/topic/question`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            console.log('RESPONSE DATA', response.data);
          },
          (error) => {
            console.log('fetching error', error);
          },
        );
    };

    getQuestions();
  }, [accessToken]);


  return(
    <View>
      <Text> Question Component </Text>
    </View>
  )
}

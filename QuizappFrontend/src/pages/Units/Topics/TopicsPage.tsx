import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {
  Topic,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  Question,
} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../../ducks/store';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';
import {UnitsPage} from '../UnitsPage';
import MouseFlower from '../../../assets/images/mouse_flower.svg';

type Props = StackScreenProps<UnitsStackParamList, 'Topics'>;

const TopicsPage = (props: Props) => {
  const {route, navigation} = props;
  const {unit} = route.params;

  const TopicTile = (_props: {topic: Topic}) => {
    const {topic} = _props;
    return (
      <View style={styles.topicTileContainer}>
        <TouchableOpacity
        style={styles.opacityStyle}
          onPress={() =>
            navigation.navigate('Quiz', {
              topic: topic,
            })
          }>
          <MouseFlower style={styles.imgStyle} />
          <Text style={styles.captionText}> Lesson Name </Text>
          <Text style={styles.lessonText}> Lesson Title </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.topicListContainer}>
        {unit.topics?.map((topic) => {
          return <TopicTile topic={topic} key={topic.id} />;
        })}
      </ScrollView>
    </View>
  );
};

export default TopicsPage;

const styles = {
  containerStyle: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#FFF7DD',
  },
  topicListContainer:{
    width: wp('90%'),
    marginTop:hp("15%"),
    marginLeft:wp("5%"),
    overflow:'scroll',
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:hp("5%")
  },
  topicTileContainer: {
    height: hp('20%'),
    width: wp('40%'),
    maxWidth: 200,
    flexBasis: '40%',
    marginTop: hp('10%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTileText: {
    fontSize: 40,
    color: 'black',
  },
  opacityStyle:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    height:'100%',
    borderColor:'red',
    borderWidth:1,
  },  
  imgStyle:{
    borderWidth:1,
    borderColor:'black',
    height:'90%',
    width:'100%',
  },
  captionText:{
    fontFamily:'Nexa Bold',
    fontSize: 24,
  },
  lessonText:{
    fontFamily:'Nexa Bold',
    fontSize: 18,
    marginTop:5
  }
};

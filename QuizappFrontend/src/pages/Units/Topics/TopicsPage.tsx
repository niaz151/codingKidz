import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {QuizResult, Topic, Unit} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';
import MouseFlower from '../../../assets/images/mouse_flower.svg';
import MouseFlowerLocked from '../../../assets/images/mouse_flower_locked.svg';
//ADD A MOUSE FLOWER COMPLETED IMAGE
import axios from 'axios';
import { QuizResultStatus } from '../../../utils/Models';

type Props = StackScreenProps<UnitsStackParamList, 'Topics'>;

const TopicsPage = (props: Props) => {
  const {route, navigation} = props;
  const {unit} = route.params;
  var unit_quoted = JSON.stringify(unit.name);
  var unit_unquoted = JSON.parse(unit_quoted);
  navigation.setOptions({headerTitle: unit_unquoted});

  const TopicTile = (_props: {topic: Topic; unit: Unit,}) => {
    const {topic, unit} = _props;
    var [quizStatus, setQuizStatus] = useState<QuizResultStatus | null>(null);
    var output: any = <View></View>;
  
    const LockedMouse = () => {
      return (
        <View style={styles.topicTileContainer}>
          <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() =>
              navigation.navigate('Quiz', {
                topic: topic,
                unit: unit,
              })
            }>
            <MouseFlowerLocked style={styles.imgStyle} />
            <Text style={styles.captionText}> {topic.name} </Text>
            <Text style={styles.lessonText}> Lesson Title </Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    const PendingMouse = () => {
      return (
        <View style={styles.topicTileContainer}>
          <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() =>
              navigation.navigate('Quiz', {
                topic: topic,
                unit: unit,
              })
            }>
            <MouseFlower style={styles.imgStyle} />
            <Text style={styles.captionText}> {topic.name} </Text>
            <Text style={styles.lessonText}> Lesson Title </Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    const CompletedMouse = () => {
      return (
        <View style={styles.topicTileContainer}>
          <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() =>
              navigation.navigate('Quiz', {
                topic: topic,
                unit: unit,
              })
            }>
            <MouseFlower style={styles.imgStyle} />
            <Text style={styles.captionText}> {topic.name} </Text>
            <Text style={styles.lessonText}> Lesson Title </Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    useEffect(() => {
      axios
        .get<QuizResult[]>(
          `http://localhost:8000/api/language/topic/${topic.id}/getQuizResults`,
        )
        .then((response) => {
          // @ts-expect-error:
          var data = response.data.quizData;
          setQuizStatus(data[0].status);
          console.log("Setting Quiz Status: ", data[0].status)
        })
    },[]);
  
    console.log("render")
    
    switch(quizStatus){
      case QuizResultStatus.PENDING:
        return <PendingMouse/>
      case QuizResultStatus.LOCKED:
        return <LockedMouse/>
      case QuizResultStatus.COMPLETED:
        return <CompletedMouse/>
      default:
        return <View></View>
    }
  };

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.topicListContainer}>
        {unit.topics?.map((topic) => {
          return <TopicTile topic={topic} key={topic.id} unit={unit}/>;
        })}
      </ScrollView>
    </View>
  );
};


export default TopicsPage;

const styles = {
  containerStyle: {
    width: wp('100%'),
    backgroundColor: '#FFF7DD',
    paddingTop: hp('15%'),
  },
  topicListContainer: {
    width: wp('80%'),
    marginLeft: wp('10%'),
    overflow: 'scroll',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  opacityStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imgStyle: {
    height: '90%',
    width: '100%',
  },
  captionText: {
    fontFamily: 'Nexa Bold',
    fontSize: 24,
  },
  lessonText: {
    fontFamily: 'Nexa Bold',
    fontSize: 18,
    marginTop: 5,
  },
};

/*
        return (
          <View style={styles.topicTileContainer}>
            <TouchableOpacity
              style={styles.opacityStyle}
              onPress={() =>
                navigation.navigate('Quiz', {
                  topic: topic,
                  unit: unit,
                })
              }>
              <MouseFlower style={styles.imgStyle} />
              <Text style={styles.captionText}> {topic.name} </Text>
              <Text style={styles.lessonText}> Lesson Title </Text>
            </TouchableOpacity>
          </View>
        );
        */

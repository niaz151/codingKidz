import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Topic, Unit} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';
import MouseFlower from '../../../assets/images/mouse_flower.svg';
import MouseFlowerLocked from '../../../assets/images/mouse_flower_locked.svg';
import MouseFlowerCompleted from '../../../assets/images/mouse_flower_completed.svg';
import {QuizResultStatus} from '../../../utils/Models';
import axios from 'axios';
import { useAppSelector } from '../../../ducks/store';

type Props = StackScreenProps<UnitsStackParamList, 'Topics'>;

const TopicsPage = (props: Props) => {
  const [topicData, setTopicData] = useState<string | null>();
  const {route, navigation} = props;
  const {unitId, unitName} = route.params;
  var unit_quoted = unitName;
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  navigation.setOptions({headerTitle: unit_quoted});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/language/unit/${unitId + 1}/topic/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then( (res) => {
      const res_topics = res.data.topics
      setTopicData(JSON.stringify(res_topics));
    });
  });


  function renderTiles(){
    var output = []
    var topic_data_parsed = JSON.parse(topicData!)
    for(var i = 0; i < topic_data_parsed.length; i ++){
      output.push(
        <TopicTile unitId={unitId} unitName={unitName} topicName={topic_data_parsed[i].name} topic={topic_data_parsed[i]} key={i} />
      )
    }
    return output;
  }


  const TopicTile = (_props: {topic: Topic; unitId: number, unitName: string}) => {
    const {topic, unitId, unitName} = _props;
    var [quizStatus, setQuizStatus] = useState<QuizResultStatus | null>(null);
    var output: any = <View></View>;

    const LockedMouse = () => {
      return (
        <View style={styles.topicTileContainer}>
          <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => Alert.alert('Topic is Locked')}>
            <MouseFlowerLocked style={styles.imgStyle} />
            <Text style={styles.captionText}> Lesson {topic.id} </Text>
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
                topicId: topic.id,
                unitId: unitId,
                topic: topic,
                unitName: unitName
              })
            }>
            <MouseFlower style={styles.imgStyle} />
            <Text style={styles.captionText}> Lesson {topic.id} </Text>
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
                topicId: topic.id,
                unitId: unitId,
                topic: topic,
                unitName: unitName
              })
            }>
            <MouseFlowerCompleted style={styles.imgStyle} />
            <Text style={styles.captionText}> Lesson {topic.id} </Text>
            <Text style={styles.lessonText}> Lesson Title </Text>
          </TouchableOpacity>
        </View>
      );
    };

    useEffect(() => {
      // @ts-expect-error
      setQuizStatus(topic.quizResults[0].status);
    }, []);

    switch (quizStatus) {
      case QuizResultStatus.PENDING:
        return <PendingMouse />;
      case QuizResultStatus.LOCKED:
        return <LockedMouse />;
      case QuizResultStatus.COMPLETED:
        return <CompletedMouse />;
      default:
        return <View></View>;
    }
  };

  return (
    <View style={styles.containerStyle}>
      {topicData? 
        <ScrollView contentContainerStyle={styles.topicListContainer}>
          {renderTiles()}
        </ScrollView>
        : null}
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

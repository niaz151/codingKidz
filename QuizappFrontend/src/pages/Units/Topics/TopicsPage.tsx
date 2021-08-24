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

type Props = StackScreenProps<UnitsStackParamList, 'Topics'>;

const TopicsPage = (props: Props) => {
  const {route, navigation} = props;
  const {unitId, unitName} = route.params;
  var unit_quoted = unitName;
  navigation.setOptions({headerTitle: unit_quoted});

  const TopicTile = (_props: {topic: Topic; unit: Unit}) => {
    const {topic, unit} = _props;
    var [quizStatus, setQuizStatus] = useState<QuizResultStatus | null>(null);
    var output: any = <View></View>;

    const LockedMouse = () => {
      return (
        <View style={styles.topicTileContainer}>
          <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => Alert.alert('Topic is Locked')}>
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
            <MouseFlowerCompleted style={styles.imgStyle} />
            <Text style={styles.captionText}> {topic.name} </Text>
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
      <ScrollView contentContainerStyle={styles.topicListContainer}>
        {unit.topics?.map((topic) => {
          return <TopicTile topic={topic} key={topic.id} unit={unit} />;
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

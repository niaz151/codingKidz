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
import {useAppDispatch, useAppSelector} from '../../../ducks/store';
import axios from 'axios';

type Props = StackScreenProps<UnitsStackParamList, 'Topics'>;

const TopicsPage = (props: Props) => {
  const {route, navigation} = props;
  const {unit} = route.params;
  const quizData: QuizResult[] = [];
  const [quizDataState, setQuizDataState] = useState<QuizResult[] | null>(null);
  var unit_quoted = JSON.stringify(unit.name);
  var unit_unquoted = JSON.parse(unit_quoted);

  navigation.setOptions({headerTitle: unit_unquoted});

  const TopicTile = (_props: {topic: Topic; unit: Unit}) => {
    const {topic, unit} = _props;

    if (quizDataState != null){
      unit.topics?.map( (topic) => {
        console.log(quizDataState)
      })
      console.log(' = = = =')
    }

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
    unit.topics?.map(async (topic) => {
      axios
        .get<QuizResult[]>(
          `http://localhost:8000/api/language/topic/${topic.id}/getQuizResults`,
        )
        .then((response) => {
          // @ts-expect-error:
          var data = response.data.quizData;
          quizData.push(data);
        })
        .then((res) => {
          setQuizDataState(quizData);
        });
    });
  }, []);

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

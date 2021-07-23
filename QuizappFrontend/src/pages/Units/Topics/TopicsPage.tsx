import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Topic} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';
import MouseFlower from '../../../assets/images/mouse_flower.svg';

type Props = StackScreenProps<UnitsStackParamList, 'Topics'>;

const TopicsPage = (props: Props) => {
  const {route, navigation} = props;
  const {unit} = route.params;

  var unit_quoted = JSON.stringify(unit.name);
  var unit_unquoted = JSON.parse(unit_quoted);

  navigation.setOptions({headerTitle: unit_unquoted})


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
          <Text style={styles.captionText}> {topic.name} </Text>
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
    width: wp('100%'),
    backgroundColor: '#FFF7DD',
    paddingTop:hp("15%")
  },
  topicListContainer:{
    width: wp('80%'),
    marginLeft:wp("10%"),
    overflow:'scroll',
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
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
  opacityStyle:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    height:'100%',
  },  
  imgStyle:{
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

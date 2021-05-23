import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, View} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Unit} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../ducks/store';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from './UnitsStack';

type Props = StackScreenProps<UnitsStackParamList, 'Units'>;

export const UnitsPage = (props: Props) => {
  const {navigation, route} = props;
  const {language} = route.params;
  const languages = useAppSelector((state) => state.languagesReducer.languages);
  const units = languages?.filter((l) => l.id === language.id)[0].units;

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

  const UnitTile = (_props: {
    unit_name: String;
    unit_id: Number;
    topic_num: Number;
  }) => {
    const {unit_name, unit_id, topic_num} = _props;
    return (
      <View style={styles.unitTileContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Lessons', {
              unit_id: unit_id,
              topic_num: topic_num,
            })
          }>
          <Text style={styles.unitTileText}>{unit_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {`LET'S LEARN SCRATCH!`}
        </Text>
      </View>
      {units ? (
        <View style={styles.unitsList}>
          {units.map((unit, index) => {
            return (
              <UnitTile
                unit_name={unit.name}
                unit_id={unit.id}
                topic_num={index + 1}
                key={index}
              />
            );
          })}
        </View>
      ) : (
        <View>
          <Text>Loading units...</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor:'#FFF8DE'
  },
  title: {
    height: hp('10%'),
    width: wp('100%'),
    borderColor:'black',
    borderWidth:1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40,
  },
  titleText: {
    color: 'black',
    fontSize: 60,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  unitsList: {
    borderColor:'black',
    borderWidth:1,
    height: hp('70%'),
    width: wp('70%'),
    marginLeft:wp("15%"),
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitTileContainer: {
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 20,
    height: hp('8%'),
    width: wp('30%'),
    marginTop: hp('10%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitTileText: {
    fontSize: 28,
    color: 'black',
  },
};

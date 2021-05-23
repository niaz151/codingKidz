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

  const UnitTile = (_props: {unit: Unit}) => {
    const {unit} = _props;
    return (
      <View style={styles.unitTileContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Topics', {
              unit: unit,
            })
          }>
          <Text style={styles.unitTileText}>{unit.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          LET'S LEARN {language.name.toUpperCase()}!
        </Text>
      </View>
      {language ? (
        <View style={styles.unitsList}>
          {language.units?.map((unit) => {
            return <UnitTile unit={unit} key={unit.id} />;
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
    backgroundColor: '#FF671D',
  },
  title: {
    height: hp('10%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  unitsList: {
    height: hp('70%'),
    width: wp('100%'),
    flex: 1,
    color: 'white',
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  unitTileContainer: {
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 5,
    height: hp('15%'),
    maxHeight: 60,
    width: wp('35%'),
    maxWidth: 150,
    flexBasis: '40%',
    marginTop: hp('10%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitTileText: {
    fontSize: 20,
    color: 'black',
  },
};

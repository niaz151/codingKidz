import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, View, ScrollView} from 'react-native';
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
        <ScrollView contentContainerStyle={styles.unitsList}>
          {language.units?.map((unit) => {
            return <UnitTile unit={unit} key={unit.id} />;
          })}
        </ScrollView>
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
    backgroundColor: '#FFF8DE',
  },
  title: {
    height: hp('10%'),
    width: wp('100%'),
    borderColor: 'black',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  titleText: {
    color: 'black',
    fontSize: 60,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  unitsList: {
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

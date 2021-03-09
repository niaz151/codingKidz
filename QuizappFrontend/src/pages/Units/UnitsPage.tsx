import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import {Text, View} from 'react-native';

const UnitTile = () => {
  return (
    <View style={styles.unitTileContainer}>
      <Text style={styles.unitTileText}> Tile </Text>
    </View>
  );
};

export const UnitsPage = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}> LET'S LEARN SCRATCH! </Text>
      </View>
      <View style={styles.unitsList}>
        <UnitTile />
        <UnitTile />
        <UnitTile />
        <UnitTile />
        <UnitTile />
      </View>
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
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  unitsList: {
    borderWidth: 1,
    borderColor: 'black',
    height: hp('70%'),
    width: wp('100%'),
  },
  unitTileContainer: {
    borderWidth:1,
    borderColor:"black",
    height: hp("10%"),
    maxHeight:70,
    width: wp("35%"),
    maxWidth:200,
  },
  unitTileText:{
    
  }
};

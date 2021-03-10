import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, View} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';

const UnitTile = () => {
  return (
    <View style={styles.unitTileContainer}>
      <Text style={styles.unitTileText}> Lesson</Text>
    </View>
  );
};

export const UnitsPage = (props: {
  accessToken: string;
  logout: () => Promise<void>;
  }) => 
  {
  const navigation = useNavigation();

  // const {accessToken} = useTokenContext();
  const {accessToken, logout} = props;

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
        <UnitTile />
      </View>
      <Button onPress={logout}>Logout</Button>
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
    height: hp('70%'),
    width: wp('100%'),
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
    display:'flex',
    justifyContent:'space-around',
    alignItems: 'center'
  },
  unitTileContainer: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius:5,
    height: hp('10%'),
    maxHeight: 70,
    width: wp('35%'),
    maxWidth: 200,
    flexBasis:"40%",
    marginTop:hp("10%"),
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  unitTileText: {},
};

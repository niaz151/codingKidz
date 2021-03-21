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

export const UnitsPage = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.userReducer.accessToken);
  const [units, setUnits] = useState<Unit[]>();

  useEffect(() => {
    const getUnits = async () => {
      return await axios
        .get('http://localhost:8000/api/unit', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            console.log('RESPONSE DATA', response.data);
            let tempUnits: Unit[] = [];
            response.data.units.map((unit: Unit) => {
              tempUnits.push(unit);
            });
            setUnits(tempUnits);
          },
          (error) => {
            console.log('fetching error', error);
          },
        );
    };

    getUnits();
  }, [accessToken]);

  const UnitTile = (_props: {unit: Unit; id: Number, unitNum:Number}) => {
    const {unit, id, unitNum} = _props;
    return (
      <View style={styles.unitTileContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Lessons', {id: id, unitNum:unitNum})}>
          <Text style={styles.unitTileText}>{unit.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}> LET'S LEARN SCRATCH! </Text>
      </View>
      {units ? (
        <View style={styles.unitsList}>
          {units.map((unit, index) => {
            return <UnitTile unit={unit} key={index} unitNum={index + 1} id={unit.id} />;
          })}
        </View>
      ) : (
        <View>
          <Text>Loading units...</Text>
        </View>
      )}

      {/*
      <Button
        onPress={() => {
          dispatch(logout());
        }}>
        Logout
      </Button>
      */}
      
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

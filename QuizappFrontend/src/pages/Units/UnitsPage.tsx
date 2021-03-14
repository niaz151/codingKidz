import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, View} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';

interface Unit {
  id: number;
  name: string;
  number: number;
}

export const UnitsPage = (props: {
  accessToken: string;
  logout: () => Promise<void>;
}) => {
  const navigation = useNavigation();
  const {accessToken, logout} = props;
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

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}> LET'S LEARN SCRATCH! </Text>
      </View>
      {units ? (
        <View style={styles.unitsList}>
          <Text style={styles.unitTileText}>
          {units.map((unit) => {
           return unit.name
          })}
          </Text>
        </View>
      ) : (
        <View>
          <Text>Loading units...</Text>
        </View>
      )}
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
    flex: 1,
    borderWidth:1,
    borderColor:'black',
    color:'white',
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  unitTileContainer: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 5,
    height: hp('10%'),
    maxHeight: 70,
    width: wp('35%'),
    maxWidth: 200,
    flexBasis: '40%',
    marginTop: hp('10%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitTileText: {
    fontSize:30,
    color:'white'
  },
};

import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, View, ScrollView, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Unit} from '../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from './UnitsStack';

type Props = StackScreenProps<UnitsStackParamList, 'Units'>;

export const UnitsPage = (props: Props) => {
  const {navigation, route} = props;
  const {language} = route.params;

  var title_quoted = JSON.stringify(language.name);
  var title = JSON.parse(title_quoted);

  navigation.setOptions({headerTitle: title})

  var colors = [
    '#3FA6D3',
    '#3D5CAA',
    '#B767A9',
    '#FED500',
    '#FBAA1F',
    '#4EBFE6',
    '#4DB84D',
    '#F68B24',
    '#F16680',
    '#FF671D',
  ];

  function getRandomColor(){
    let temp_colors = colors;
    var random_int = getRandomInt(0, temp_colors.length);
    const random_color = temp_colors[random_int];
    temp_colors.splice(random_int,1);
    colors = temp_colors;
    return random_color;
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const UnitTile = (_props: {unit: Unit}) => {
    const {unit} = _props;
    return (
      <View
        style={[
          styles.unitTileContainer,
          {backgroundColor: `${getRandomColor()}`},
        ]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Topics', {
              unit: unit,
            })
          }
          style={styles.touchableStyles}>
          <Text style={styles.unitTileText}>{unit.name}</Text>
          <Text style={styles.unitTileIcon}> &#9660; </Text>
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
    backgroundColor: '#FFF7DD',
  },
  title: {
    height: hp('20%'),
    width: wp('80%'),
    //borderColor: 'black',
    //borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  touchableStyles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#FF671D',
    fontSize: 72,
    fontFamily:'Nexa Bold',
    letterSpacing: 1,
  },
  unitsList: {
    width: wp('70%'),
    marginLeft: wp('15%'),
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitTileContainer: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    height: 90,
    width: wp('30%'),
    marginTop: hp('10%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitTileText: {
    fontSize: 40,
    color: 'white',
    fontFamily:'Nexa Bold',
    width: '70%',
    //borderColor:'black',
    //borderWidth:1,
    textAlign: 'center',
    paddingLeft: '20%',
    paddingTop:'2%'
  },
  unitTileIcon: {
    width: '30%',
    //borderColor:'black',
    //borderWidth:1,
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
  },
  elipse: {
    height: 200,
    width: 400,
    borderRadius: 50,
    transform: 'rotate(-10deg)',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#e1ecf4',
  },
};

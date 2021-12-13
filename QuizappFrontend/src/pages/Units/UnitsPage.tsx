import React,{useEffect, useReducer, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, View, ScrollView, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Unit} from '../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from './UnitsStack';
import {useAppSelector} from '../../ducks/store';
import axios from 'axios';
import { UnitStatus } from '../../utils/Models';
import {TokenService} from '../../services';

type Props = StackScreenProps<UnitsStackParamList, 'Units'>;

export const UnitsPage = (props: Props) => {
  const {navigation, route} = props;
  const {language} = route.params;
  const [unitData, setUnitData] = useState<string | null>();
  var title_quoted = JSON.stringify(language.name);
  var title = JSON.parse(title_quoted);
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

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

  useEffect(() => {
    axios.get(`http://localhost:8000/api/language/${language.id}/unit`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then( (res) => {
      const res_units = res.data.units
      var sorted_arr = sortArrById(res_units)
      setUnitData(JSON.stringify(sorted_arr));
    });
  });

  const sortArrById = (inputArr: any) => {
    let id_arr = [];
    for(var i = 0; i < inputArr.length; i++) {
      id_arr.push(inputArr[i].id);
    }
    id_arr.sort();
    let output_arr: any = [];
    for(let i = 0; i < id_arr.length; i++) {
      var id = id_arr[i];
      for(var j = 0; j < inputArr.length; j++) {
        if(inputArr[j].id === id) {
          output_arr.push(inputArr[j]);
        }
      }
    }
    return output_arr;
  }

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

  function renderTiles(){
    var output = []
    var unit_data_parsed = JSON.parse(unitData!)
    for(var i = 0; i < unit_data_parsed.length; i ++){
      output.push(
        <UnitTile unitId={i} key={i} unitName={unit_data_parsed[i].name} status={unit_data_parsed[i].status} />
      )
    }
    return output;
  }

  const UnitTile = (_props: {unitId: number, unitName: string, status: string}) => {
    const {unitId, unitName, status} = _props;
    var styleRef = {};
    if(status === UnitStatus.COMPLETED){
      styleRef = styles.completedStyles
    }
    if(status === UnitStatus.PENDING){
      styleRef = styles.pendingStyles;
    }
    if(status === UnitStatus.LOCKED){
      styleRef = styles.lockedStyles;
    } 
    return (
      <View
        style={[
          styles.unitTileContainer,
          {backgroundColor: `${getRandomColor()}`},
          styleRef,
        ]}
        >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Topics', {
              unitId: unitId,
              unitName: unitName,
            })
          }
          style={styles.touchableStyles} >  
          <Text style={styles.unitTileText}>{unitName}</Text>
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
      {unitData ? (
        <ScrollView contentContainerStyle={styles.unitsList}>
          {renderTiles()}
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
  pendingStyles:{
    opacity:1,
    backgroundColor: 'blue',
  },
  lockedStyles:{
    opacity: 0.5,
    backgroundColor: 'red',
  },
  completedStyles:{

  }
};

import React, { useEffect, useReducer, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, View, ScrollView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { UnitsStackParamList } from './UnitsStack';
import { useAppSelector } from '../../ducks/store';
import axios from 'axios';
import { UnitStatus } from '../../utils/Models';
import { useIsFocused } from '@react-navigation/native';

type Props = StackScreenProps<UnitsStackParamList, 'Units'>;

type UnitData = {
  id: number;
  name: string;
  number: number,
  languageId: number,
  status: UnitStatus,
};

export const UnitsPage = (props: Props) => {
  const { navigation, route } = props;
  const { language } = route.params;
  const [unitData, setUnitData] = useState<UnitData[] | null>();
  const isFocused = useIsFocused();
  let statusArr: any = [];
  var title_quoted = JSON.stringify(language.name);
  var title = JSON.parse(title_quoted);
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

  navigation.setOptions({ headerTitle: title })

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
    if(isFocused){ 
      getUnits();
  }
  },[isFocused])

  const getUnits = () => {
    axios.get(`http://localhost:8000/api/language/${language.id}/unit`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const res_units = res.data.units
        var sorted_arr = sortArrById(res_units)
        setUnitData(sorted_arr);
      });
  }

  const sortArrById = (inputArr: any) => {
    let id_arr = [];
    for (var i = 0; i < inputArr.length; i++) {
      id_arr.push(inputArr[i].id);
    }
    id_arr.sort();
    let output_arr: any = [];
    for (let i = 0; i < id_arr.length; i++) {
      var id = id_arr[i];
      for (var j = 0; j < inputArr.length; j++) {
        if (inputArr[j].id === id) {
          output_arr.push(inputArr[j]);
        }
      }
    }
    return output_arr;
  }

  function getRandomColor() {
    let temp_colors = colors;
    var random_int = getRandomInt(0, temp_colors.length);
    const random_color = temp_colors[random_int];
    temp_colors.splice(random_int, 1);
    colors = temp_colors;
    return random_color;
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

  function renderTiles() {
    var output = []
    var unit_data_parsed = unitData!
    for (var i = 0; i < unit_data_parsed.length; i++) {
      output.push(
        <UnitTile unitId={i+1} key={i} unitName={unit_data_parsed[i].name} status={unit_data_parsed[i].status} />
      )
    }
    return output;
  }

  const UnitTile = (_props: { unitId: number, unitName: string, status: string }) => {

    const { unitId, unitName, status } = _props;
    var styleRef = {};

    if (status === UnitStatus.COMPLETED) {
      styleRef = styles.completedStyles
    }
    if (status === UnitStatus.PENDING) {
      styleRef = styles.pendingStyles;
    }
    if (status === UnitStatus.LOCKED) {
      styleRef = styles.lockedStyles;
    }

    const unlockedNav = () => {
      navigation.navigate('Topics', {
        unitId: unitId-1,
        unitName: unitName,
      })   
    }

    const lockedNav = () => {
      Alert.alert("Unit Is Locked");
    }

    return (
      <View
        style={[
          styles.unitTileContainer,
          { backgroundColor: `${getRandomColor()}` },
          styleRef,
        ]}
      >
        <TouchableOpacity
          onPress={status === UnitStatus.LOCKED ? lockedNav : unlockedNav}
          style={styles.touchableStyles} >
          <Text style={styles.unitTileText}>{unitName}</Text>
          {/* <Text style={styles.unitTileIcon}> &#9660; </Text> */}
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

    // const checkIfCompleted = () => {
    //   var isCompleted : boolean = true;
    //   for(var i = 0; i < topicData.length; i++) {
    //     if(topicData[i] !== UnitStatus.COMPLETED){
    //       isCompleted = false;
    //     }
    //   }
    //   return isCompleted;
    // }


    // // if unit should be completed, update status accordingly and unlock next unit
    // if(statusData !== []){
    //   if(checkIfCompleted()){
    //     completeUnit(unitId);
    //     unlockUnit(unitId+1);
    //   }
    // }

      // const getTopicStatuses = () => {
  //   let unitIdArr = [];
  //   if (unitData != null && unitData != undefined) {
  //     for (var i = 0; i < unitData.length; i++) {
  //       unitIdArr.push(unitData[i].id);
  //     }
  //     unitIdArr.map(id => {
  //       axios.get(`http://localhost:8000/api/language/unit/${id}/getTopicStatuses`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //         .then((res) => {
  //           var topicData = res.data.topicData;
  //           var output: any = [];
  //           for (var i = 0; i < topicData.length; i++) {
  //             output.push(topicData[i].quizResults[0].status);
  //           }
  //           setStatusData(statusData => [...statusData, output]);
  //         });
  //     })  
  //   }
  // }

  // useEffect(() => {
  //   if(isFocused){
  //     getTopicStatuses();
  //   }
  // }, []);

  // const unlockUnit = (unitId: number) => {
  //   console.log("unlocking")
  //   axios.post(`http://localhost:8000/api/language/unit/${unitId}/updateStatus/${UnitStatus.PENDING}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((res) => {
  //      var data = res.data
  //       //console.log(res.data)
  //     });
  // }

  // const completeUnit = (unitId: number) => {
  //   axios.post(`http://localhost:8000/api/language/unit/${unitId}/updateStatus/${UnitStatus.COMPLETED}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((res) => {
  //      var data = res.data
  //       //console.log(res.data)
  //     });
  // }

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
    fontFamily: 'Nexa Bold',
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
    fontSize: 34,
    color: 'white',
    fontFamily: 'Nexa Bold',
    width: '75%',
    //borderColor:'black',
    //borderWidth:1,
    textAlign: 'center',
    marginTop: hp('0.5%'),
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
  pendingStyles: {
    opacity: 1,
  },
  lockedStyles: {
    opacity: 0.5,
    backgroundColor: 'gray',
  },
  completedStyles: {

  }
};

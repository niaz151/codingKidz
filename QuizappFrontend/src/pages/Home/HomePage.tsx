import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppDispatch, useAppSelector} from '../../ducks/store';
import {TokenService} from '../../services';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getLanguages} from '../Units/languagesSlice';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../App';
import MouseWhiskers from '../../assets/images/mouse_whiskers.svg';
import MouseTail from '../../assets/images/mouse_tail.svg';
import axios from 'axios';

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, 'HomeTab'>;
};

const HomePage = (props: Props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const _accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const {email} = TokenService.readToken(_accessToken);
  const languages = useAppSelector((state) => state.languagesReducer.languages);
  const languagesStatus = useAppSelector(
    (state) => state.languagesReducer.status,
  );

  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    if (languagesStatus === 'idle') {
      dispatch(getLanguages({}));
    }
  }, [dispatch, languagesStatus]);

  useEffect(() => {
    axios.post(`http://localhost:8000/api/language/1/initFirstUnit`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    axios.post(`http://localhost:8000/api/language/2/initFirstUnit`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  });


  return (
    <View style={styles.container}>
      <View style={styles.welcomeWrap}>
        <Text style={[styles.welcomeText]}> WELCOME </Text>
        <Text style={styles.emailText}> {email}</Text>
      </View>
      <View style={styles.languageWrap}>
        <View style={styles.languagePrompt}>
          <Text style={styles.promptText}>
            LET'S TEST YOUR KNOWLEDGE OF ... 
          </Text>
        </View>
        <View style={styles.languageList}>
          <View style={styles.semiWrap}>
            <TouchableOpacity style={styles.semiView} onPress={() => {}} />
            <TouchableOpacity style={styles.semiView} onPress={() => {}} />
          </View>
          <MouseTail style={styles.tailStyle} />

          {languages?.map((language) => {
            return (
              <TouchableOpacity
                key={language.id}
                style={styles.langugeTile}
                onPress={() => {
                  navigation.navigate('UnitsTab', {
                    screen: 'Units',
                    params: {language: language},
                  });
                }}>
                <Text style={styles.btnText}> {language.name} </Text>
              </TouchableOpacity>
            );
          })}

          <MouseWhiskers style={styles.whiskers} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF9DF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  welcomeWrap: {
    height: hp('10%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeText: {
    fontFamily:'Nexa Bold',
    fontSize: 55,
    color: '#FF671D',
    marginTop: hp("2%")
  },
  emailText: {
    fontFamily:'Nexa Light',
    fontSize: 40,
    color: 'black',
  },
  languageWrap: {
    height: hp('80%'),
    width: wp('100%'),
    marginLeft: wp('-2.5%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languagePrompt: {
    flex: 1,
    width: '100%',
    color: 'black',
    //borderColor:'black',
    //borderWidth:1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    fontFamily:'Nexa Bold',
    fontSize: 60,
    color: '#3FA6D3',
    marginTop: hp('-10%'),
    letterSpacing: 5
  },
  languageList: {
    flex: 1,
    width: '100%',
    marginTop: hp('-10%'),
    //borderColor:'black',
    //borderWidth:1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#FF671D',
  },
  semiWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp('10%'),
    width: wp('100%'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  semiView: {
    height: 200,
    width: 200,
    backgroundColor: '#FF671D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: hp('-7'),
  },
  langugeTile: {
    height: 75,
    width: 300,
    backgroundColor: '#FF671D',
    borderColor: 'white',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 50,
  },
  btnText: {
    fontFamily:'Nexa Bold',
    fontSize: 30,
    color: 'white',
    marginTop:hp("0.5%")
  },
  whiskers: {
    position: 'absolute',
    height: 600,
    width: 600,
    top: 0,
    left: wp('22%'),
  },
  tailStyle:{
    position: 'absolute',
    top: hp('-43%'),
    left:wp("15%"),
    height: 600,
    width: 600,
  }
});

export default HomePage;

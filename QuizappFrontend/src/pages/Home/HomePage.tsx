import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../ducks/store';
import {TokenService} from '../../services';

export const HomePage = () => {
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const {email} = TokenService.readToken(accessToken);


  return (
    <View style={styles.container}>
      <View style={styles.welcomeWrap}>
        <Text style={[styles.welcomeText, styles.bold]}> WELCOME </Text>
        <Text style={styles.emailText}> {email}</Text>
      </View>
      <View style={styles.languageWrap}>
        <View style={styles.languagePrompt}>
          <Text style={styles.promptText}>
            Let's test your knowledge of ...
          </Text>
        </View>
        <View style={styles.languageList}> 
          <Button mode="contained" style={styles.langugeTile}>
            <Text style={styles.btnText}> SCRATCH </Text>
          </Button>
          <Button mode="contained" style={styles.langugeTile}>
            <Text style={styles.btnText}> SCRATCH JR </Text>
          </Button>
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
    height: hp("10%"),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeText: {
    fontSize: hp("3%"),
    color: '#FF671D',
  },
  emailText: {
    fontSize: hp("2.8%"),
    color: 'black',
    fontWeight:'200'
  },
  languageWrap: {
    height: hp("80%"),
    //borderColor:'black',
    //borderWidth:1,
    marginTop: 40,
    width: wp('100%'),
    marginLeft:wp("-2.5%"),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languagePrompt: {
    flex:1,
    width: '100%',
    color: 'black',
    //borderColor:'black',
    //borderWidth:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  promptText: {
    fontWeight: '500',
    fontSize: hp("3%"),
    color:'#3FA6D3',
  },
  languageList:{
    flex:1,
    width:'100%',
    //borderColor:'black',
    //borderWidth:1,
    display:'flex',
    paddingTop:50,
    alignItems:'flex-start',
    justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor: '#FF671D',
  },
  langugeTile:{
    height: 65,
    width: 170,
    backgroundColor: '#FF671D',
    borderColor:'white',
    borderWidth:2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText:{
    fontSize:18
  }
});

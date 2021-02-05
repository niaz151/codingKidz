import 'react-native-gesture-handler';
import {StatusBar, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import TestPage from './pages/TestPage';
import Splash from './pages/Splash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UnitsStack, HomeStack} from './pages';
import {SafeAreaView} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();


interface CustomProps {
  showSplash: boolean
}

interface CustomState {
  showSplash: boolean
}

class App extends Component<CustomProps, CustomState> {

  constructor(props: any) {
    super(props);
    this.state = {
      showSplash: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({showSplash:false})
    }, 2500)
  }

  render(){
    if(this.state.showSplash){
      return(
        <SafeAreaView style={styles.viewStyles}>
          <Splash/>    
        </SafeAreaView>
      )
    }
    else{
      return (
        <SafeAreaView>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  switch (route.name) {
                    case 'Home':
                      return (
                        <Ionicons
                          name={`home-${focused ? 'outline' : 'sharp'}`}
                          size={size}
                          color={color}
                        />
                      );
                    case 'Units':
                      return (
                        <Ionicons
                          name={`book-${focused ? 'outline' : 'sharp'}`}
                          size={size}
                          color={color}
                        />
                      );
                    case 'Settings':
                      return (
                        <Ionicons name={`cog-${focused ? 'outline' : 'sharp'}`} />
                      );
                  }
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Units" component={UnitsStack} />
              <Tab.Screen name="Settings" component={TestPage} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      );
    }
  }
};

const styles = StyleSheet.create({
  viewStyles:{
    backgroundColor:"#FF671D"
  }
}) 

export default App;

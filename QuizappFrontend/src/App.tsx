import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import TestPage from './pages/TestPage';
import Splash from './pages/Splash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UnitsStack, HomeStack} from './pages';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const App = () => {
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
          <Tab.Screen name="Splash" component={Splash} />
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Units" component={UnitsStack} />
          <Tab.Screen name="Settings" component={TestPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

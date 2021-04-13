import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  AuthStack,
  UnitsStack,
  HomeStack,
  SettingsStack,
  NotificationsStack,
} from './pages';
import {store, useAppDispatch, useAppSelector} from './ducks/store';
import {
  logout,
  refreshTokens,
  restoreRefreshToken,
} from './pages/Auth/authSlice';

Ionicon.loadFont();

const App = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authReducer.status);
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const refreshToken = useAppSelector((state) => state.authReducer.accessToken);

  const Tab = createBottomTabNavigator();

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FF671D'}} />
      <SafeAreaView style={styles.viewStyles}>
        <NavigationContainer>
          {accessToken ? (
            <Tab.Navigator
              tabBarOptions={{
                labelStyle: {
                  color: 'black',
                  fontSize: 14,
                },
                showLabel: false,
                style: {
                  backgroundColor: '#FF671D',
                },
              }}>
              <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                  tabBarIcon: () => <Icon name="home" size={25} />,
                }}
              />
              <Tab.Screen
                name="Units"
                component={UnitsStack}
                options={{
                  tabBarIcon: () => <Icon name="library" size={25} />,
                }}
              />
              <Tab.Screen
                name="Notifications"
                component={NotificationsStack}
                options={{
                  tabBarIcon: () => <Icon name="notifications" size={25} />,
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsStack}
                options={{
                  tabBarIcon: () => <Icon name="settings" size={25} />,
                }}
              />
            </Tab.Navigator>
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    backgroundColor: '#FF671D',
  },
});

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;

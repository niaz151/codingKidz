import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
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
  HomePage,
  SettingsStack,
  NotificationsStack,
} from './pages';
import {store, useAppDispatch, useAppSelector} from './ducks/store';
import {
  logout,
  refreshTokens,
  restoreRefreshToken,
} from './pages/Auth/authSlice';
import {Unit, Language} from './utils';

Ionicon.loadFont();

export type RootTabParamList = {
  HomeTab: undefined;
  UnitsTab: undefined;
  NotificationsTab: undefined;
  SettingsTab: undefined;
};

const App = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authReducer.status);
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const refreshToken = useAppSelector((state) => state.authReducer.accessToken);

  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <>
      <SafeAreaView style={{flex: 0}} />
      <SafeAreaView style={styles.viewStyles}>
        <NavigationContainer>
          {accessToken ? (

            <Tab.Navigator
              tabBarOptions={{
                style:{
                  height: 100
                },
                labelStyle: {
                  color: 'black',
                  fontSize: 14,
                },
                showLabel: false,
              }}>
              <Tab.Screen
                name="HomeTab"
                component={HomePage}
                options={{
                  tabBarIcon: () => <Icon name="home" size={40}  style={{marginLeft:-10}}/>,
                }}
              />
              <Tab.Screen
                name="UnitsTab"
                component={UnitsStack}
                options={{
                  tabBarIcon: () => <Icon name="library" size={40}  style={{marginLeft:-10}}/>,
                }}
              />
              <Tab.Screen
                name="NotificationsTab"
                component={NotificationsStack}
                options={{
                  tabBarIcon: () => <Icon name="notifications" size={40}  style={{marginLeft:-10}} />,
                }}
              />
              <Tab.Screen
                name="SettingsTab"
                component={SettingsStack}
                options={{
                  tabBarIcon: () => <Icon name="settings" size={40}  style={{marginLeft:-10}} />,
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
  },
});

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;

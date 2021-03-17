/**
 * @format
 */

import {AppRegistry} from 'react-native';

import React from 'react';

import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});

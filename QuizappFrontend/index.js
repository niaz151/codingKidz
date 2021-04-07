/**
 * @format
 */

import {AppRegistry} from 'react-native';

import React from 'react';

import App from './src/App';
import {name as appName} from './src/app.json';

// Start app for regular react-native
AppRegistry.registerComponent(appName, () => App);

// TODO Fix 'document not found' error
// Start app for react-native-web
// AppRegistry.runApplication(appName, {
//   rootTag: document.getElementById('root'),
// });

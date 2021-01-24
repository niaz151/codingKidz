/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {SafeAreaView, Text, StatusBar, Platform} from 'react-native';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
const App = () => {
  const [test, setTest] = useState<string>();
  const [testError, setTestError] = useState<string>();
  useEffect(() => {
    axios.get('http://localhost:8000/api/test').then(
      (value) => {
        setTest(value.data.message);
      },
      (error) => {
        setTestError(String(error));
      },
    );
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {!test && !testError && <Text>Loading test...</Text>}
        {test && <Text>{test}</Text>}
        {testError && <Text>{testError}</Text>}
      </SafeAreaView>
    </>
  );
};

export default App;

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const TestPage = () => {
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {!test && !testError && <Text>Loading test...</Text>}
      {test && <Text>Message from the other side: {test}</Text>}
      {testError && <Text>{testError}</Text>}
    </View>
  );
};

export default TestPage;

import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Role} from '../utils';

interface TokenContents {
  id: number;
  email: string;
  roles: Role[];
  iat: number;
  exp: number;
}

const readToken = (token: string) => {
  try {
    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    ) as TokenContents;
  } catch (error) {
    throw new Error(error);
  }
};

const isTokenExpired = (token: string) => {
  const decodedToken = readToken(token);

  // token exp time is measured in seconds not milliseconds
  const currentTimeInUnixSeconds = Math.floor(Date.now() / 1000);

  return Number(decodedToken.exp) < currentTimeInUnixSeconds;
};

const storeRefreshTokenInStorage = async (token: string) => {
  try {
    return await AsyncStorage.setItem('@refreshToken', token);
  } catch (error) {
    throw new Error(`AsyncStorage Error: ${error.message}`);
  }
};

const getRefreshTokenFromStorage = async () => {
  try {
    const storedRefreshToken = await AsyncStorage.getItem('@refreshToken');
    if (storedRefreshToken) {
      return storedRefreshToken;
    } else {
    }
  } catch (error) {
    throw new Error(`AsyncStorage Error: ${error}`);
  }
};

const removeRefreshTokenFromStorage = async () => {
  try {
    return await AsyncStorage.removeItem('@refreshToken');
  } catch (error) {
    throw new Error(`AsyncStorage Error: ${error}`);
  }
};

export default {
  readToken,
  isTokenExpired,
  storeRefreshTokenInStorage,
  getRefreshTokenFromStorage,
  removeRefreshTokenFromStorage,
};

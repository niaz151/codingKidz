import React, {useState, createContext} from 'react';

export const TokenContext = createContext();

export const TokenProvider = props => {
  const [accessToken, setAccessToken] = useState({token:''});
  return(
    <TokenContext.Provider  value={[accessToken,setAccessToken]}>
      {props.children}
    </TokenContext.Provider>
  );
}
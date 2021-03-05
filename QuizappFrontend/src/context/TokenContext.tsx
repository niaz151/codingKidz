import React, {useState, createContext} from 'react';

type TokenContextType = {
  accessToken: string | undefined;
  storeAccessToken: (token: string) => void;
  refreshToken: string | undefined;
  storeRefreshToken: (token: string) => void;
};

const contextDefaultValues: TokenContextType = {
  accessToken: undefined,
  storeAccessToken: () => {},
  refreshToken: undefined,
  storeRefreshToken: () => {},
};

const TokenContext = createContext<TokenContextType>(contextDefaultValues);

const TokenProvider: React.FC = ({children}) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  const storeAccessToken = (token: string) => setAccessToken(token);
  const storeRefreshToken = (token: string) => {
    setRefreshToken(token);
  };

  return (
    <TokenContext.Provider
      value={{
        accessToken,
        storeAccessToken,
        refreshToken,
        storeRefreshToken,
      }}>
      {children}
    </TokenContext.Provider>
  );
};

export {TokenContext, TokenProvider};

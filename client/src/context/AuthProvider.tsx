import React, { createContext, useState } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface Prop {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Prop) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, setLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
export type { IAuthContext };

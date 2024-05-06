import { createContext, useState } from "react";

type AuthProviderContextType = {
  auth;
  setAuth: (auth) => void;
};

const AuthContext = createContext<AuthProviderContextType>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

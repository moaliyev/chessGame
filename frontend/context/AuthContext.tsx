import { createContext, useContext } from "react";

export const AuthContext = createContext<any>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

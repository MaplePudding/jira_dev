import React, { useContext } from "react";
import { AuthContextType } from "../types/auth";
import { useMe } from "../utils/hooks/useMe";
import { useMount } from "../utils/hooks/useMount";

const defaultActxValue = {
  isLoading: false,
  isFetching: true,
  isError: false,
  isIdle: true,
  data: {},
  isSuccess: false,
  refetch: () => {},
} as AuthContextType;

export const AuthContext =
  React.createContext<AuthContextType>(defaultActxValue);

AuthContext.displayName = "auth";

interface props {
  children: React.ReactNode[];
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth error");
  }
  return authContext;
};

export const AuthProvider = (props: props) => {
  const { isLoading, data, isFetching, isError, isSuccess, isIdle, refetch } =
    useMe();
  const { children } = props;

  const renderChildren = () => {
    return children.map((v) => {
      return v;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        data,
        isFetching,
        isError,
        isSuccess,
        isIdle,
        refetch,
      }}
    >
      {renderChildren()}
    </AuthContext.Provider>
  );
};

import React from "react";
import { AuthProvider } from "./auth";
import { QueryClientContext } from "./query";

interface props {
  children: React.ReactNode;
}

export const AppProvider = (props: props) => {
  const { children } = props;
  return <QueryClientContext>{children}</QueryClientContext>;
};

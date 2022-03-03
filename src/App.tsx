import React from "react";
import "./App.css";

import { Spin } from "@douyinfe/semi-ui";
import { BrowserRouter } from "react-router-dom";
import { AuthPage } from "./pages/auth";
import { useAuth } from "./context/auth";
import { UnAuthPage } from "./pages/unauth";

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        {auth.isIdle || auth.isLoading || auth.isFetching ? (
          <Spin style={{ width: "90vw", height: "90vh" }} />
        ) : auth?.data.status ? (
          <UnAuthPage />
        ) : (
          <AuthPage />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

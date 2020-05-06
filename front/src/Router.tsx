import React, { createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { UserToken } from "./types/context";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Users } from "./components/Users";

export const UserTokenContext = createContext<UserToken>({
  token: "",
  setToken: () => {},
});

export const Router = () => {
  const [token, setToken] = useState("");

  return (
    <UserTokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            children={!token ? <Redirect to="/login" /> : <Users />}
          />
          <Route
            path="/signup"
            exact
            children={token ? <Redirect to="/" /> : <SignUp />}
          />
          <Route
            path="/login"
            exact
            children={token ? <Redirect to="/" /> : <Login />}
          />
        </Switch>
      </BrowserRouter>
    </UserTokenContext.Provider>
  );
};

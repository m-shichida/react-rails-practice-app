import React, { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UserSession } from "./types/context";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Users } from "./components/Users";

export const UserSessionContext = createContext<UserSession>({
  uid: "",
  setUid: () => {},
});

export const Router = () => {
  const [uid, setUid] = useState("");

  return (
    <UserSessionContext.Provider value={{ uid, setUid }}>
      {!uid ? (
        <BrowserRouter>
          <Switch>
            <Route path="/signup" exact children={<SignUp />} />
            <Route path="/" exact children={<Login />} />
          </Switch>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact children={<Users />} />
          </Switch>
        </BrowserRouter>
      )}
    </UserSessionContext.Provider>
  );
};

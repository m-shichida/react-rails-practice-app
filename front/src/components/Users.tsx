import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import userService from "../repository/user";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const response = await userService.getUsers();
      setUsers(response.data);
    };
    getUser();
  }, []);

  return <Container>{users.count}</Container>;
};

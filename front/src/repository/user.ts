import { AxiosError } from "axios";

import { axiosInstance } from "./axiosInstance";

interface registrateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default {
  async registrateUser(params: registrateUserParams) {
    const response = await axiosInstance
      .post("/users/new", {
        first_name: params.firstName,
        last_name: params.lastName,
        email: params.email,
        password: params.password,
        password_confirmation: params.passwordConfirmation,
      })
      .then((response) => {
        return JSON.parse(JSON.stringify(response.data));
      })
      .catch((e: AxiosError) => {
        alert("エラーが発生しました");
        return null;
      });
    return response;
  },
  async getUsers() {
    const response = await axiosInstance
      .get("/users")
      .then((response) => {
        return JSON.parse(JSON.stringify(response.data));
      })
      .catch((e: AxiosError) => {
        alert("エラーが発生しました");
        return null;
      });
    return response;
  },
};

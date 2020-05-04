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
      .catch((e: AxiosError) => {
        return {
          error: 500,
          errorMessages: "エラーが発生しました",
        };
      });
    return response;
  },
};

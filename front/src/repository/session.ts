import { AxiosError } from "axios";

import { axiosInstance } from "./axiosInstance";

interface LoginParams {
  email: string;
  password: string;
}

export default {
  async loginUser(params: LoginParams) {
    const response = await axiosInstance
      .post("/login", {
        email: params.email,
        password: params.password,
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
};

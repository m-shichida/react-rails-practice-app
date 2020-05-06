import { Dispatch, SetStateAction } from "react";

export interface UserToken {
  token: string;
  setToken: Dispatch<SetStateAction<any>>;
}

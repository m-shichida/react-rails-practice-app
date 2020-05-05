import { Dispatch, SetStateAction } from "react";

export interface UserSession {
  uid: string;
  setUid: Dispatch<SetStateAction<any>>;
}

import { StateCreator } from "zustand";
import Cookies from "js-cookie";
export type UserDataType = { email: string; password: string; token: string };

export interface UserSlice {
  user: UserDataType;
  setUser: (val: UserDataType) => void;
  setUserEmail: (val: UserDataType["email"]) => void;
  setUserPassword: (val: UserDataType["password"]) => void;
  setUserToken: (val: UserDataType["token"]) => void;
  isAuthorized: boolean;
  setIsAuthorized: (val: boolean) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], []> = (set) => {
  const token = Cookies.get("accessToken") || "";

  return {
    user: { email: "", password: "", token },
    setUser: (user) => set((state) => ({ ...state, user })),
    setUserEmail: (email) =>
      set((state) => ({ ...state, user: { ...state.user, email } })),
    setUserPassword: (password) =>
      set((state) => ({ ...state, user: { ...state.user, password } })),
    setUserToken: (token) =>
      set((state) => ({ ...state, user: { ...state.user, token } })),

    isAuthorized: false,
    setIsAuthorized: (isAuthorized) =>
      set((state) => ({ ...state, isAuthorized })),
  };
};

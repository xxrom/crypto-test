import { StateCreator } from "zustand";

export type UserDataType = { email: string; password: string };

export interface UserSlice {
  user: UserDataType;
  setUser: (val: UserDataType) => void;
  setUserEmail: (val: string) => void;
  setUserPassword: (val: string) => void;
  isAuthorized: boolean;
  setIsAuthorized: (val: boolean) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], []> = (set) => ({
  user: { email: "admin@gmail.co", password: "adminadmin" },
  setUser: (user) => set((state) => ({ ...state, user })),
  setUserEmail: (email) =>
    set((state) => ({ ...state, user: { ...state.user, email } })),
  setUserPassword: (password) =>
    set((state) => ({ ...state, user: { ...state.user, password } })),

  isAuthorized: false,
  setIsAuthorized: (isAuthorized) =>
    set((state) => ({ ...state, isAuthorized })),
});

import { UserDataType } from "../slices";

export const toFixedNumber = (amount: number | string, accuracy = 6) =>
  Number(amount).toFixed(accuracy);

export const correctUserAuth: UserDataType = {
  email: "admin@gmail.com",
  password: "adminadmin",
};

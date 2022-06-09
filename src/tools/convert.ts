import { UserDataType } from "../hooks/useStore";

export const toFixedNumber = (amount: number | string, accuracy = 6) =>
  Number(amount).toFixed(accuracy);

type ConvertAssetsDataToAssetsTypeType = {
  data?: Array<any>;
};

export const convertAssetsDataToAssetsType = (
  box?: ConvertAssetsDataToAssetsTypeType
) =>
  box?.data ? box?.data?.map(({ symbol }, index: any) => symbol || index) : [];

export const correctUserAuth: UserDataType = {
  email: "admin@gmail.com",
  password: "adminadmin",
};

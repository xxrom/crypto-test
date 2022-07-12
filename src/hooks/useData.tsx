import { useQuery } from "react-query";
import { useStore } from "./useStore";
import {
  AssetsListType,
  AssetsType,
  DataArrayType,
  UserDataType,
} from "../slices";

const serverIP = "http://192.168.3.15:4444";
//const serverIP = 'https://api.nomics.com/v1';

// Fetch symbol without caching, getting real data
const fetchSymbol = async (symbol: string, base = "USDT") =>
  await fetch(`${serverIP}/currencies/convert/${base}/${symbol}`).then((res) =>
    res.json()
  );

export type AuthUserType = {
  accessToken: string;
  err?: { message: string };
  message?: string;
};

export const fetchUserLogin = ({
  email,
  password,
}: Omit<UserDataType, "token">) => (): Promise<AuthUserType> =>
  fetch(`${serverIP}/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    const data = await res.json();
    console.log("fetchUserLogin", data);

    return data;
  });

export const useUserLogin = ({
  email,
  password,
}: Omit<UserDataType, "token">) =>
  useQuery<any, AuthUserType>(
    `userLogin_${email}${password}`,
    fetchUserLogin({ email, password }),
    {
      enabled: email?.length >= 3 && password?.length >= 8,
      refetchOnMount: false,
      retryOnMount: false,
      cacheTime: 30 * 60 * 1000, // 30 min caching
      retry: 1,
    }
  );

export const useUserSingup = () => {
  const { user } = useStore();
  const { email = "", password = "" } = user;

  return useQuery<
    UserDataType & { accessToken: string; err?: { message: string } },
    any
  >(`userSingup_${email}${password}`, () =>
    fetch(`${serverIP}/user/post-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(async (res) => await res.json())
  );
};

export const useFetchAsset = (symbol: string, base: string) =>
  useQuery(
    `assest${symbol}${base}`,
    async () => await fetchSymbol(symbol, base)
  );

export const fetchAssets = (): Promise<DataArrayType> =>
  fetch(`${serverIP}/currencies/ticker`).then((res) => res.json());

//export const useAssets = () => useQuery("symbols", fetchAssets);
export const convertAssets = ({ data }: { data: DataArrayType }) => {
  const assets: AssetsType = [];
  const assetsList: AssetsListType = [];

  data?.reduce((_, { id, symbol, logo_url, price }, index) => {
    assets.push(symbol);
    assetsList.push({
      id,
      index,
      price,
      name: symbol,
      icon: logo_url,
    });

    return [];
  }, []);

  return { assets, assetsList };
};

export { serverIP };

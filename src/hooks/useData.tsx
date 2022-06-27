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

// Fetch symbol without cashing, getting real data
const fetchSymbol = async (symbol: string, base = "USDT") =>
  await fetch(`${serverIP}/currencies/convert/${base}/${symbol}`).then((res) =>
    res.json()
  );

export const useUserLogin = () => {
  const { user } = useStore();
  const { email = "", password = "" } = user;

  return useQuery<
    UserDataType & { accessToken: string; err?: { message: string } },
    any
  >(`userLogin_${email}${password}`, () =>
    fetch(`${serverIP}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json())
  );
};

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
    }).then((res) => res.json())
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

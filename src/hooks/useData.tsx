import {useQuery} from 'react-query';
import {UserDataType, useStore} from './useStore';

//const serverIP = 'http://192.168.3.3:4444';
const serverIP = 'http://192.168.3.150:4444';
//const serverIP = 'http://localhost:4444';
//const serverIP = 'https://api.nomics.com/v1';

// Fetch symbol without cashing, getting real data
const fetchSymbol = async (symbol: string, base = 'USDT') =>
  await fetch(`${serverIP}/currencies/convert/${base}/${symbol}`).then(res =>
    res.json(),
  );

export const useUserLogin = () => {
  const {user} = useStore();
  const {email = '', password = ''} = user;

  return useQuery<
    UserDataType & {accessToken: string; err?: {message: string}},
    any
  >(`userLogin_${email}${password}`, () =>
    fetch(`${serverIP}/user/auth`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    }).then(res => res.json()),
  );
};
export const useUserSingup = () => {
  const {user} = useStore();
  const {email = '', password = ''} = user;

  return useQuery<
    UserDataType & {accessToken: string; err?: {message: string}},
    any
  >(`userSingup_${email}${password}`, () =>
    fetch(`${serverIP}/user/post-data`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    }).then(res => res.json()),
  );
};

export const useAssets = (): {
  isLoading?: boolean;
  data?: {data: AllAssetsListType};
} =>
  useQuery('symbols', () =>
    fetch(`${serverIP}/currencies/ticker`)
      .then(res => res.json())
      .then(res => ({data: res})),
  );

export const useFetchAsset = (symbol: string, base: string) =>
  useQuery(
    `assest${symbol}${base}`,
    async () => await fetchSymbol(symbol, base),
  );

export type AllAssetsType = {
  id: string;
  symbol: string;
  price: string;
  logo_url: string;
};
export type AllAssetsListType = Array<AllAssetsType>;

export const useAllAssets = () => {
  const {
    isLoading,
    data,
  }: {isLoading?: boolean; data?: {data: AllAssetsListType}} = useAssets();
  const {setAssets, setAssetsList} = useStore();

  if (isLoading) {
    return {isLoading};
  }

  const assets = data?.data?.map(({symbol}) => symbol) || [];

  const assetsList = data?.data?.map(
    ({id, symbol, logo_url, price}, index) => ({
      id,
      index,
      price,
      name: symbol,
      icon: logo_url,
    }),
  );

  if (assets) {
    setAssets(assets);
  }

  if (assetsList) {
    setAssetsList(assetsList);
  }

  return {assets, assetsList};
};

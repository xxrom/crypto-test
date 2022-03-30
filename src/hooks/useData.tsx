import {useQuery} from 'react-query';
import {v4} from 'uuid';
import {AssetsListType, UserDataType, useStore} from './useStore';

// Fetch symbol without cashing, getting real data
const fetchSymbol = async (symbol: string, base = 'USD') => {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${symbol}&symbols=${base}`,
  );
  const data = await res.json();

  return data?.rates[base];
};

const fetchIcon = async () => {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  return data?.results[0]?.picture?.thumbnail;
};

//const serverIP = 'http://192.168.3.3:4444';
const serverIP = 'http://localhost:4444';
//const serverIP = 'https://api.nomics.com/v1';

export const useUser = ({email = '', password = ''}: UserDataType) =>
  useQuery<UserDataType & {accessToken: string; err?: {message: string}}, any>(
    `user${email}${password}`,
    () =>
      fetch(serverIP, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      }).then(res => res.json()),
  );

export const useAssets = () =>
  useQuery('symbols', () =>
    fetch(`${serverIP}/currencies/ticket`)
      .then(res => res.json())
      .then(res => ({data: res})),
  );

export const useAssetsList = () => {
  const {assets} = useStore();

  return useQuery(`assestList${assets.length}`, async () => {
    // TODO: fetch real asset icon
    const icon = await fetchIcon();

    const assestList: AssetsListType = await Promise.all(
      assets.map(async (key: string, index: any) => ({
        id: v4(),
        index,
        name: key,
        price: await fetchSymbol(key),
        icon,
      })),
    );

    return {data: assestList};
  });
};

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

/*
export const useAllAssets = () =>
  useAssets().then((res?: {data: AllAssetsListType}) => {
    const {setAssets, setAssetsList} = useStore();

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
  });
 */

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

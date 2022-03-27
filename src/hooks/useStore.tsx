import create from 'zustand';
import {v4} from 'uuid';

export type AssetItemType = {
  id: string;
  index: number;
  name: string;
  price: number | string;
  icon: string;
};
export type AssetsType = Array<string>;
export type AssetsMapType = {[key: string]: AssetItemType};
export type AssetsListType = Array<AssetItemType>;

export type DataAssestsType = {
  symbols: {[key: string]: {code: string}};
};

export interface StoreType {
  assets: AssetsType;
  assetsMap: AssetsMapType;
  assetsList: AssetsListType;

  setAssets: (data: DataAssestsType) => void;
  setAssetsList: (data: AssetsListType) => void;
}

//const userApiUrl = 'https://randomuser.me/api/';

export const useStore = create<StoreType>(set => ({
  assets: [],
  assetsMap: {},
  assetsList: [],
  setAssets: ({symbols}: DataAssestsType) =>
    set(state => ({
      ...state,
      assets: Object.keys(symbols).map((key: string) => symbols[key]?.code),
    })),
  setAssetsList: (assetsList: AssetsListType) =>
    set(state => ({
      ...state,
      assetsList,
    })),
}));

/*
 useQuery

 1) load sybmols
 2) load prices for symbols
*/
export const loadAssets = async () => {
  const response = await fetch('https://api.exchangerate.host/symbols');

  const data = await response.json();

  const assests = Object.keys(data?.symbols).map(
    key => data?.symbols[key]?.code,
  );

  const getSymbol = async (symbol: string, base = 'USD') => {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=${symbol}&symbols=${base}`,
    );
    const data = await res.json();

    return data?.rates[base];
  };

  const assestList = await Promise.all(
    assests.map(async (key, index) => ({
      id: v4(),
      index,
      name: key,
      price: await getSymbol(key),
      icon: '=)',
    })),
  );

  return assestList;
};

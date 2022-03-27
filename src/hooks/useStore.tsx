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

export type TradeAssetsType = {
  fromAsset: string;
  toAsset: string;
};

export interface StoreType {
  // Home page
  assets: AssetsType;
  assetsMap: AssetsMapType;
  assetsList: AssetsListType;

  setAssets: (data: DataAssestsType) => void;
  setAssetsList: (data: AssetsListType) => void;

  // Trade page
  tradeAssets: TradeAssetsType;

  setFromAsset: (newAsset: string) => void;
  setToAsset: (newAsset: string) => void;
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

  tradeAssets: {fromAsset: 'USD', toAsset: 'BTC'},
  setFromAsset: fromAsset =>
    set(state => ({
      ...state,
      tradeAssets: {
        ...state.tradeAssets,
        fromAsset,
      },
    })),
  setToAsset: toAsset =>
    set(state => ({
      ...state,
      tradeAssets: {
        ...state.tradeAssets,
        toAsset,
      },
    })),
}));

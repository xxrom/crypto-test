import create from 'zustand';

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

export type UserDataType = {email: string; password: string};

export interface StoreType {
  // .toFixed(accuracy)
  accuracy: number;

  // Home page
  assets: AssetsType;
  assetsMap: AssetsMapType;
  assetsList: AssetsListType;

  setAssets: (data: AssetsType) => void;
  setAssetsList: (data: AssetsListType) => void;

  // Trade page
  tradeAssets: TradeAssetsType;

  setFromAsset: (newAsset: string) => void;
  setToAsset: (newAsset: string) => void;

  toAssetValue: string | number;
  fromAssetValue: string | number;
  setToAssetValue: (newValue: string | number) => void;
  setFromAssetValue: (newValue: string | number) => void;

  // User
  user: UserDataType;
  setUser: (val: UserDataType) => void;
  setUserEmail: (val: string) => void;
  setUserPassword: (val: string) => void;
  isAuthorized: boolean;
  setIsAuthorized: (val: boolean) => void;
}

export const useStore = create<StoreType>(set => ({
  accuracy: 4,

  // Home page
  assets: [],
  assetsMap: {},
  assetsList: [],
  setAssets: assets =>
    set(state => ({
      ...state,
      assets,
    })),
  setAssetsList: assetsList =>
    set(state => ({
      ...state,
      assetsList,
    })),

  // Trade page
  tradeAssets: {fromAsset: 'USDT', toAsset: 'BTC'},
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

  toAssetValue: '30.5',
  fromAssetValue: '30.5',
  setToAssetValue: toAssetValue =>
    set(state => ({
      ...state,
      toAssetValue,
    })),
  setFromAssetValue: fromAssetValue =>
    set(state => ({
      ...state,
      fromAssetValue,
    })),

  // User
  user: {email: 'admin@gmail.co', password: 'adminadmin'},
  setUser: user => set(state => ({...state, user})),
  setUserEmail: email =>
    set(state => ({...state, user: {...state.user, email}})),
  setUserPassword: password =>
    set(state => ({...state, user: {...state.user, password}})),
  isAuthorized: false,
  setIsAuthorized: isAuthorized => set(state => ({...state, isAuthorized})),
}));

type ConvertAssetsDataToAssetsTypeType = {
  data?: Array<any>;
};

export const convertAssetsDataToAssetsType = (
  box?: ConvertAssetsDataToAssetsTypeType,
) =>
  box?.data ? box?.data?.map(({symbol}, index: any) => symbol || index) : [];

export const correctUserAuth: UserDataType = {
  email: 'admin@gmail.com',
  password: 'adminadmin',
};

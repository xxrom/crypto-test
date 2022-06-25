import create from "zustand";
import type {
  UserSlice,
  ToFromAssetValueSlice,
  AssetsSlice,
  TradeAssetsSlice,
  AssetsListSlice,
} from "../slices";
import {
  createUserSlice,
  createToFromAssetValueSlice,
  createAssetsSlice,
  createTradeAssetSlice,
  createAssetsListSlice,
} from "../slices";

export type DataAssestsType = {
  symbols: { [key: string]: { code: string } };
};

export interface StoreType
  extends AssetsSlice,
    AssetsListSlice,
    TradeAssetsSlice,
    ToFromAssetValueSlice,
    UserSlice {
  accuracy: number;
}

export const useStore = create<StoreType>((...rest) => {
  return {
    accuracy: 4,

    // Home page
    ...createAssetsSlice(...rest),
    //assets: [],
    //assetsMap: {},
    //setAssets: (assets) =>
    //set((state) => ({
    //...state,
    //assets,
    //})),

    ...createAssetsListSlice(...rest),
    //assetsList: [],
    //setAssetsList: (assetsList) =>
    //set((state) => ({
    //...state,
    //assetsList,
    //})),

    // Trade page
    ...createTradeAssetSlice(...rest),
    //tradeAssets: { fromAsset: "USDT", toAsset: "BTC" },
    //setFromAsset: (fromAsset) =>
    //set((state) => ({
    //...state,
    //tradeAssets: {
    //...state.tradeAssets,
    //fromAsset,
    //},
    //})),
    //setToAsset: (toAsset) =>
    //set((state) => ({
    //...state,
    //tradeAssets: {
    //...state.tradeAssets,
    //toAsset,
    //},
    //})),

    // toFromAssetValue
    ...createToFromAssetValueSlice(...rest),
    //toAssetValue: "30.5",
    //fromAssetValue: "30.5",
    //setToAssetValue: (toAssetValue) =>
    //set((state) => ({
    //...state,
    //toAssetValue:
    //typeof Number(toAssetValue) === "number" ? toAssetValue : "0.0",
    //})),
    //setFromAssetValue: (fromAssetValue) =>
    //set((state) => ({
    //...state,
    //fromAssetValue:
    //typeof Number(fromAssetValue) === "number" ? fromAssetValue : "0.0",
    //})),

    // User
    ...createUserSlice(...rest),
    //user: { email: "admin@gmail.co", password: "adminadmin" },
    //setUser: (user) => set((state) => ({ ...state, user })),
    //setUserEmail: (email) =>
    //set((state) => ({ ...state, user: { ...state.user, email } })),
    //setUserPassword: (password) =>
    //set((state) => ({ ...state, user: { ...state.user, password } })),
    //isAuthorized: false,
    //setIsAuthorized: (isAuthorized) =>
    //set((state) => ({ ...state, isAuthorized })),
  };
});

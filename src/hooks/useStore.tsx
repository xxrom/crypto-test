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

export interface StoreType
  extends AssetsSlice,
    AssetsListSlice,
    TradeAssetsSlice,
    ToFromAssetValueSlice,
    UserSlice {
  accuracy: number;
}

export const useStore = create<StoreType>((...rest) => ({
  accuracy: 4,

  ...createAssetsSlice(...rest),
  ...createAssetsListSlice(...rest),
  ...createTradeAssetSlice(...rest),
  ...createToFromAssetValueSlice(...rest),
  ...createUserSlice(...rest),
}));

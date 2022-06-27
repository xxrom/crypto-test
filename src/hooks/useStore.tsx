import create from "zustand";
import type {
  UserSlice,
  ToFromAssetValueSlice,
  AssetsSlice,
  TradeAssetsSlice,
  AssetsListSlice,
  RawDataSlice,
} from "../slices";
import {
  createUserSlice,
  createToFromAssetValueSlice,
  createAssetsSlice,
  createTradeAssetSlice,
  createAssetsListSlice,
  createRawDataSlice,
} from "../slices";

export interface StoreType
  extends AssetsSlice,
    AssetsListSlice,
    TradeAssetsSlice,
    ToFromAssetValueSlice,
    UserSlice,
    RawDataSlice {
  accuracy: number;
}

export const useStore = create<StoreType>((...rest) => ({
  accuracy: 4,

  ...createRawDataSlice(...rest),
  ...createAssetsSlice(...rest),
  ...createAssetsListSlice(...rest),
  ...createTradeAssetSlice(...rest),
  ...createToFromAssetValueSlice(...rest),
  ...createUserSlice(...rest),
}));

import { StateCreator } from "zustand";
import { AssetItemType } from "./assets";

export type AssetsListType = Array<AssetItemType>;

export interface AssetsListSlice {
  assetsList: AssetsListType;
  setAssetsList: (data: AssetsListType) => void;
}

export const createAssetsListSlice: StateCreator<AssetsListSlice, [], []> = (
  set
) => ({
  assetsList: [],
  setAssetsList: (assetsList) =>
    set((state) => ({
      ...state,
      assetsList,
    })),
});

import { StateCreator } from "zustand";

export type AssetItemType = {
  id: string;
  index: number;
  name: string;
  price: number | string;
  icon: string;
};
export type AssetsType = Array<string>;
export type AssetsMapType = { [key: string]: AssetItemType };

export interface AssetsSlice {
  assets: AssetsType;
  assetsMap: AssetsMapType;
  setAssets: (data: AssetsType) => void;
}
export const createAssetsSlice: StateCreator<AssetsSlice, [], []> = (set) => ({
  assets: [],
  assetsMap: {},
  setAssets: (assets) =>
    set((state) => ({
      ...state,
      assets,
    })),
});

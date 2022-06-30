import { StateCreator } from "zustand";
import { AssetItemType } from ".";
import { convertAssets, fetchAssets } from "../hooks";

export type RawDataItemType = {
  [key: string]: string;
} & Pick<AssetItemType, "id" | "index" | "name" | "price" | "icon">;
export type DataArrayType = Array<RawDataItemType>;

export interface RawDataSlice {
  rawData: DataArrayType;
  fetchRawData: () => void;
  setRawData: (data: DataArrayType) => void;
}

const fetchRawData = async () => {
  const data = await fetchAssets();
  console.log("fetchRawData: data", data);

  const { assets, assetsList } = convertAssets({ data });

  return { assets, assetsList };
};

export const createRawDataSlice: StateCreator<RawDataSlice, [], []> = (
  set
) => ({
  rawData: [],
  fetchRawData: async () => {
    const { assets, assetsList } = await fetchRawData();

    return set((state) => ({
      ...state,
      assets,
      assetsList,
    }));
  },
  setRawData: (data) =>
    set((state) => ({
      ...state,
      data,
    })),
});

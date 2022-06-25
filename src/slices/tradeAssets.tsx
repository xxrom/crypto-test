import { StateCreator } from "zustand";

export type TradeAssetsType = {
  fromAsset: string;
  toAsset: string;
};

export interface TradeAssetsSlice {
  tradeAssets: TradeAssetsType;
  setFromAsset: (newAsset: string) => void;
  setToAsset: (newAsset: string) => void;
}

export const createTradeAssetSlice: StateCreator<TradeAssetsSlice, [], []> = (
  set
) => ({
  tradeAssets: { fromAsset: "USDT", toAsset: "BTC" },
  setFromAsset: (fromAsset) =>
    set((state) => ({
      ...state,
      tradeAssets: {
        ...state.tradeAssets,
        fromAsset,
      },
    })),
  setToAsset: (toAsset) =>
    set((state) => ({
      ...state,
      tradeAssets: {
        ...state.tradeAssets,
        toAsset,
      },
    })),
});

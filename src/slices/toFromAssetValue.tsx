import { StateCreator } from "zustand";

export interface ToFromAssetValueSlice {
  toAssetValue: string | number;
  fromAssetValue: string | number;
  setToAssetValue: (newValue: string | number) => void;
  setFromAssetValue: (newValue: string | number) => void;
}

export const createToFromAssetValueSlice: StateCreator<
  ToFromAssetValueSlice,
  [],
  []
> = (set) => ({
  toAssetValue: "30.5",
  fromAssetValue: "30.5",
  setToAssetValue: (toAssetValue) =>
    set((state) => ({
      ...state,
      toAssetValue:
        typeof Number(toAssetValue) === "number" ? toAssetValue : "0.0",
    })),
  setFromAssetValue: (fromAssetValue) =>
    set((state) => ({
      ...state,
      fromAssetValue:
        typeof Number(fromAssetValue) === "number" ? fromAssetValue : "0.0",
    })),
});

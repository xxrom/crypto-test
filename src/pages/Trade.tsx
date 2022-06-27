import { theme } from "../theme";
import cx from "classnames";
import { Box } from "../components";
import { useStore, useFetchAsset } from "../hooks";
import { memo, useCallback, useEffect } from "react";
import { toFixedNumber } from "../tools/convert";

export const Trade = memo(() => {
  console.info("RENDER: Trade");

  const {
    assets,
    tradeAssets,
    setToAsset,
    setFromAsset,
    toAssetValue,
    setToAssetValue,
    fromAssetValue,
    setFromAssetValue,
    accuracy,
  } = useStore();

  const { fromAsset, toAsset } = tradeAssets;
  const { data: assetData, isLoading: assetIsLoading } = useFetchAsset(
    fromAsset,
    toAsset
  );

  useEffect(() => {
    if (assetIsLoading) {
      return;
    }

    setToAssetValue(String(Number(fromAssetValue) * assetData));
  }, [assetData, assetIsLoading, fromAssetValue, setToAssetValue]);

  const onSwapTradeAssets = useCallback(() => {
    setToAsset(fromAsset);
    setFromAsset(toAsset);
    setToAssetValue(toFixedNumber(fromAssetValue, accuracy));
    setFromAssetValue(toFixedNumber(toAssetValue, accuracy));
  }, [
    accuracy,
    fromAsset,
    fromAssetValue,
    setFromAsset,
    setFromAssetValue,
    setToAsset,
    setToAssetValue,
    toAsset,
    toAssetValue,
  ]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col max-w-xl p-3 sm:p-5 py-4 sm:py-6 m-0 bg-sky-900 rounded-3xl">
        <div>
          <button
            onClick={onSwapTradeAssets}
            className={cx(theme.button.secondary, "mb-2 text-xl rounded-3xl")}
          >
            swap
          </button>
        </div>

        <Box
          isInput
          amount={fromAssetValue}
          symbol={fromAsset}
          assets={assets}
          setSymbol={setFromAsset}
        />
        <Box
          amount={toAssetValue}
          symbol={toAsset}
          assets={assets}
          setSymbol={setToAsset}
        />

        <div className="flex mt-2">
          <button
            className={cx(
              theme.button.primary,
              "text-2xl sx:text-3xl rounded-3xl w-full py-3 sm:py-5"
            )}
          >
            Connect wallet
          </button>
        </div>
      </div>
    </div>
  );
});

import {theme} from '../theme';
import cx from 'classnames';
import {Autocompolete, Input} from '../components';
import {useStore, StoreType, useAssets} from '../hooks';
import {memo, useCallback, useEffect} from 'react';

type BoxProps = {
  isInput?: boolean;
  amount: string | number;
  symbol: string;
  assets: StoreType['assets'];
  setSymbol: (val: string) => void;
};

const Box = memo(({isInput, amount, symbol, setSymbol, assets}: BoxProps) => {
  return (
    <div className="flex py-1 m-1 sm:py-5 bg-sky-200 rounded-3xl">
      <div>
        <div className="flex flex-col justify-between flex-1 px-4 py-2 m-3 mb-0 sm:px-12 sm:py-3">
          <div className="flex items-center">
            {isInput ? (
              <Input initValue={amount} />
            ) : (
              <div className="w-full pr-2 text-2xl font-medium sm:text-3xl min-w-xs sm:pr-4 text-sky-900 ">
                {amount}
              </div>
            )}

            <Autocompolete
              initSymbol={symbol}
              items={assets}
              setSymbol={setSymbol}
            />
          </div>

          <div className="flex mt-2 text-sky-800">{symbol}</div>
        </div>
      </div>
    </div>
  );
});

export const Trade = memo(() => {
  console.log('Render: Trade');

  const {assets, setAssets, tradeAssets, setToAsset, setFromAsset} = useStore();
  const {data: assetsData} = useAssets();

  const {fromAsset, toAsset} = tradeAssets;

  useEffect(() => {
    if (assetsData?.data) {
      setAssets(assetsData?.data);
    }
  }, [assetsData?.data, setAssets]);

  const onSwapTradeAssets = useCallback(() => {
    setToAsset(fromAsset);
    setFromAsset(toAsset);
  }, [fromAsset, setFromAsset, setToAsset, toAsset]);

  return (
    <div className="relative">
      <div>Trade</div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-lg p-4 py-6 m-2 divide-y bg-sky-500 rounded-3xl">
          <div>
            <button
              onClick={onSwapTradeAssets}
              className={cx(
                theme.button.secondary,
                'mb-2 rounded-3xl bg-sky-300',
              )}>
              swap
            </button>
          </div>

          <Box
            isInput
            amount="1234.02"
            symbol={fromAsset}
            assets={assets}
            setSymbol={setFromAsset}
          />
          <Box
            amount="44"
            symbol={toAsset}
            assets={assets}
            setSymbol={setToAsset}
          />
        </div>
      </div>
    </div>
  );
});

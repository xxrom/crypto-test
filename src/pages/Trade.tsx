import {theme} from '../theme';
import cx from 'classnames';
import {Autocompolete} from '../components';
import {useStore, StoreType} from '../hooks';
import {useCallback, useEffect, useState} from 'react';

type BoxProps = {
  amount: string | number;
  symbol: string;
  assets: StoreType['assets'];
};

const Box = ({amount, symbol, assets}: BoxProps) => {
  return (
    <div className="py-1 m-1 sm:py-5 flex bg-sky-200 rounded-3xl">
      <div className="flex flex-1 justify-between items-center m-3 px-4 py-2 sm:px-12 sm:py-3">
        <div className="text-2xl sm:text-3xl w-full min-w-xs pr-2 sm:pr-4 font-medium text-sky-900 ">
          {amount}
        </div>
        <Autocompolete initSymbol={symbol} items={assets} />
      </div>
    </div>
  );
};

export const Trade = () => {
  const {assets} = useStore();
  const [tradeAssets, setTradeAssets] = useState({
    fromAsset: 'USD',
    toAsset: 'BTC',
  });

  const {fromAsset, toAsset} = tradeAssets;

  useEffect(() => {}, []);

  const onSwapTradeAssets = useCallback(
    () =>
      setTradeAssets(({fromAsset, toAsset}) => ({
        fromAsset: toAsset,
        toAsset: fromAsset,
      })),
    [],
  );

  return (
    <div className="relative">
      <div>Trade</div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-lg divide-y bg-sky-500 p-4 py-6 m-2 rounded-3xl">
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
          <Box amount="1234.02" symbol={fromAsset} assets={assets} />
          <Box amount="44" symbol={toAsset} assets={assets} />
        </div>
      </div>
    </div>
  );
};

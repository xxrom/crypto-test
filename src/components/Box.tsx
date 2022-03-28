import {memo} from 'react';
import {StoreType, useFetchAsset, useStore} from '../hooks';
import cx from 'classnames';
import {Input} from './Input';
import {Autocompolete} from './Autocomplete';

export type BoxProps = {
  isInput?: boolean;
  amount: string | number;
  symbol: string;
  assets: StoreType['assets'];
  setSymbol: (val: string) => void;
};

export const Box = memo(
  ({isInput, amount, symbol, setSymbol, assets}: BoxProps) => {
    const {data, isLoading} = useFetchAsset(symbol, 'USD');
    const {setFromAssetValue, accuracy} = useStore();

    return (
      <div
        className={cx(
          isInput ? 'bg-white' : 'bg-slate-200',
          'flex mb-2 py-1 sm:py-5 rounded-3xl',
        )}>
        <div>
          <div className="flex flex-col justify-between flex-1 px-1 sm:px-4 py-2 m-3 my-3 sm:px-6 sm:py-3">
            <div className="flex items-center">
              {isInput ? (
                <Input
                  initValue={amount}
                  value={amount}
                  setValue={setFromAssetValue}
                />
              ) : (
                <div className="w-full cursor-default pr-5 text-2xl font-medium sm:text-3xl min-w-xs sm:pr-4 text-sky-900 ">
                  {Number(amount).toFixed(accuracy)}
                </div>
              )}

              <Autocompolete
                initSymbol={symbol}
                items={assets}
                setSymbol={setSymbol}
              />
            </div>

            <div className="flex cursor-default mt-2 text-sky-800">
              {isLoading ? 'Loading...' : `1.0 ${symbol} = ${data} USD `}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

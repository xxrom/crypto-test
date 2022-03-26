import {theme} from '../theme';
import cx from 'classnames';
import {Autocompolete} from '../components';

type BoxProps = {
  amount: string | number;
  symbol: string;
};

const Box = ({amount, symbol}: BoxProps) => {
  return (
    <div className="py-1 m-2 sm:py-5 flex bg-sky-200 rounded-lg">
      <div className="flex flex-1 justify-between m-3 px-4 py-2 sm:px-8 sm:py-4">
        <div className="text-2xl font-medium text-gray-900">{amount}</div>
        <div className="text-2xl text-gray-500">{symbol}</div>
        <Autocompolete />
      </div>
    </div>
  );
};

export const Trade = () => {
  return (
    <div className="relative">
      <div>Trade</div>

      <button className={cx(theme.button.secondary, 'm-2')}>swap</button>

      <div className="flex flex-col divide-y bg-sky-500 p-2 py-5 m-2 rounded-lg">
        <Box amount="1234" symbol="USD" />
        <Box amount="44" symbol="BTC" />
      </div>
    </div>
  );
};

import {Popover as HeadlessPopove} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import {memo} from 'react';
import {MinLink} from '../containers/Layout';
import {theme} from '../theme';

export const PopoverBuySell = memo(() => {
  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button className={theme.button.secondary}>
        <ChevronDownIcon className="w-5 h-5 text-cyan-800" aria-hidden="true" />
      </HeadlessPopove.Button>
      <HeadlessPopove.Overlay className="bg-black opacity-10 fixed inset-0 z-40" />

      <HeadlessPopove.Panel className="absolute z-50">
        <div className="relative mt-1 flex rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
          <div className="flex flex-col p-2">
            <MinLink to="/buy">Buy</MinLink>
            <MinLink to="/sell">Sell</MinLink>
          </div>
        </div>
      </HeadlessPopove.Panel>
    </HeadlessPopove>
  );
});

type PopoverPriceProps = {
  asset?: string;
  price?: string | number;
  children: React.ReactNode | JSX.Element;
};

export const PopoverPrice = memo(
  ({asset = '', price = '', children}: PopoverPriceProps) => {
    return (
      <HeadlessPopove className="relative">
        {children}

        <HeadlessPopove.Panel className="absolute z-10">
          <div className="relative mt-1 flex rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
            <div className="flex flex-col p-2">{`${asset}: ${price}`}</div>
          </div>
        </HeadlessPopove.Panel>
      </HeadlessPopove>
    );
  },
);

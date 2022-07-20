import { Popover as HeadlessPopove } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { memo, useCallback } from "react";
import { MiniLink } from ".";
import { useStore } from "../hooks";
import { theme } from "../theme";
import cx from "classnames";

export type PopoverBuySellProps = {
  symbol: string;
};

export const PopoverBuySell = memo(({ symbol }: PopoverBuySellProps) => {
  const { setToAsset, setFromAsset } = useStore();

  const onClickBuy = useCallback(() => setToAsset(symbol), [
    setToAsset,
    symbol,
  ]);
  const onClickSell = useCallback(() => setFromAsset(symbol), [
    setFromAsset,
    symbol,
  ]);

  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button className={theme.button.secondary}>
        <ChevronDownIcon
          className="w-3 h-3 sm:w-5 sm:h-5 text-cyan-100"
          aria-hidden="true"
        />
      </HeadlessPopove.Button>

      <HeadlessPopove.Overlay className="bg-black opacity-40 fixed inset-0 z-40" />

      <HeadlessPopove.Panel className="absolute z-50 -ml-2 bg-sky-400 rounded-lg">
        <div
          className={cx(
            `relative flex rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`,
            theme.global.bgSecondary
          )}
        >
          <div className="flex flex-col p-1">
            <MiniLink isSmall onClick={onClickBuy} to="/trade">
              Buy
            </MiniLink>

            <MiniLink isSmall onClick={onClickSell} to="/trade">
              Sell
            </MiniLink>
          </div>
        </div>
      </HeadlessPopove.Panel>
    </HeadlessPopove>
  );
});

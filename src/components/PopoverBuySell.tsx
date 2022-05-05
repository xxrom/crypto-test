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

      <HeadlessPopove.Overlay className="bg-black opacity-10 fixed inset-0 z-40" />

      <HeadlessPopove.Panel className="absolute z-50 -ml-5">
        <div
          className={cx(
            `relative mt-1 flex rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`,
            theme.global.bgSecondary
          )}
        >
          <div className="flex flex-col p-2">
            <MiniLink onClick={onClickBuy} to="/trade">
              Buy
            </MiniLink>

            <MiniLink onClick={onClickSell} to="/trade">
              Sell
            </MiniLink>
          </div>
        </div>
      </HeadlessPopove.Panel>
    </HeadlessPopove>
  );
});

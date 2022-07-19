import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { theme } from "../theme";
import cx from "classnames";
import { AssetsSlice } from "../slices";

type OptionType = {
  id: string;
  value: string;
};

type OptionsType = Array<OptionType>;

export type AutocompoleteProps = {
  items: AssetsSlice["assets"];
  initSymbol?: string;
  setSymbol?: (val: string) => void;
  isAlwaysSearching?: boolean;
};

export const Autocompolete = memo<AutocompoleteProps>(
  ({ items, initSymbol, setSymbol, isAlwaysSearching = false }) => {
    const [options, setOptions] = useState<OptionsType>([]);
    const [selected, setSelected] = useState<OptionType>();
    const [search, setSearch] = useState("");

    useEffect(() => {
      if (initSymbol) {
        setSearch(initSymbol);
      }
    }, [initSymbol]);

    useEffect(() => {
      if (!items) {
        return;
      }

      const newOptions = items.map((value) => ({ id: value, value }));

      setOptions(newOptions);

      newOptions.forEach((option) => {
        if (option.value === initSymbol) {
          setSelected(option);
        }
      });
    }, [items, initSymbol]);

    useEffect(() => {
      if (selected?.value && setSymbol && !isAlwaysSearching) {
        setSymbol(selected?.value);
      }
    }, [isAlwaysSearching, selected?.value, setSymbol]);

    const onSearchChange = useCallback(
      (event) => {
        const val = event?.target?.value;

        setSearch(val);

        if (isAlwaysSearching && setSymbol) {
          setSymbol(val);
        }
      },
      [isAlwaysSearching, setSymbol]
    );

    const onChangeSelected = useCallback(
      (selected: OptionType) => {
        setSelected(selected);

        if (isAlwaysSearching && setSymbol && selected.value) {
          setSymbol(selected.value);
        }
      },
      [isAlwaysSearching, setSymbol]
    );

    const filteredList =
      search === ""
        ? options
        : options?.filter((item) =>
            item.value
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(search.toLowerCase().replace(/\s+/g, ""))
          );

    return (
      <div className="relative">
        <Combobox value={selected} onChange={onChangeSelected}>
          <div className="relative mt-1">
            <div
              className={`
              relative w-full 
              text-left bg-sky-400 rounded-lg shadow-md 
              cursor-default focus:outline-none focus-visible:ring-2 
              focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 
              sm:text-sm overflow-hidden`}
            >
              <Combobox.Input
                className={cx(
                  "w-full border-none focus:ring-0 focus:outline-none py-1 pl-2 pr-10 text-sm sm:text-sm font-medium leading-5",
                  theme.font.primary,
                  theme.global.bgSecondary
                )}
                displayValue={(obj: OptionType) =>
                  isAlwaysSearching ? search : obj?.value
                }
                onChange={onSearchChange}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className={`w-4 h-4 ring-1 ring-sky-400 rounded-md text-sky-500`}
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setSearch("")}
            >
              <Combobox.Options
                className={`absolute z-40 w-full
                  p-1 mt-1 overflow-auto 
                  text-base 

                  ${theme.font.secondary}

                  bg-sky-100

                  rounded-md shadow-lg shadow-cyan-400 max-h-60 
                  ring-1 ring-cyan-800
                  focus:outline-none 
                  sm:text-sm`}
              >
                {filteredList.length === 0 && search !== "" ? (
                  <div
                    className={`cursor-default rounded-md select-none
                      ring-1 ring-black relative py-2 px-4 
                      ${theme.font.primary}`}
                  >
                    Nothing found.
                  </div>
                ) : (
                  filteredList?.map((item) => (
                    <Combobox.Option
                      key={item?.id}
                      className={({ active }) =>
                        `cursor-default select-none text-sm relative 
                        py-2 pl-10 pr-4 ring-1 ring-black 
                        rounded-md
                          ${theme.font.secondary}
                          ${active ? theme.global.bgSecondary : theme.global.bg}
                        `
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate text-sm ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item?.value}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active
                                  ? theme.font.primary
                                  : theme.font.secondary
                              }`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  }
);

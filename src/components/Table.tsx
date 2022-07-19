import { memo, useCallback, useEffect, useState } from "react";
import { useStore } from "../hooks";
import { colors, theme } from "../theme";
import { Autocompolete } from "./Autocomplete";
import { PopoverBuySell } from "./PopoverBuySell";
import { AssetsListType } from "../slices";
import { Button } from "./Button";
import { css } from "styled-components";

export type TableHeaderType = Array<{
  name: string;
  filterId?: string;
  info?: string;
}>;

export type TableProps = {
  header?: TableHeaderType;
  list?: AssetsListType;
};

export const headerDefault: TableHeaderType = [
  { name: "#" },
  { name: "Name", filterId: "name", info: "MatchStr" },
  { name: "Icon" },
  { name: "Price", filterId: "price", info: "MoreEqual" },
  { name: "Actions" },
];

export const Table = memo(
  ({ header = headerDefault, list = [] }: TableProps) => {
    const { isAuthorized } = useStore();
    const [isShortList, setIsShortList] = useState(true);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
      {}
    );
    const [filteredList, setFilteredList] = useState<TableProps["list"]>();
    const [filters, setFilters] = useState<{ [key: string]: Array<string> }>(
      {}
    );

    const inputValueName = inputValues?.name || "";
    const inputValuePrice = Number(inputValues?.price) || -1000;

    // Init list
    useEffect(() => {
      const initFilterList = Object.keys(list[0] || {}).reduce(
        (accum, key) => ({ ...accum, [key]: [] }),
        {}
      );

      // Filters search list
      const filterList = list.reduce((accum: any, item: any) => {
        Object.keys(item).forEach((key) => {
          accum[key].push(String(item[key]));
        });

        return accum;
      }, initFilterList);

      setFilters(filterList);

      // Filters value
      const initFilterInputs = Object.keys(list[0] || {}).reduce(
        (accum, key) => ({ ...accum, [key]: "" }),
        {}
      );

      setInputValues(initFilterInputs);
    }, [list]);

    const updateFilterList = useCallback(
      (isShort: boolean, innerList: AssetsListType) => {
        setFilteredList(() => {
          const innerFiltered = innerList?.filter(
            ({ name, price }) =>
              (String(name).match(inputValueName.toUpperCase()) as any)
                ?.index >= 0 && price >= inputValuePrice
          );

          if (isShort) {
            return innerFiltered.slice(0, 10);
          }

          return innerFiltered;
        });
      },
      [inputValueName, inputValuePrice]
    );

    // Apply filters to the list
    useEffect(() => {
      updateFilterList(isShortList, list);
    }, [updateFilterList, list, isShortList]);

    const toggleExpand = useCallback(() => setIsShortList((s) => !s), []);

    const onChangeFilterValue = useCallback(
      (key: string) => (val: string) => {
        return setInputValues((s) =>
          s[key] === val
            ? s
            : {
                ...s,
                [key]: val,
              }
        );
      },
      []
    );

    const getActionCell = useCallback(
      (name: string) =>
        isAuthorized ? <PopoverBuySell symbol={name} /> : <span />,
      [isAuthorized]
    );

    return (
      <div className="relative rounded-xl flex flex-1 flex-col w-min-screen">
        <table className="min-w-full">
          <thead>
            <tr
              className={`border-b-4 
                    border-${colors.bgSecondary} 
                    justify-items-end`}
            >
              {header.map(({ name, filterId, info }) => (
                <th key={name} scope="col" className={theme.table.bold}>
                  <div className="flex flex-col">
                    <div>
                      {`${name}: `}
                      <span className="font-medium mt-1">{info}</span>
                    </div>

                    {filterId && (
                      <Autocompolete
                        isAlwaysSearching
                        initSymbol={inputValues[filterId]}
                        setSymbol={onChangeFilterValue(filterId)}
                        items={filters[filterId]}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredList?.map(({ name, price, icon }, index) => (
              <tr
                key={name}
                className={`border-b 
                ${theme.global.bgSecondary} 
                transition duration-300 ease-in-out cursor-pointer
                hover:${theme.global.bgHover}`}
              >
                <td className={theme.table.cell}>{index}</td>
                <td className={theme.table.cell}>{name}</td>
                <td className={theme.table.cell}>
                  <picture>
                    <img
                      className="w-5 h-5 sm:w-8 sm:h-8 rounded-2xl"
                      src={icon}
                      alt=""
                    />
                  </picture>
                </td>
                <td className={theme.table.cell}>{price}</td>
                <td className={theme.table.cell}>{getActionCell(name)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button
          className={marginTopCss}
          variant="secondary"
          size="compact"
          onClick={toggleExpand}
        >
          {isShortList ? "More" : "Less"}
        </Button>
      </div>
    );
  }
);

const marginTopCss = css`
  margin-top: 1rem;
`;

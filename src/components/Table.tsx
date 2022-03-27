import {memo, useCallback, useEffect, useState} from 'react';
import {AssetsListType} from '../hooks';
import {theme} from '../theme';
import {Autocompolete} from './Autocomplete';
import {PopoverBuySell} from './Popover';
import cx from 'classnames';

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
  {name: '#'},
  {name: 'Name', filterId: 'name', info: 'Match:'},
  {name: 'Icon'},
  {name: 'Price', filterId: 'price', info: 'More equal:'},
  {name: 'Actions'},
];

export const Table = memo(({header = headerDefault, list = []}: TableProps) => {
  console.info('Render: Table');

  const [isShortList, setIsShortList] = useState(true);
  const [filteredList, setFilteredList] = useState<TableProps['list']>();
  const [filters, setFilters] = useState<{[key: string]: Array<string>}>({});
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});

  // Init list
  useEffect(() => {
    setFilteredList(list.slice(0, 10));

    const initFilterList = Object.keys(list[0] || {}).reduce(
      (accum, key) => ({...accum, [key]: []}),
      {},
    );

    // Filters search list
    const filterList = list.reduce((accum: any, item: any) => {
      Object.keys(item).forEach(key => {
        accum[key].push(String(item[key]));
      });

      return accum;
    }, initFilterList);

    setFilters(filterList);

    // Filters value
    const initFilterInputs = Object.keys(list[0] || {}).reduce(
      (accum, key) => ({...accum, [key]: ''}),
      {},
    );

    setInputValues(initFilterInputs);
  }, [list]);

  const inputValueName = inputValues?.name || '';
  const inputValuePrice = Number(inputValues?.price) || -1000;

  const forceFilterList = useCallback(
    (isShort: boolean, innerList: AssetsListType) => {
      setFilteredList(() => {
        const innerFiltered = innerList?.filter(
          ({name, price}) =>
            (String(name).match(inputValueName.toUpperCase()) as any)?.index >=
              0 && price >= inputValuePrice,
        );

        if (isShort) {
          return innerFiltered.slice(0, 10);
        }

        return innerFiltered;
      });
    },
    [inputValueName, inputValuePrice],
  );

  // Apply filters to the list
  useEffect(() => {
    forceFilterList(isShortList, list);
  }, [forceFilterList, list, isShortList]);

  const toggleExpand = useCallback(() => setIsShortList(s => !s), []);

  const onChangeFilterValue = useCallback(
    (key: string) => (val: string) => {
      return setInputValues(s =>
        s[key] === val
          ? s
          : {
              ...s,
              [key]: val,
            },
      );
    },
    [],
  );

  return (
    <div className="relative rounded-xl flex flex-1 flex-col w-min-screen">
      <table className="min-w-full">
        <thead>
          <tr>
            {header.map(({name, filterId, info}, index: number) => (
              <th
                key={`${index}${name}`}
                scope="col"
                className={cx(
                  theme.table.bold,
                  'border-b-4 justify-items-end',
                )}>
                <div className="flex flex-col">
                  {name}

                  {filterId && (
                    <div>
                      <div className="font-medium mt-1">{info}</div>
                      <Autocompolete
                        isAlwaysSearching
                        initSymbol={inputValues[filterId]}
                        setSymbol={onChangeFilterValue(filterId)}
                        items={filters[filterId]}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredList?.map(({name, price, icon}, index) => (
            <tr
              key={`${index}${name}`}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className={theme.table.cell}>{index}</td>
              <td className={theme.table.cell}>{name}</td>
              <td className={theme.table.cell}>{icon}</td>
              <td className={theme.table.cell}>{price}</td>
              <td className={theme.table.cell}>
                <PopoverBuySell symbol={name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={cx(theme.button.secondary, 'mt-4')}
        onClick={toggleExpand}>
        {isShortList ? 'More' : 'Less'}
      </div>
    </div>
  );
});

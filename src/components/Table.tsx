import {memo, useCallback, useEffect, useState} from 'react';
import {AssetsListType} from '../hooks';
import {theme} from '../theme';
import {Autocompolete} from './Autocomplete';
import {PopoverBuySell} from './Popover';

export type TableHeaderType = Array<{name: string; filterId?: string}>;

export type TableProps = {
  header?: TableHeaderType;
  list?: AssetsListType;
};

export const headerDefault: TableHeaderType = [
  {name: '#'},
  {name: 'Name', filterId: 'name'},
  {name: 'Icon', filterId: 'icon'},
  {name: 'Price', filterId: 'price'},
  {name: 'Actions'},
];

const cellClass =
  'px-1 py-1 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-light text-left text-gray-900';
const boldCellClass =
  'px-1 py-1 sm:px-6 sm:py-4 text-sm font-medium text-left text-gray-900 font-light whitespace-nowrap';

export const Table = memo(({header = headerDefault, list = []}: TableProps) => {
  console.info('Render: Table');

  const [isShortList, setIsShortList] = useState(true);
  const [filteredList, setFilteredList] = useState<TableProps['list']>();
  const [filters, setFilters] = useState<{[key: string]: Array<string>}>({});
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({
    name: 'AED',
  });

  // Init list
  useEffect(() => {
    console.log('UE, 3');
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

  // Apply filters to the list
  useEffect(() => {
    setFilteredList(() => {
      const innerFiltered = list?.filter(
        ({name}) =>
          (String(name).match(inputValueName.toUpperCase()) as any)?.index >= 0,
      );

      if (isShortList) {
        return innerFiltered.slice(0, 10);
      }

      return innerFiltered;
    });
  }, [inputValueName, isShortList, list]);

  // On toggle short list
  useEffect(() => {
    if (isShortList) {
      setFilteredList(list.slice(0, 10));
    } else {
      setFilteredList(list);
    }
  }, [isShortList, list]);

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
            {header.map(({name, filterId}, index: number) => (
              <th key={`${index}${name}`} scope="col" className={boldCellClass}>
                {name}

                {filterId && (
                  <Autocompolete
                    isAlwaysSearching
                    initSymbol={inputValues[filterId]}
                    setSymbol={onChangeFilterValue(filterId)}
                    items={filters[filterId]}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredList?.map(({name, price, icon}, index) => (
            <tr
              key={`${index}${name}`}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className={boldCellClass}>{index}</td>
              <td className={cellClass}>{name}</td>
              <td className={cellClass}>{icon}</td>
              <td className={cellClass}>{price}</td>
              <td className={cellClass}>
                <PopoverBuySell />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={theme.button.primary} onClick={toggleExpand}>
        {isShortList ? 'More' : 'Less'}
      </div>
    </div>
  );
});

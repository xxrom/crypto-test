import {memo, useCallback, useEffect, useState} from 'react';
import {AssetsListType} from '../hooks';
import {theme} from '../theme';
import {Popover} from './Popover';

export type TableHeaderType = Array<string>;

export type TableProps = {
  header?: TableHeaderType;
  list?: AssetsListType;
};

export const headerDefault: TableHeaderType = [
  '#',
  'Name',
  'Icon',
  'Price',
  'Actions',
];

const cellClass =
  'px-1 py-1 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-light text-left text-gray-900';
const boldCellClass =
  'px-1 py-1 sm:px-6 sm:py-4 text-sm font-medium text-left text-gray-900 font-light whitespace-nowrap';

export const Table = memo(({header = headerDefault, list = []}: TableProps) => {
  console.info('Render: Table');

  const [shortList, setShortList] = useState<TableProps['list']>();
  const [isShortList, setIsShortList] = useState(true);

  useEffect(() => {
    setShortList(list.slice(0, 10));
  }, [list]);

  const toggleExpand = useCallback(() => setIsShortList(s => !s), []);

  return (
    <div className="relative rounded-xl flex flex-1 flex-col w-min-screen">
      <table className="min-w-full">
        <thead>
          <tr>
            {header.map((name, index: number) => (
              <th key={`${index}${name}`} scope="col" className={boldCellClass}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(isShortList ? shortList : list)?.map(
            ({name, price, icon}, index) => (
              <tr
                key={`${index}${name}`}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className={boldCellClass}>{index}</td>
                <td className={cellClass}>{name}</td>
                <td className={cellClass}>{icon}</td>
                <td className={cellClass}>{price}</td>
                <td className={cellClass}>
                  <Popover />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>

      <div className={theme.button.primary} onClick={toggleExpand}>
        {isShortList ? 'More' : 'Less'}
      </div>
    </div>
  );
});

import {useEffect, useState} from 'react';
import {AssetListType} from '../pages/Home';
import {Popover} from './Popover';

export type TableHeaderType = Array<string>;

export type TableProps = {
  header?: TableHeaderType;
  list?: AssetListType;
};

export const headerDefault: TableHeaderType = [
  '#',
  'Name',
  'Icon',
  'Price',
  'Actions',
];

export const listDefault: AssetListType = [
  {
    id: '1',
    name: 'Name 1',
    icon: 'icon',
    price: '1234',
  },
  {
    id: '4',
    name: 'Name 2',
    icon: 'icon 2 h',
    price: '144',
  },
  {
    id: '2',
    name: 'Name 3',
    icon: 'icon 3',
    price: '4',
  },
  {
    id: '3',
    name: 'Name 3',
    icon: 'icon 3',
    price: '4',
  },
];

export const Table = ({
  header = headerDefault,
  list = listDefault,
}: TableProps) => {
  const [shortList, setShortList] = useState<TableProps['list']>();

  useEffect(() => {
    setShortList(list.slice(0, 10));
  }, [list]);

  return (
    <div className="relative rounded-xl flex flex-1 w-min-screen">
      <table className="min-w-full">
        <thead>
          <tr>
            {header.map((name, index: number) => (
              <th
                key={`${index}${name}`}
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shortList?.map(({name, price, icon}, index) => (
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {icon}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {price}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Popover />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

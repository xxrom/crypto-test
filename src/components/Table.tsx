export type TableHeaderType = Array<string>;
export type TableListItemType = {
  name: string;
  price: string;
  icon: string;
};
export type TableListType = Array<TableListItemType>;

export type TableProps = {
  header?: TableHeaderType;
  list?: TableListType;
};

export const headerDefault: TableHeaderType = [
  '#',
  'Name',
  'Icon',
  'Price',
  'Action',
];

export const listDefault: TableListType = [
  {
    name: 'Name 1',
    icon: 'icon',
    price: '1234',
  },
  {
    name: 'Name 2',
    icon: 'icon 2 h',
    price: '144',
  },
  {
    name: 'Name 3',
    icon: 'icon 3',
    price: '4',
  },
];

export const Table = ({
  header = headerDefault,
  list = listDefault,
}: TableProps) => {
  return (
    <div className="relative rounded-xl overflow-auto flex flex-1 w-min-screen">
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
          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              1
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Mark
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Otto
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              @mdo
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              @mdo
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

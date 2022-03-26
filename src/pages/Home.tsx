import {useEffect, useState} from 'react';
import {Table} from '../components';

export type AssetItemType = {
  id: string;
  name: string;
  price: number | string;
  icon: string;
};
export type AssetListType = Array<AssetItemType>;

export const Home = () => {
  const [list, setList] = useState<AssetListType>();

  useEffect(() => {
    const getAssets = async () => {
      const response = await fetch('https://api.exchangerate.host/symbols');

      const data = await response.json();

      const assests = Object.keys(data?.symbols).map(
        key => data?.symbols[key]?.code,
      );

      const getSymbol = async (symbol: string, base = 'USD') => {
        const res = await fetch(
          `https://api.exchangerate.host/latest?base=${symbol}&symbols=${base}`,
        );
        const data = await res.json();

        return data?.rates[base];
      };

      const assestList = await Promise.all(
        assests.map(async (key, index) => ({
          id: String(index),
          name: key,
          price: await getSymbol(key),
          icon: '=)',
        })),
      );

      setList(assestList);
    };

    getAssets();
  }, []);

  return (
    <div>
      <div>Home</div>

      <Table list={list} />
    </div>
  );
};

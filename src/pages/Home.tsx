import {useEffect, useState} from 'react';
import {Table} from '../components';

export type AssetItemType = {
  id: string;
  name: string;
  price: string;
  icon: string;
};
export type AssetListType = Array<AssetItemType>;

export const Home = () => {
  const [list, setList] = useState<AssetListType>();

  useEffect(() => {
    const getAssets = async () => {
      const response = await fetch('https://api.exchangerate.host/symbols');

      const data = (await response.json().then((res: any) => {
        console.log('res', res);
        return res;
      })) as {symbols: {}};

      const assestList = Object.keys(data?.symbols);
      const assests = assestList.map((key, index) => ({
        id: String(index),
        name: key,
        price: String(index + 100),
        icon: '',
      }));

      setList(assests);
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

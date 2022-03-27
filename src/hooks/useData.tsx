import {useQuery} from 'react-query';
import {v4} from 'uuid';
import {AssetsListType, AssetsType} from './useStore';

export const useAssets = () =>
  useQuery('symbols', () =>
    fetch('https://api.exchangerate.host/symbols')
      .then(res => res.json())
      .then(res => ({data: res})),
  );

export const useAssetsList = (assets: AssetsType) =>
  useQuery('assestList', async () => {
    const getSymbol = async (symbol: string, base = 'USD') => {
      const res = await fetch(
        `https://api.exchangerate.host/latest?base=${symbol}&symbols=${base}`,
      );
      const data = await res.json();

      return data?.rates[base];
    };

    const assestList: AssetsListType = await Promise.all(
      assets.map(async (key, index) => ({
        id: v4(),
        index,
        name: key,
        price: await getSymbol(key),
        icon: '=)',
      })),
    );

    return {data: assestList};
  });
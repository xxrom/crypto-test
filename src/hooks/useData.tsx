import {useQuery} from 'react-query';
import {v4} from 'uuid';
import {AssetsListType, AssetsType, UserDataType} from './useStore';

const fetchSymbol = async (symbol: string, base = 'USD') => {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${symbol}&symbols=${base}`,
  );
  const data = await res.json();

  return data?.rates[base];
};

export const useUser = ({username, password}: UserDataType) =>
  useQuery(`user${username}${password}`, () =>
    fetch('http://localhost:4444', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    }).then(res => res.json()),
  );

export const useAssets = () =>
  useQuery('symbols', () =>
    fetch('https://api.exchangerate.host/symbols')
      .then(res => res.json())
      .then(res => ({data: res})),
  );

export const useAssetsList = (assets: AssetsType) =>
  useQuery('assestList', async () => {
    const assestList: AssetsListType = await Promise.all(
      assets.map(async (key, index) => ({
        id: v4(),
        index,
        name: key,
        price: await fetchSymbol(key),
        icon: '=)',
      })),
    );

    return {data: assestList};
  });

export const useFetchAsset = (symbol: string, base: string) =>
  useQuery(
    `assest${symbol}${base}`,
    async () => await fetchSymbol(symbol, base),
  );

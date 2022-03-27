import {memo, useEffect, useState} from 'react';
import {useQuery, UseQueryResult} from 'react-query';
import {Table} from '../components';
import {AssetListType, useStore, DataAssestsType} from '../hooks';

export const Home = memo(() => {
  const [list, setList] = useState<AssetListType>([]);
  const {
    isLoading,
    error,
    data,
  }: UseQueryResult<DataAssestsType, any> = useQuery('symbols', () =>
    fetch('https://api.exchangerate.host/symbols').then(res => res.json()),
  );
  const {setAssets} = useStore();

  useEffect(() => {
    console.log('data', data);
    if (!data) {
      return;
    }

    setAssets(data);
  }, [data, setAssets]);

  if (isLoading) return <div>'Loading...'</div>;

  if (error) {
    return <div>{'An error has occurred: ' + error?.message}</div>;
  }

  return (
    <div>
      <div>Home</div>

      <Table list={list} />
    </div>
  );
});

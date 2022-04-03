import {memo, useEffect} from 'react';
import {Table} from '../components';
import {useStore, useAssets} from '../hooks';

export const Home = memo(() => {
  const {isLoading, data} = useAssets();

  const {assetsList, setAssets, setAssetsList} = useStore();
  console.log('Render: Home', isLoading, data, assetsList);

  useEffect(() => {
    const assets = data?.data?.map(({symbol}) => symbol) || [];

    const assetsList = data?.data?.map(
      ({id, symbol, logo_url, price}, index) => ({
        id,
        index,
        price,
        name: symbol,
        icon: logo_url,
      }),
    );

    if (assets) {
      setAssets(assets);
    }

    if (assetsList) {
      setAssetsList(assetsList);
    }
  }, [data?.data, setAssets, setAssetsList]);

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center h-36 text-3xl text-neutral-500">
        Loading...
      </div>
    );
  }

  return <Table list={assetsList} />;
});

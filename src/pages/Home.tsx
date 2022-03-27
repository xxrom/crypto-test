import {memo, useEffect} from 'react';
import {Table} from '../components';
import {useStore, useAssetsList, useAssets} from '../hooks';

export const Home = memo(() => {
  console.info('Render: Home');

  const {assets, assetsList, setAssets, setAssetsList} = useStore();

  const {isLoading: isLoadingFirst, data: assetsData} = useAssets();
  const {isLoading: isLoadingSecond, data: assestListData} = useAssetsList(
    assets,
  );

  // First: load all assets
  useEffect(() => assetsData?.data && setAssets(assetsData.data), [
    assetsData?.data,
    setAssets,
  ]);
  // Second: load prices for all assets
  useEffect(() => assestListData?.data && setAssetsList(assestListData.data), [
    assestListData?.data,
    setAssetsList,
  ]);

  if (isLoadingFirst || isLoadingSecond)
    return <div className="flex flex-1 text-3xl">Loading...</div>;

  return (
    <div>
      <div>Home</div>

      <Table list={assetsList} />
    </div>
  );
});

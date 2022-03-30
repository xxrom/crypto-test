import {memo, useEffect} from 'react';
import {Table} from '../components';
import {useStore, useAssetsList, useAssets} from '../hooks';
import {convertAssetsDataToAssetsType} from '../hooks/useStore';

export const Home = memo(() => {
  const {assetsList, setAssets, setAssetsList} = useStore();

  const {isLoading: isLoadingFirst, data: assetsData} = useAssets();
  const {isLoading: isLoadingSecond, data: assestListData} = useAssetsList();

  console.log('assetsData', assetsData);

  // First: load all assets
  useEffect(() => {
    const assets = convertAssetsDataToAssetsType(assetsData);

    console.log(assets);

    if (assets) {
      setAssets(assets);
    }
  }, [assetsData, setAssets]);
  // Second: load prices for all assets
  useEffect(() => assestListData?.data && setAssetsList(assestListData.data), [
    assestListData?.data,
    setAssetsList,
  ]);

  if (isLoadingFirst || isLoadingSecond) {
    return (
      <div className="flex flex-1 justify-center items-center h-36 text-3xl text-neutral-500">
        Loading...
      </div>
    );
  }

  return <Table list={assetsList} />;
});

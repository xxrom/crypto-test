import {memo, useEffect} from 'react';
import {Table} from '../components';
import {
  useStore,
  useAssetsList,
  useAssets,
  useAllAssets,
  AllAssetsListType,
} from '../hooks';
import {convertAssetsDataToAssetsType} from '../hooks/useStore';

export const Home = memo(() => {
  const {
    isLoading,
    data,
  }: {isLoading?: boolean; data?: {data: AllAssetsListType}} = useAssets();
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

  //const {isLoading: isLoadingFirst, data: assetsData} = useAssets();
  //const {isLoading: isLoadingSecond, data: assestListData} = useAssetsList();

  //console.log('assetsData', assetsData);

  // First: load all assets
  //useEffect(() => {
  //const assets = convertAssetsDataToAssetsType(assetsData);

  //console.log(assets);

  //if (assets) {
  //setAssets(assets);
  //}
  //}, [assetsData, setAssets]);
  //// Second: load prices for all assets
  //useEffect(() => assestListData?.data && setAssetsList(assestListData.data), [
  //assestListData?.data,
  //setAssetsList,
  //]);

  //if (isLoadingFirst || isLoadingSecond) {
  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center h-36 text-3xl text-neutral-500">
        Loading...
      </div>
    );
  }

  return <Table list={assetsList} />;
});

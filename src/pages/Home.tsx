import { memo } from "react";
import { Table } from "../components";
import { useStore } from "../hooks";
//import styled, { keyframes } from "styled-components";

export const Home = memo(() => {
  console.info("Render: Home /");

  const { assetsList } = useStore();
  /*
  const { isLoadingAssets } = useStore();

  if (!isLoading) {
    return <Loading>Loading...</Loading>;
  }
  */

  return <Table list={assetsList} />;
});

/*
const breatheColorAnimation = keyframes`
  0% { opacity: 1.0; }
  20% { opacity: 0.7; }
  60% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const Loading = styled.div`
  animation-name: ${breatheColorAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;
*/

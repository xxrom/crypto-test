import styled from "styled-components";

export const Container = styled.div<{ minHeight?: string; className?: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  min-height: ${({ minHeight = "0" }) => minHeight};
  ${({ className }) => className};
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Col = styled.div`
  display: flex;
`;

import { FC } from "react";
import styled from "styled-components";

export interface TextProps {}

export const Text: FC<TextProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 1rem 0.5rem;
  white-space: pre-line;
`;

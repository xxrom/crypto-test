import styled from "styled-components";

export const CrossIcon = styled.span`
  position: absolute;
  right: 1rem;
  height: 1.4rem;
  width: 1.4rem;
  border: 1px solid #888;
  border-radius: 50%;
  background-color: #888;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
  }

  &:active {
    background-color: #444;
    border: 1px solid #444;
  }

  &:active&::after,
  &:active&::before {
    background-color: #888;
  }

  &::after,
  &::before {
    position: absolute;
    right: calc(0.7rem - 2px);
    top: calc(0.7rem - 0.4rem - 1px);
    height: 0.8rem;
    width: 2px;
    content: "";
    background-color: black;
  }
  &::after {
    transform: rotate(45deg);
  }
  &::before {
    transform: rotate(-45deg);
  }
`;

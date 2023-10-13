import styled from "@emotion/styled";
import { type ChildrenProps } from "../types";

const Content = ({ children }: ChildrenProps) => {
  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default Content;

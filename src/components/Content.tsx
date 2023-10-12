import styled from "@emotion/styled";
import { type ChildrenProps } from "../types";

const Content = ({ children }: ChildrenProps) => {
  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Content;

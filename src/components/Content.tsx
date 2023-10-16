import { ReactComponent as PhoneLayoutSvg } from "../assets/layout/phoneLayout.svg";
import styled from "@emotion/styled/macro";
import { ReactNode } from "react";

interface ContentType {
  children: ReactNode;
}

const Content: React.FC<ContentType> = ({ children }) => {
  return (
    <Wrap>
      <div className="background" />
      <PhoneLayoutSvg className="phoneLayoutSvg" />
      <div className="children">{children}</div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;

  .background {
    background: var(--main-color);
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }

  .phoneLayoutSvg,
  .children {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .children {
    background: white;
    width: 368px;
    height: 795px;
    border-radius: 40px;
    z-index: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 414px) {
    & .phoneLayoutSvg {
      display: none;
    }

    .children {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
  }
`;

export default Content;

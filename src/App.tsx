import "./App.css";

import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

function App() {
  const navigation = useNavigate();

  return (
    <div>
      숫자 야구 게임
      <div
        className="buttonWrap"
        css={css`
          display: flex;

          & button {
            display: inline-block;
          }
        `}
      >
        <button
          onClick={() => {
            navigation("/game");
          }}
        >
          게임 시작
        </button>
        <button
          onClick={() => {
            navigation("/rules");
          }}
        >
          룰 보기
        </button>
      </div>
    </div>
  );
}

// const testCss = (props: Test) => css``;

export default App;

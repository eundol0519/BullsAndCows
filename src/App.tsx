import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import baseBallImg from "./assets/layout/baseBall.png";
import styled from "@emotion/styled";
import Button from "./elements/Button";

function App() {
  const navigation = useNavigate();

  return (
    <Wrap>
      <img src={baseBallImg} width={150} height={150} alt="baseBallIcon" />
      <h2>Bulls And Cows</h2>
      <Button
        onClick={() => {
          navigation("/option");
        }}
      >
        게임 시작
      </Button>
      <Button
        onClick={() => {
          navigation("/rules");
        }}
      >
        게임 룰
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  text-align: center;
  width: 100%;
`;

export default App;

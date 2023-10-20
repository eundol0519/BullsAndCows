import Content from "./components/Content";
import { useRecoilState } from "recoil";
import { canvasShowYNState } from "./recoil/game";
import Canvas from "./components/Canvas";
import Router from "./pages/Router";
import React from "react";

function App() {
  const [canvasShowYN, setCanvasShowYN] = useRecoilState(canvasShowYNState);

  return (
    <React.Fragment>
      <Content>
        <Router />
      </Content>
      {canvasShowYN ? <Canvas close={() => setCanvasShowYN(false)} /> : null}
    </React.Fragment>
  );
}

export default App;

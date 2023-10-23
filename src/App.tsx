import Content from "./components/Content";
import { useRecoilState } from "recoil";
import { canvasShowYNState } from "./recoil/game";
import Canvas from "./components/Canvas";
import Router from "./pages/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [canvasShowYN, setCanvasShowYN] = useRecoilState(canvasShowYNState);

  return (
    <BrowserRouter>
      <Content>
        <Router />
      </Content>
      {canvasShowYN ? <Canvas close={() => setCanvasShowYN(false)} /> : null}
    </BrowserRouter>
  );
}

export default App;

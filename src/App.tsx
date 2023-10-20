import Content from "./components/Content";
import { useRecoilState } from "recoil";
import { canvasShowYNState } from "./recoil/game";
import Canvas from "./components/Canvas";
import Router from "./pages/Router";

function App() {
  const [canvasShowYN, setCanvasShowYN] = useRecoilState(canvasShowYNState);

  return (
    <div>
      <Content>
        <Router />
      </Content>
      {canvasShowYN ? <Canvas close={() => setCanvasShowYN(false)} /> : null}
    </div>
  );
}

export default App;

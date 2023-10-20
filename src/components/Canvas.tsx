import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import Button from "../elements/Button";
import { useRecoilState } from "recoil";
import { canvasContentState } from "../recoil/game";
import { css } from "@emotion/react";

import { RxEraser } from "react-icons/rx";
import { GrRevert } from "react-icons/gr";

interface Props {
  close: () => void;
}

const rainbowAndNeutralPalette = [
  { name: "red", code: "#FF0000" },
  { name: "orange", code: "#FFA500" },
  { name: "yellow", code: "#FFFF00" },
  { name: "green", code: "#008000" },
  { name: "blue", code: "#0000FF" },
  { name: "indigo", code: "#4B0082" },
  { name: "purple", code: "#800080" },
  { name: "black", code: "#000000" },
  { name: "gray", code: "#808080" },
  { name: "white", code: "#FFFFFF" },
];

const Canvas = ({ close }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [activeState, setActiveState] = useState(
    rainbowAndNeutralPalette[8].code
  );

  const [canvasContent, setCanvasContent] = useRecoilState(canvasContentState);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = window.innerWidth * 0.3;
      canvas.height = window.innerHeight * 0.3;

      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = "black";
        context.lineWidth = 2.5;
        contextRef.current = context;
        setCtx(context);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.persist();
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }

    const imageData = ctx.getImageData(
      0,
      0,
      canvasRef.current?.width || 0,
      canvasRef.current?.height || 0
    );

    setDrawingHistory((prev) => {
      return [...prev, imageData];
    });
  };

  const redrawCanvas = () => {
    if (ctx && canvasContent) {
      ctx.putImageData(canvasContent, 0, 0);
    }
  };

  const clearCanvas = () => {
    if (ctx) {
      ctx.clearRect(
        0,
        0,
        canvasRef.current?.width || 0,
        canvasRef.current?.height || 0
      );
    }
  };

  const changeColor = (colorCode: string) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.strokeStyle = colorCode;
    context.lineWidth = 2.5;

    setActiveState(colorCode);
  };

  const remove = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (canvas && context) {
      context.strokeStyle =
        rainbowAndNeutralPalette[rainbowAndNeutralPalette.length - 1].code;
      context.lineWidth = 20;
    }

    setActiveState("remove");
  };

  const revert = () => {
    if (drawingHistory.length > 10) {
      const newDrawingHistory = drawingHistory.slice(0, -10);
      setDrawingHistory(newDrawingHistory);

      ctx.putImageData(newDrawingHistory[newDrawingHistory.length - 1], 0, 0);
    }

    setActiveState("undo");
  };

  return (
    <Wrap className="canvasWrap">
      <div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
        />
        <div className="paletteWrap">
          <div className="palette">
            {rainbowAndNeutralPalette.map((item) => (
              <div
                key={item.name}
                className={`item ${item.code === activeState && "active"}`}
                css={css`
                  background: ${item.code};
                `}
                onClick={() => changeColor(item.code)}
              />
            ))}
          </div>
          <div className="other">
            <RxEraser onClick={remove} />
            <GrRevert onClick={revert} />
          </div>
        </div>
      </div>
      <div className="buttonWrap">
        <Button onClick={clearCanvas}>지우기</Button>
        <Button onClick={redrawCanvas}>불러오기</Button>
        <Button
          onClick={() => {
            setCanvasContent(
              ctx.getImageData(
                0,
                0,
                canvasRef.current?.width || 0,
                canvasRef.current?.height || 0
              )
            );

            close();
          }}
        >
          닫기
        </Button>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  border-radius: 20px;
  background: #e1e1e1;

  canvas {
    border: 2px solid #e1e1e1;
    border-radius: 20px;
    background: white;
    margin: 10px 10px 0;
  }

  .buttonWrap {
    display: flex;
    gap: 10px;
    margin: 0 10px 10px;
  }

  .paletteWrap {
    width: calc(100% - 20px);
    display: grid;
    grid-template-columns: 80% 20%;
    margin: 0 10px;

    .palette {
      margin: 5px;
      height: 45px;
      background: #e1e1e1;
      border-radius: 20px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      place-items: center;
      gap: 5px;

      .item {
        width: 20px;
        height: 20px;
        border-radius: 500px;
      }

      .item.active {
        box-sizing: border-box;
        border: 3px solid var(--main-color);
      }
    }

    .other {
      margin: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  @media screen and (max-width: 414px) {
    right: 50%;
    transform: translate(50%, -50%);

    canvas {
      width: 80vw;
      height: 50vh;
    }
  }
`;

export default Canvas;

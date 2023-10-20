import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import Button from "../elements/Button";

interface Props {
  close: () => void;
}

const Canvas = ({ close }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // 리퍼런스에 타입 명시
  const contextRef = useRef<CanvasRenderingContext2D | null>(null); // 리퍼런스에 타입 명시

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null); // 상태에 타입 명시
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = window.innerWidth * 0.65;
      canvas.height = window.innerHeight - 500;

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

  return (
    <Wrap className="canvasWrap">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
      ></canvas>
      <div className="buttonWrap">
        <Button onClick={clearCanvas}>지우기</Button>
        <Button onClick={close}>닫기</Button>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background: #e1e1e1;

  canvas {
    border: 2px solid #e1e1e1;
    border-radius: 20px;
    background: white;
    margin: 10px;
  }

  .buttonWrap {
    display: flex;
    gap: 10px;
  }

  @media screen and (max-width: 414px) {
    canvas {
      width: 80vw;
      height: 50vh;
    }
  }
`;

export default Canvas;

import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import Button from "../elements/Button";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // 리퍼런스에 타입 명시
  const contextRef = useRef<CanvasRenderingContext2D | null>(null); // 리퍼런스에 타입 명시

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null); // 상태에 타입 명시
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.5;
      canvas.height = window.innerHeight - 600;

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
      <Button onClick={clearCanvas}>지우기</Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  canvas {
    position: absolute;
    z-index: 10;
    background: gray;
    top: 100px;
    right: 100px;
  }
`;

export default Canvas;

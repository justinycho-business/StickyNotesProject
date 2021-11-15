// https://github.com/satansdeer/drawing-react-canvas/blob/master/src/Canvas.js
import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas1(props) {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
      <>
      <>{props.notesJSX}</>
    <>{props.imagesJSX}</>
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}


    />
    </>
  );
}

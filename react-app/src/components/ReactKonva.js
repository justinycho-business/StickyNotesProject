//https://konvajs.org/docs/react/Free_Drawing.html
import React, { useEffect, useState, Component, useRef } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Line, Text } from 'react-konva';

function ReactKonva() {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <Stage
        width={window.innerWidth/1.05}
        height={window.innerHeight/1.35}
        style={{position: 'fixed', zIndex: '250', width: "95vw", height:"75vh"}}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>

          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      <select
        value={tool}
        style={{zIndex: "255", backgroundColor: "pink", position: "absolute"}}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default ReactKonva

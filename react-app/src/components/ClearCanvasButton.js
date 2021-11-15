// https://github.com/satansdeer/drawing-react-canvas/blob/master/src/ClearCanvasButton.js
import React from 'react'
import { useCanvas } from './CanvasContext'

export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas()

  return <button onClick={clearCanvas}>Clear Drawing</button>
}

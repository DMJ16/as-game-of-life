import React, { useEffect, useRef } from "react";
import * as fs from "fs";
import { useAsBind } from "use-as-bind/src";

const wasm = fs.readFileSync("./build/optimized.wasm");

export default function Game(): JSX.Element {
  const { loaded, instance, error } = useAsBind(wasm);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (instance != null) renderGame();

    function renderGame() {
      const CELL_SIZE = 7;
      const GRID_LINE_COLOR = "#a72145";
      const DEAD_COLOR = "#0b7261";
      const ALIVE_COLOR = "#2e2459";
      if (instance == null) throw new Error("WebAssembly instance is null");
      const { Universe } = instance.unboundExports;
      const universe = new Universe();
      const width = universe.width;
      const height = universe.height;
      const canvas = canvasRef.current;
      if (canvas == null) throw new Error("canvas element is null");
      canvas.height = (CELL_SIZE + 1) * height + 1;
      canvas.width = (CELL_SIZE + 1) * width + 1;
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("context is null");

      const drawGrid = () => {
        context.beginPath();
        context.strokeStyle = GRID_LINE_COLOR;
        for (let i = 0; i <= width; i++) {
          context.moveTo(i * (CELL_SIZE + 1) + 1, 0);
          context.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
        }
        for (let j = 0; j <= height; j++) {
          context.moveTo(0, j * (CELL_SIZE + 1) + 1);
          context.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
        }
        context.stroke();
      };

      const getIdx = (row: number, column: number) => row * width + column;

      const drawCells = () => {
        const cellsPtr = universe.cells;
        const cells = new Uint32Array(
          instance.unboundExports.memory.buffer,
          cellsPtr,
          width * height
        );
        context.beginPath();
        for (let row = 0; row < height; row++) {
          for (let col = 0; col < width; col++) {
            const idx = getIdx(row, col);
            context.fillStyle = cells[idx] === 0 ? DEAD_COLOR : ALIVE_COLOR;
            context.fillRect(
              col * (CELL_SIZE + 1) + 1,
              row * (CELL_SIZE + 1) + 1,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }
        context.stroke();
      };

      const renderLoop = () => {
        universe.tick();
        drawGrid();
        drawCells();
        requestAnimationFrame(renderLoop);
      };

      drawGrid();
      drawCells();
      requestAnimationFrame(renderLoop);
    }
  }, [loaded]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      {error && error.message}
    </div>
  );
}

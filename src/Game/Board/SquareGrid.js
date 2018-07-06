import * as React from "react";

const Line = ({ x, y, size }) => (
  <line
    x1={x !== undefined ? 50 * x : 0}
    x2={x !== undefined ? 50 * x : 50 * size}
    y1={y !== undefined ? 50 * y : 0}
    y2={y !== undefined ? 50 * y : 50 * size}
    style={{ stroke: "#333", strokeWidth: "1px" }}
  />
);

const Grid = ({ size }) => (
  <g>
    {new Array(size)
      .fill()
      .map((_, x) => <Line key={"xline" + x} x={x + 1} size={size} />)}
    {new Array(size)
      .fill()
      .map((_, y) => <Line key={"yline" + y} y={y + 1} size={size} />)}
  </g>
);

export default Grid;

import * as React from "react";

const Line = ({ x, y }) => (
  <line
    x1={x !== undefined ? 50 * x : 0}
    x2={x !== undefined ? 50 * x : 600}
    y1={y !== undefined ? 50 * y : 0}
    y2={y !== undefined ? 50 * y : 600}
    style={{ stroke: "#333", strokeWidth: "1px" }}
  />
);

const Grid = ({ fill, x, y, selected }) => (
  <g>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(x => (
      <Line key={"xline" + x} x={x} />
    ))}
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(y => (
      <Line key={"yline" + y} y={y} />
    ))}
  </g>
);

export default Grid;

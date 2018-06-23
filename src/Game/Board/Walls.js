import * as React from "react";

const Walls = ({ walls }) => (
  <g>
    {walls.map(({ x, y }) => (
      <rect
        key={"wall(" + x + "," + y + ")"}
        width="42"
        height="42"
        x={50 * x + 4}
        y={50 * y + 4}
        style={{ fill: "black" }}
      />
    ))}
  </g>
);

export default Walls;

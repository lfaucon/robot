import * as React from "react";

const Robot = ({ fill, x, y, selected, selectRobot }) => (
  <g>
    <rect
      width="42"
      height="42"
      x={50 * x + 4}
      y={50 * y + 4}
      style={{ fill }}
      onClick={selectRobot}
    />
    {selected && (
      <rect
        width="34"
        height="34"
        x={50 * x + 8}
        y={50 * y + 8}
        style={{ fill, stroke: "white", strokeWidth: "2px" }}
      />
    )}
  </g>
);

export default Robot;

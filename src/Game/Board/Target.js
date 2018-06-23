import * as React from "react";

const Target = ({ stroke, x, y }) => (
  <g>
    <line
      x1={50 * x + 8}
      y1={50 * y + 8}
      x2={50 * (x + 1) - 8}
      y2={50 * (y + 1) - 8}
      style={{ stroke, strokeWidth: "6px" }}
    />
    <line
      x1={50 * x + 8}
      y2={50 * y + 8}
      x2={50 * (x + 1) - 8}
      y1={50 * (y + 1) - 8}
      style={{ stroke, strokeWidth: "6px" }}
    />
  </g>
);

export default Target;

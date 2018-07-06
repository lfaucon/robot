import * as React from "react";

const Blocks = ({ blocks }) =>
  blocks.map(({ x, y }) => (
    <rect
      key={"block(" + x + "," + y + ")"}
      width="42"
      height="42"
      x={50 * x + 4}
      y={50 * y + 4}
      style={{ fill: "black" }}
    />
  ));

export default Blocks;

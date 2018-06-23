import * as React from "react";

import Robot from "./Robot";
import Grid from "./Grid";
import Blocks from "./Blocks";
import Target from "./Target";

const style = {
  fill: "#eee",
  stroke: "black",
  strokeWidth: "4px"
};

const Board = ({ robots, blocks, target, selected, classes }) => (
  <div className={classes.content}>
    <svg width="600" height="600">
      <rect width="600" height="600" style={style} />
      <Robot {...robots.red} selected={selected === "red"} />
      <Robot {...robots.green} selected={selected === "green"} />
      <Robot {...robots.blue} selected={selected === "blue"} />
      <Robot {...robots.orange} selected={selected === "orange"} />
      <Grid />
      <Blocks blocks={blocks} />
      <Target {...target} />
    </svg>
  </div>
);

export default Board;

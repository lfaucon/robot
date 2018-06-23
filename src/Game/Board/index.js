import * as React from "react";

import Robot from "./Robot";
import Grid from "./Grid";
import Walls from "./Walls";
import Target from "./Target";

const style = {
  fill: "#eee",
  stroke: "black",
  strokeWidth: "4px"
};

const Board = ({ robots, walls, target, selected, classes }) => (
  <div className={classes.content}>
    <svg width="600" height="600">
      <rect width="600" height="600" style={style} />
      <Robot {...robots.red} selected={selected === "red"} />
      <Robot {...robots.green} selected={selected === "green"} />
      <Robot {...robots.blue} selected={selected === "blue"} />
      <Robot {...robots.orange} selected={selected === "orange"} />
      <Grid />
      <Walls walls={walls} />
      <Target {...target} />
    </svg>
  </div>
);

export default Board;

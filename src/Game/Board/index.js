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

const Board = ({ robots, blocks, target, selected, classes, gameId }) => (
  <div className={classes.content}>
    <p>Game ID: {gameId}</p>
    <svg width="600" height="600">
      <rect width="600" height="600" style={style} />
      {Object.values(robots).map(R => (
        <Robot {...R} selected={selected === R.fill} key={R.fill} />
      ))}
      <Grid />
      <Blocks blocks={blocks} />
      <Target {...target} />
    </svg>
  </div>
);

export default Board;

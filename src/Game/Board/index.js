import * as React from "react";

import Robot from "./Robot";
import SquareGrid from "./SquareGrid";
import Blocks from "./Blocks";
import Target from "./Target";
import Controls from "./Controls";

const style = {
  fill: "#eee",
  stroke: "black",
  strokeWidth: "4px"
};

const Board = props => {
  const { robots, blocks, target, selected } = props;
  const { move, selectRobot } = props;
  return (
    <div>
      <svg viewBox="0 0 600 600" width="100%">
        <rect width="600" height="600" style={style} />
        {robots.map(R => (
          <Robot
            {...R}
            selected={selected === R.fill}
            key={R.fill}
            selectRobot={() => selectRobot(R.fill)}
          />
        ))}
        <SquareGrid />
        <Blocks blocks={blocks} />
        <Target {...target} />
      </svg>
      <Controls move={move} selectRobot={selectRobot} />
    </div>
  );
};

export default Board;

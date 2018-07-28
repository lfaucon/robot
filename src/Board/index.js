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

class Board extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { game } = this.props;
    const s = game.config.size * 50;
    return (
      <React.Fragment>
        <svg viewBox={"0 0 " + s + " " + s} width="100%">
          <rect width={s} height={s} style={style} ref={this.props._ref} />
          {game.robots.map(R => (
            <Robot
              key={JSON.stringify(R)}
              {...R}
              selected={game.selected === R.fill}
              selectRobot={() => {
                game.selectRobot(R.fill);
                this.forceUpdate();
              }}
            />
          ))}
          <SquareGrid size={game.config.size} />
          <Blocks blocks={game.blocks} />
          <Target {...game.target} />
        </svg>
        <Controls selectRobot={game.selectRobot} />
      </React.Fragment>
    );
  }
}

export default Board;

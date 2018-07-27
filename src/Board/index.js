import * as React from "react";
import Hammer from "hammerjs";

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
  board = null;

  componentDidMount() {
    const { game } = this.props;
    this.hammer = Hammer(this.board);
    this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.on("swipeleft", () => game.move("left"));
    this.hammer.on("swiperight", () => game.move("right"));
    this.hammer.on("swipeup", () => game.move("up"));
    this.hammer.on("swipedown", () => game.move("down"));
  }

  componentWillUnmount() {
    const { game } = this.props;
    this.hammer.off("swipeleft", () => game.move("left"));
    this.hammer.off("swiperight", () => game.move("right"));
    this.hammer.off("swipeup", () => game.move("up"));
    this.hammer.off("swipedown", () => game.move("down"));
  }

  render() {
    const { game } = this.props;
    const s = game.config.size * 50;
    return (
      <React.Fragment>
        <svg
          viewBox={"0 0 " + s + " " + s}
          width="100%"
          ref={el => (this.board = el)}
        >
          <rect width={s} height={s} style={style} />
          {game.robots.map(R => (
            <Robot
              key={JSON.stringify(R)}
              {...R}
              selected={game.selected === R.fill}
              selectRobot={() => game.selectRobot(R.fill)}
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

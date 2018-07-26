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

  test = () => {
    console.log("test");
  };

  componentDidMount() {
    const { move } = this.props;
    this.hammer = Hammer(this.board);
    this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.on("swipeleft", () => move("left"));
    this.hammer.on("swiperight", () => move("right"));
    this.hammer.on("swipeup", () => move("up"));
    this.hammer.on("swipedown", () => move("down"));
  }

  componentWillUnmount() {
    const { move } = this.props;
    this.hammer.off("swipeleft", () => move("left"));
    this.hammer.off("swiperight", () => move("right"));
    this.hammer.off("swipeup", () => move("up"));
    this.hammer.off("swipedown", () => move("down"));
  }

  render() {
    const { robots, blocks, target, selected } = this.props;
    const { selectRobot, size } = this.props;
    const s = size * 50;
    return (
      <React.Fragment>
        <svg
          viewBox={"0 0 " + s + " " + s}
          width="100%"
          ref={el => (this.board = el)}
        >
          <rect width={s} height={s} style={style} />
          {robots.map(R => (
            <Robot
              key={JSON.stringify(R)}
              {...R}
              selected={selected === R.fill}
              selectRobot={() => selectRobot(R.fill)}
            />
          ))}
          <SquareGrid size={size} />
          <Blocks blocks={blocks} />
          <Target {...target} />
        </svg>
        <Controls selectRobot={selectRobot} />
      </React.Fragment>
    );
  }
}

export default Board;
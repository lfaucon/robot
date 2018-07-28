import * as React from "react";
import Hammer from "hammerjs";
import Mousetrap from "mousetrap";
import firebase from "firebase";

import Grid from "@material-ui/core/Grid";

import GameAPI from "./api";
import Board from "../Board";
import Info from "./Info";
import Sequence from "./Sequence";

class Game extends React.Component {
  board = null;

  move = direction => {
    this.props.game.move(direction);
    this.forceUpdate();

    if (this.props.game.winning) {
      this.props.onWin();
    }
  };

  selectRobot = color => {
    this.props.game.selectRobot(color);
    this.forceUpdate();
  };

  fullId() {
    const { size, robots, blocks } = this.props.game.config;
    const conf = [size, robots, blocks].join("|");
    return conf + "/" + this.props.game.gameId;
  }

  componentWillMount() {
    Mousetrap.bind("right", () => this.move("right"));
    Mousetrap.bind("left", () => this.move("left"));
    Mousetrap.bind("down", () => this.move("down"));
    Mousetrap.bind("up", () => this.move("up"));

    Mousetrap.bind("r", () => this.selectRobot("red"));
    Mousetrap.bind("g", () => this.selectRobot("green"));
    Mousetrap.bind("b", () => this.selectRobot("blue"));
    Mousetrap.bind("y", () => this.selectRobot("orange"));
  }

  componentDidMount() {
    this.hammer = Hammer(this.board);
    this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.on("swipeleft", () => this.move("left"));
    this.hammer.on("swiperight", () => this.move("right"));
    this.hammer.on("swipeup", () => this.move("up"));
    this.hammer.on("swipedown", () => this.move("down"));
  }

  componentWillUnmount() {
    Mousetrap.reset();

    this.hammer.off("swipeleft", () => this.move("left"));
    this.hammer.off("swiperight", () => this.move("right"));
    this.hammer.off("swipeup", () => this.move("up"));
    this.hammer.off("swipedown", () => this.move("down"));
  }

  render() {
    return (
      <React.Fragment>
        <Board
          _ref={el => (this.board = el)}
          game={this.props.game}
          selectRobot={this.selectRobot}
        />
        <Info gameId={this.props.game.gameId} moves={this.props.game.moves} />
        <Sequence sequence={this.props.game.sequence} />
      </React.Fragment>
    );
  }
}

export default Game;

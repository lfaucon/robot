import * as React from "react";
import Mousetrap from "mousetrap";
import { cloneDeep } from "lodash";

import Board from "./Board";
import Controls from "./Controls";
import WinDialog from "./WinDialog";

class Game extends React.Component {
  state = {
    robots: {
      red: {
        x: 0,
        y: 0,
        fill: "red"
      },
      green: {
        x: 11,
        y: 0,
        fill: "green"
      },
      blue: {
        x: 0,
        y: 11,
        fill: "blue"
      },
      orange: {
        x: 11,
        y: 11,
        fill: "orange"
      }
    },
    blocks: [],
    selected: "red",
    target: {
      x: 6,
      y: 6,
      stroke: "red"
    },
    winning: false
  };

  saveState = () => {
    this.saved = cloneDeep(this.state);
  };

  getFreeCoordinates = () => {
    while (true) {
      const _x = Math.floor(Math.random() * 12);
      const _y = Math.floor(Math.random() * 12);
      const { robots, blocks } = this.state;
      const blockers = Object.values(robots).concat(blocks);
      if (!blockers.find(({ x, y }) => x === _x && y === _y)) {
        return [_x, _y];
      }
    }
  };

  shuffleRobots = () => {
    const { robots } = this.state;
    Object.values(robots).forEach(R => {
      const [x, y] = this.getFreeCoordinates();
      R.x = x;
      R.y = y;
    });
    this.forceUpdate();
    this.saveState();
  };

  shuffleBlocks = () => {
    this.state.blocks = [];
    const blocks = new Array(12).fill().forEach(_ => {
      const [x, y] = this.getFreeCoordinates();
      this.state.blocks.push({ x, y });
    });
    this.forceUpdate();
    this.saveState();
  };

  shuffleTarget = () => {
    const [x, y] = this.getFreeCoordinates();
    const stroke = ["red", "blue", "green", "orange"][
      Math.floor(Math.random() * 4)
    ];
    this.state.target = { x, y, stroke };
    this.forceUpdate();
    this.saveState();
  };

  newGame = () => {
    this.shuffleBlocks();
    this.shuffleRobots();
    this.shuffleTarget();
    this.saveState();
    this.setState({ winning: false });
  };

  restartGame = () => {
    this.setState(cloneDeep(this.saved));
    this.setState({ winning: false });
  };

  move = direction => {
    const { robots, selected, blocks, target } = this.state;
    const R = robots[selected];
    const blockers = Object.values(robots).concat(blocks);
    if (direction === "up") {
      const block = blockers
        .filter(({ x, y }) => x === R.x && y < R.y)
        .map(item => item.y);
      R.y = block.length > 0 ? Math.max(...block) + 1 : 0;
    }
    if (direction === "down") {
      const block = blockers
        .filter(({ x, y }) => x === R.x && y > R.y)
        .map(item => item.y);
      R.y = block.length > 0 ? Math.min(...block) - 1 : 11;
    }
    if (direction === "left") {
      const block = blockers
        .filter(({ x, y }) => x < R.x && y === R.y)
        .map(item => item.x);
      R.x = block.length > 0 ? Math.max(...block) + 1 : 0;
    }
    if (direction === "right") {
      const block = blockers
        .filter(({ x, y }) => x > R.x && y === R.y)
        .map(item => item.x);
      R.x = block.length > 0 ? Math.min(...block) - 1 : 11;
    }
    if (R.fill === target.stroke && R.x === target.x && R.y === target.y) {
      this.state.winning = true;
    }
    this.forceUpdate();
  };

  componentDidMount() {
    this.saveState();

    Mousetrap.bind("right", () => this.move("right"));
    Mousetrap.bind("left", () => this.move("left"));
    Mousetrap.bind("down", () => this.move("down"));
    Mousetrap.bind("up", () => this.move("up"));

    Mousetrap.bind("r", () => this.setState({ selected: "red" }));
    Mousetrap.bind("g", () => this.setState({ selected: "green" }));
    Mousetrap.bind("b", () => this.setState({ selected: "blue" }));
    Mousetrap.bind("y", () => this.setState({ selected: "orange" }));
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }

  render() {
    const { winning } = this.state;
    const { classes } = this.props;
    const controls = {
      restartGame: this.restartGame,
      newGame: this.newGame,
      shuffleBlocks: this.shuffleBlocks,
      shuffleRobots: this.shuffleRobots,
      shuffleTarget: this.shuffleTarget
    };
    return (
      <React.Fragment>
        <Controls classes={classes} {...controls} />
        <Board {...this.state} classes={classes} />
        <WinDialog
          open={winning}
          {...controls}
          onClose={() => this.setState({ winning: false })}
        />
      </React.Fragment>
    );
  }
}

export default Game;

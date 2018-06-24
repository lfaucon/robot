import * as React from "react";
import Mousetrap from "mousetrap";
import { cloneDeep } from "lodash";
import seedrandom from "seedrandom";

import Board from "./Board";
import Controls from "./Controls";
import WinDialog from "./WinDialog";

const colors = ["red", "blue", "green", "orange"];
class Game extends React.Component {
  rng = seedrandom();

  state = {
    gameId: null,
    config: {
      robots: 4,
      blocks: 12
    },
    robots: {},
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
      const _x = Math.floor(12 * this.rng());
      const _y = Math.floor(12 * this.rng());
      const { robots, blocks, target } = this.state;
      const blockers = [...Object.values(robots), ...blocks, target];
      if (!blockers.find(({ x, y }) => x === _x && y === _y)) {
        return [_x, _y];
      }
    }
  };

  shuffleRobots = () => {
    const { config } = this.state;
    this.state.robots = {};
    new Array(config.robots).fill().forEach((_, i) => {
      const [x, y] = this.getFreeCoordinates();
      const fill = colors[i];
      this.state.robots[fill] = { x, y, fill };
    });
    this.forceUpdate();
    this.saveState();
  };

  shuffleBlocks = () => {
    const { config } = this.state;
    this.state.blocks = [];
    const blocks = new Array(config.blocks).fill().forEach(_ => {
      const [x, y] = this.getFreeCoordinates();
      this.state.blocks.push({ x, y });
    });
    this.forceUpdate();
    this.saveState();
  };

  shuffleTarget = () => {
    this.state.target = { x: -1, y: -1 };
    const [x, y] = this.getFreeCoordinates();
    const stroke = colors[Math.floor(4 * this.rng())];
    this.state.target = { x, y, stroke };
    this.state.selected = stroke;
    this.forceUpdate();
    this.saveState();
  };

  newGame = seed => {
    const randSeed = Math.floor(Math.random() * 0x1000000).toString(16);
    const gameId = seed ? seed : randSeed;
    this.rng = seedrandom(gameId);
    this.state.robots = {};
    this.state.blocks = [];
    this.state.target = { x: -1, y: -1 };
    this.shuffleBlocks();
    this.shuffleRobots();
    this.shuffleTarget();
    this.setState({ winning: false, gameId });
  };

  restartGame = () => {
    this.setState(cloneDeep(this.saved));
    this.setState({ winning: false });
  };

  move = direction => {
    const { robots, selected, blocks, target } = this.state;
    const R = robots[selected];
    const blockers = [...Object.values(robots), ...blocks];

    const maxFn = b => Math.max(-1, ...b) + 1;
    const minFn = b => Math.min(12, ...b) - 1;
    const [filterFn, xy, minmaxFn] = {
      up: [({ x, y }) => x === R.x && y < R.y, "y", maxFn],
      down: [({ x, y }) => x === R.x && y > R.y, "y", minFn],
      left: [({ x, y }) => x < R.x && y === R.y, "x", maxFn],
      right: [({ x, y }) => x > R.x && y === R.y, "x", minFn]
    }[direction];
    R[xy] = minmaxFn(blockers.filter(filterFn).map(i => i[xy]));

    if (R.fill === target.stroke && R.x === target.x && R.y === target.y) {
      this.state.winning = true;
    }
    this.forceUpdate();
  };

  componentDidMount() {
    this.newGame();

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
      newGame: this.newGame
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

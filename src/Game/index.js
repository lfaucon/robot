import * as React from "react";
import Mousetrap from "mousetrap";
import { cloneDeep } from "lodash";
import seedrandom from "seedrandom";

import Grid from "@material-ui/core/Grid";

import Board from "./Board";
import SidePanel from "./SidePanel";
import Info from "./Info";
import WinDialog from "./WinDialog";

const colors = ["red", "blue", "green", "orange"];
class Game extends React.Component {
  rng = seedrandom();

  state = {
    gameId: null,
    moves: 0,
    config: {
      robots: 4,
      blocks: 12
    },
    robots: [],
    blocks: [],
    selected: "red",
    target: {},
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
      const blockers = [...robots, ...blocks, target];
      if (!blockers.find(({ x, y }) => x === _x && y === _y)) {
        return [_x, _y];
      }
    }
  };

  shuffleRobots = () => {
    const { config } = this.state;
    new Array(config.robots).fill().forEach((_, i) => {
      const [x, y] = this.getFreeCoordinates();
      const fill = colors[i];
      this.state.robots.push({ x, y, fill });
    });
  };

  shuffleTarget = () => {
    const [x, y] = this.getFreeCoordinates();
    const stroke = colors[Math.floor(4 * this.rng())];
    this.state.target = { x, y, stroke };
    this.state.selected = stroke;
  };

  newGame = seed => {
    const randSeed = Math.floor(Math.random() * 0x1000000).toString(16);
    const gameId = seed ? seed : randSeed;
    this.rng = seedrandom(gameId);
    this.state.robots = [];
    this.state.blocks = [];
    this.state.target = { x: -1, y: -1 };
    this.shuffleBlocks();
    this.shuffleRobots();
    this.shuffleTarget();
    this.state.winning = false;
    this.state.moves = 0;
    this.state.gameId = gameId;
    this.forceUpdate();
    this.saveState();
  };

  restartGame = () => {
    this.setState(cloneDeep(this.saved));
    this.setState({ winning: false, moves: 0 });
  };

  move = direction => {
    this.state.moves += 1;

    const { robots, selected, blocks, target } = this.state;
    const R = robots.find(r => r.fill === selected);
    const blockers = [...robots, ...blocks];

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
    const { winning, moves } = this.state;
    const controls = {
      restartGame: this.restartGame,
      newGame: this.newGame,
      selectRobot: color => this.setState({ selected: color }),
      move: this.move
    };
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4} md={3}>
          <SidePanel {...controls} />
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          <Info {...this.state} />
          <Board {...this.state} {...controls} />
        </Grid>
        <WinDialog
          open={winning}
          moves={moves}
          onClose={() => this.setState({ winning: false })}
          {...controls}
        />
      </Grid>
    );
  }
}

export default Game;

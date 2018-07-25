import * as React from "react";
import Mousetrap from "mousetrap";
import { cloneDeep } from "lodash";
import seedrandom from "seedrandom";

import Grid from "@material-ui/core/Grid";

import Board from "../Board";
import SidePanel from "../SidePanel";
import Info from "./Info";
import Sequence from "./Sequence";
import WinDialog from "./WinDialog";

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const colors = ["red", "blue", "green", "orange"];
class Game extends React.Component {
  rng = seedrandom();

  state = {
    gameId: null,
    moves: 0,
    sequence: [],
    config: {},
    robots: [],
    blocks: [],
    target: {},
    selected: "red",
    winning: false
  };

  saveState = () => {
    this.saved = cloneDeep(this.state);
  };

  getFreeCoordinates = () => {
    while (true) {
      const { size } = this.state.config;
      const _x = Math.floor(size * this.rng());
      const _y = Math.floor(size * this.rng());
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

  shuffleBlocks = () => {
    const { config } = this.state;
    new Array(config.blocks).fill().forEach((_, i) => {
      const [x, y] = this.getFreeCoordinates();
      this.state.blocks.push({ x, y });
    });
  };

  shuffleTarget = () => {
    const { config } = this.state;
    const [x, y] = this.getFreeCoordinates();
    const stroke = colors[Math.floor(config.robots * this.rng())];
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
    this.state.sequence = [];
    this.state.gameId = gameId;
    this.forceUpdate();
    this.saveState();
  };

  restartGame = () => {
    this.setState(cloneDeep(this.saved));
    this.setState({ winning: false, moves: 0, sequence: [] });
  };

  move = direction => {
    this.state.moves += 1;
    this.state.sequence.push({ direction, color: this.state.selected });
    const { robots, selected, blocks, target } = this.state;
    const { size } = this.state.config;

    const R = robots.find(r => r.fill === selected);
    const blockers = [...robots, ...blocks];

    const maxFn = b => Math.max(-1, ...b) + 1;
    const minFn = b => Math.min(size, ...b) - 1;
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

  toString() {
    const { target, robots, blocks, gameId, config } = this.state;
    return [
      gameId,
      [config.size, config.robots, config.blocks].join(" "),
      [colors.indexOf(target.stroke), target.x, target.y].join(" "),
      ...robots.map(r => r.x + " " + r.y),
      ...blocks.map(b => b.x + " " + b.y)
    ].join("\n");
  }

  componentWillReceiveProps(nextProps) {
    const { size, robots, blocks, seed } = nextProps.match.params;
    this.state.config = {
      size: parseInt(size),
      robots: parseInt(robots),
      blocks: parseInt(blocks)
    };
    this.newGame(seed);
  }

  componentWillMount() {
    const { size, robots, blocks, seed } = this.props.match.params;
    this.state.config = {
      size: parseInt(size),
      robots: parseInt(robots),
      blocks: parseInt(blocks)
    };
    this.newGame(seed);

    Mousetrap.bind("right", () => this.move("right"));
    Mousetrap.bind("left", () => this.move("left"));
    Mousetrap.bind("down", () => this.move("down"));
    Mousetrap.bind("up", () => this.move("up"));

    Mousetrap.bind("r", () => this.setState({ selected: "red" }));
    Mousetrap.bind("g", () => this.setState({ selected: "green" }));
    Mousetrap.bind("b", () => this.setState({ selected: "blue" }));
    Mousetrap.bind("y", () => this.setState({ selected: "orange" }));

    Mousetrap.bind("n", () => this.newGame());
    Mousetrap.bind("q", () => this.restartGame());

    Mousetrap.bind("shift+d", () => {
      console.log("download");
      download(this.state.gameId + ".robot", this.toString());
    });
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }

  render() {
    console.log(this.props.match.params);

    const { winning, moves, config } = this.state;
    const controls = {
      restartGame: this.restartGame,
      newGame: this.newGame,
      selectRobot: color => this.setState({ selected: color }),
      move: this.move,
      setConfig: c => {
        this.state.config = c;
      }
    };
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4} md={3}>
          <SidePanel {...controls} config={config} />
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          <Board {...this.state} {...controls} size={config.size} />
          <Info {...this.state} />
          <Sequence {...this.state} />
        </Grid>
        <WinDialog
          open={winning}
          moves={moves}
          onClose={() => this.setState({ winning: false })}
          history={this.props.history}
        />
      </Grid>
    );
  }
}

export default Game;

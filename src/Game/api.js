import seedrandom from "seedrandom";

const colors = ["red", "blue", "green", "orange"];
export default class Game {
  constructor(config, gameId) {
    this.config = config;
    this.gameId = gameId;
    this.rng = seedrandom(this.gameId);

    this.loadInitialState();
  }

  getFreeCoordinates = () => {
    while (true) {
      const { size } = this.config;
      const _x = Math.floor(size * this.rng());
      const _y = Math.floor(size * this.rng());
      const blockers = [...this.robots, ...this.blocks, this.target];
      if (!blockers.find(({ x, y }) => x === _x && y === _y)) {
        return [_x, _y];
      }
    }
  };

  loadInitialState() {
    this.rng = seedrandom(this.gameId);

    this.blocks = [];
    this.robots = [];
    this.target = { x: -1, y: -1 };

    new Array(this.config.blocks).fill().forEach((_, i) => {
      const [x, y] = this.getFreeCoordinates();
      this.blocks.push({ x, y });
    });

    new Array(this.config.robots).fill().forEach((_, i) => {
      const [x, y] = this.getFreeCoordinates();
      const fill = colors[i];
      this.robots.push({ x, y, fill });
    });

    const [x, y] = this.getFreeCoordinates();
    const stroke = colors[Math.floor(this.config.robots * this.rng())];
    this.target = { x, y, stroke };
    this.selected = stroke;

    this.winning = false;
    this.moves = 0;
    this.sequence = [];
  }

  move = direction => {
    this.moves += 1;
    this.sequence.push({ direction, color: this.selected });
    const { size } = this.config;

    const R = this.robots.find(r => r.fill === this.selected);
    const blockers = [...this.robots, ...this.blocks];

    const maxFn = b => Math.max(-1, ...b) + 1;
    const minFn = b => Math.min(size, ...b) - 1;
    const [filterFn, xy, minmaxFn] = {
      up: [({ x, y }) => x === R.x && y < R.y, "y", maxFn],
      down: [({ x, y }) => x === R.x && y > R.y, "y", minFn],
      left: [({ x, y }) => x < R.x && y === R.y, "x", maxFn],
      right: [({ x, y }) => x > R.x && y === R.y, "x", minFn]
    }[direction];
    R[xy] = minmaxFn(blockers.filter(filterFn).map(i => i[xy]));

    if (
      R.fill === this.target.stroke &&
      R.x === this.target.x &&
      R.y === this.target.y
    ) {
      this.winning = true;
    }
  };

  selectRobot = color => {
    this.selected = color;
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
}

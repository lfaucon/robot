const seedrandom = require("seedrandom");
const colors = ["0", "1", "2", "3"];

class Game {
  constructor(seed) {
    this.id = Math.floor(Math.random() * 0x1000000).toString(16);
    const rng = seedrandom(this.id);

    this.robots = [];
    this.blocks = [];
    this.target = { x: -1, y: -1 };

    this.shuffleBlocks(rng);
    this.shuffleRobots(rng);
    this.shuffleTarget(rng);
  }

  getFreeCoordinates(rng) {
    while (true) {
      const _x = Math.floor(12 * rng());
      const _y = Math.floor(12 * rng());
      const blockers = [...this.robots, ...this.blocks, this.target];
      if (!blockers.find(({ x, y }) => x === _x && y === _y)) {
        return [_x, _y];
      }
    }
  }

  shuffleBlocks(rng) {
    new Array(12).fill().forEach(_ => {
      const [x, y] = this.getFreeCoordinates(rng);
      this.blocks.push({ x, y });
    });
  }

  shuffleRobots(rng) {
    new Array(4).fill().forEach((_, i) => {
      const [x, y] = this.getFreeCoordinates(rng);
      const fill = colors[i];
      this.robots.push({ x, y, fill });
    });
  }

  shuffleTarget(rng) {
    const [x, y] = this.getFreeCoordinates(rng);
    const stroke = colors[Math.floor(4 * rng())];
    this.target = { x, y, stroke };
  }

  toString() {
    return (
      this.id +
      "\n12 4 12\n" +
      this.target.stroke +
      " " +
      this.target.x +
      " " +
      this.target.y +
      "\n" +
      this.robots.map(r => r.x + " " + r.y + "\n").join("") +
      this.blocks.map(b => b.x + " " + b.y + "\n").join("")
    );
  }
}

module.exports = Game;

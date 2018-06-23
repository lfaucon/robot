import * as React from "react";
import Mousetrap from "mousetrap";

import Board from "./Board";
import Controls from "./Controls";

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
    walls: [],
    selected: "red",
    target: {
      x: 6,
      y: 6,
      stroke: "red"
    }
  };

  move = direction => {
    const { robots, selected, walls } = this.state;
    const R = robots[selected];
    const blockers = Object.values(robots).concat(walls);
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
    this.forceUpdate();
  };

  componentDidMount() {
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
    const { classes } = this.props;
    return (
      <div>
        <Controls classes={classes} />
        <Board {...this.state} classes={classes} />
      </div>
    );
  }
}

export default Game;

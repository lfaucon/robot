import * as React from "react";
import Mousetrap from "mousetrap";
import firebase from "firebase";

import Grid from "@material-ui/core/Grid";

import GameAPI from "./api";
import Board from "../Board";
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

class Game extends React.Component {
  game = null;

  newGame = seed => {
    this.game = new GameAPI({}, "hello");

    const userName = localStorage.getItem("login");
    const database = firebase.database();
    const eventRef = database.ref("users/" + userName).push();
    eventRef.set({
      event: "START",
      date: Date.now(),
      gameId: this.fullId()
    });
  };

  restartGame = () => {
    this.game.loadInitialState();

    const userName = localStorage.getItem("login");
    const database = firebase.database();
    const eventRef = database.ref("users/" + userName).push();
    eventRef.set({
      event: "RESTART",
      date: Date.now(),
      gameId: this.fullId()
    });
  };

  move = direction => {
    this.game.move(direction);
    this.forceUpdate();

    if (this.game.winning) {
      const database = firebase.database();
      const sequenceRef = database.ref("games/" + this.fullId()).push();
      sequenceRef.set(this.game.sequence);

      const userName = localStorage.getItem("login");
      const eventRef = database.ref("users/" + userName).push();
      eventRef.set({
        event: "WIN",
        date: Date.now(),
        gameId: this.fullId(),
        sequence: this.game.sequence
      });
    }
  };

  selectRobot = color => {
    this.game.selectRobot(color);
    this.forceUpdate();
  };

  fullId() {
    const { size, robots, blocks } = this.game.config;
    const conf = [size, robots, blocks].join("|");
    return conf + "/" + this.game.gameId;
  }

  componentWillReceiveProps(nextProps) {
    const { size, robots, blocks, seed } = nextProps.match.params;
    const config = {
      size: parseInt(size),
      robots: parseInt(robots),
      blocks: parseInt(blocks)
    };
    this.game = new GameAPI(config, seed);
  }

  componentWillMount() {
    const { size, robots, blocks, seed } = this.props.match.params;
    const config = {
      size: parseInt(size),
      robots: parseInt(robots),
      blocks: parseInt(blocks)
    };
    this.game = new GameAPI(config, seed);

    Mousetrap.bind("right", () => this.move("right"));
    Mousetrap.bind("left", () => this.move("left"));
    Mousetrap.bind("down", () => this.move("down"));
    Mousetrap.bind("up", () => this.move("up"));

    Mousetrap.bind("r", () => this.selectRobot("red"));
    Mousetrap.bind("g", () => this.selectRobot("green"));
    Mousetrap.bind("b", () => this.selectRobot("blue"));
    Mousetrap.bind("y", () => this.selectRobot("orange"));

    const newGame = () =>
      this.props.history.push(
        Math.floor(Math.random() * 0x1000000).toString(16)
      );

    const restartGame = () => this.props.history.push();

    Mousetrap.bind("n", newGame);
    Mousetrap.bind("t", restartGame);

    Mousetrap.bind("shift+d", () => {
      download(this.game.gameId + ".robot", this.game.toString());
    });
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }

  render() {
    return (
      <React.Fragment>
        <Board game={this.game} />
        <Info gameId={this.game.gameId} moves={this.game.moves} />
        <Sequence sequence={this.game.sequence} />
        <WinDialog
          open={this.game.winning}
          moves={this.game.moves}
          onClose={() => this.setState({ winning: false })}
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

export default Game;

import * as React from "react";
import Mousetrap from "mousetrap";
import firebase from "firebase";

import GameAPI from "../Game/api";
import Game from "../Game";
import WinDialog from "./WinDialog";

const download = (filename, text) => {
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
};

export default class Puzzle extends React.Component {
  state = { winning: false };

  newGame = seed => {
    const userName = localStorage.getItem("login");
    const database = firebase.database();
    const eventRef = database.ref("users/" + userName).push();
    eventRef.set({
      event: "START",
      date: Date.now(),
      gameId: this.fullId()
    });
    this.props.history.push(Math.floor(Math.random() * 0x1000000).toString(16));
  };

  restartGame = () => {
    const userName = localStorage.getItem("login");
    const database = firebase.database();
    const eventRef = database.ref("users/" + userName).push();
    eventRef.set({
      event: "RESTART",
      date: Date.now(),
      gameId: this.fullId()
    });
    this.props.history.push();
  };

  onWin = () => {
    this.setState({ winning: true });
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
  };

  componentWillMount() {
    this.readRoute(this.props);

    Mousetrap.bind("n", this.newGame);
    Mousetrap.bind("t", this.restartGame);

    Mousetrap.bind("shift+d", () => {
      download(this.game.gameId + ".robot", this.game.toString());
    });
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }
  componentWillReceiveProps(nextProps) {
    this.readRoute(nextProps);
  }

  fullId() {
    const { size, robots, blocks } = this.game.config;
    const conf = [size, robots, blocks].join("|");
    return conf + "/" + this.game.gameId;
  }

  readRoute(props) {
    const { size, robots, blocks, seed } = props.match.params;
    const config = {
      size: parseInt(size),
      robots: parseInt(robots),
      blocks: parseInt(blocks)
    };
    this.game = new GameAPI(config, seed);
  }

  render() {
    return (
      <React.Fragment>
        <Game game={this.game} onWin={this.onWin} />
        <WinDialog
          open={this.state.winning}
          onClose={() => this.setState({ winning: false })}
          moves={this.game.moves}
          newGame={this.newGame}
          restartGame={this.restartGame}
        />
      </React.Fragment>
    );
  }
}

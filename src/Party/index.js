import * as React from "react";
import Mousetrap from "mousetrap";

import Paper from "@material-ui/core/Paper";
import firebase from "firebase";

import GameAPI from "../Game/api";
import Game from "../Game";
import WinDialog from "./WinDialog";
import Leaderboard from "./Leaderboard";

class Party extends React.Component {
  state = { winning: false, loaded: false };

  componentWillMount() {
    this.setState({ party: null });

    Mousetrap.bind("t", this.restartGame);

    const { id } = this.props.match.params;
    this.partyRef = firebase.database().ref("party/" + id);
    this.partyRef.on("value", party => {
      console.log("party value callback");
      console.log(party.val());
      if (party.val()) {
        const { config, gameId } = party.val();
        if (!this.game || gameId !== this.game.gameId) {
          this.game = new GameAPI(config, gameId);
        }
      }
      this.setState({ loaded: true, party: party.val() });
    });
  }

  componentWillUnmount() {
    this.partyRef.off();
  }

  onWin = () => {
    console.log("WIN");
    this.setState({ winning: true });
    const { solutions } = this.state.party;
    const username = localStorage.getItem("login");
    const sequence = this.game.sequence;
    if (
      !solutions ||
      !solutions[username] ||
      solutions[username].score > sequence.length
    ) {
      this.partyRef.child("solutions/" + username).set({
        score: sequence.length,
        sequence,
        time: Date.now()
      });
    }
  };

  restartGame = () => {
    this.game.loadInitialState();
    this.setState({ winning: false });
    this.forceUpdate();
  };

  render() {
    const username = localStorage.getItem("login");
    const { loaded, party, winning } = this.state;
    if (!loaded) {
      return <p>please wait...</p>;
    }
    if (!party) {
      return (
        <React.Fragment>
          <p>This party does not exist</p>
          <button
            onClick={() => {
              console.log("click");
              this.partyRef.set({
                owner: username,
                config: { size: 9, robots: 4, blocks: 5 },
                gameId: Math.floor(Math.random() * 0x1000000).toString(16)
              });
            }}
          >
            Create Party
          </button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Game game={this.game} onWin={this.onWin} />
        <WinDialog
          open={winning}
          moves={this.game.moves}
          restartGame={this.restartGame}
        />
        <Leaderboard solutions={party.solutions} />
        <button
          onClick={() => {
            console.log("click");
            this.partyRef
              .child("gameId/")
              .set(Math.floor(Math.random() * 0x1000000).toString(16));
            this.partyRef.child("solutions/").set({});
          }}
        >
          Next Game
        </button>
      </React.Fragment>
    );
  }
}

export default Party;

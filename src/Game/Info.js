import * as React from "react";

import Paper from "@material-ui/core/Paper";

const style = {
  float: "right"
};

const Info = ({ gameId, moves }) => (
  <Paper>
    <span>{"Game ID: " + gameId}</span>
    <span style={style}>{"Moves: " + moves}</span>
  </Paper>
);

export default Info;

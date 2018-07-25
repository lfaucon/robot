import * as React from "react";

import Paper from "@material-ui/core/Paper";

const D = {
  up: "U",
  down: "D",
  left: "L",
  right: "R"
};

const Sequence = ({ sequence }) => (
  <Paper style={{ overflow: "hidden" }}>
    {sequence.map((x, i) => (
      <span key={i} style={{ color: x.color }}>
        {D[x.direction]}
      </span>
    ))}
  </Paper>
);

export default Sequence;

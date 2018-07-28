import * as React from "react";
import Paper from "@material-ui/core/Paper";

export default ({ solutions }) => (
  <Paper>
    {Object.entries(solutions).map(([name, seq]) => (
      <p key={name}>{name + ": " + seq.length}</p>
    ))}
  </Paper>
);

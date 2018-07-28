import * as React from "react";
import Paper from "@material-ui/core/Paper";

export default ({ solutions }) => (
  <Paper>
    {Object.entries(solutions || {}).map(([name, solution]) => (
      <p key={name}>{name + ": " + solution.sequence.length}</p>
    ))}
  </Paper>
);

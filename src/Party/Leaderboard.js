import * as React from "react";
import Paper from "@material-ui/core/Paper";

const compare = ([_, sol1], [__, sol2]) => {
  if (sol1.score === sol2.score) {
    return sol1.time > sol2.time;
  }
  return sol1.score > sol2.score;
};

export default ({ solutions }) => (
  <Paper>
    {Object.entries(solutions || {})
      .sort(compare)
      .map(([name, solution], i) => (
        <p key={name}>
          {"rank " + (i + 1) + " - " + name + " - " + solution.score + " moves"}
        </p>
      ))}
  </Paper>
);

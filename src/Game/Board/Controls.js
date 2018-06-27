import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import Adb from "@material-ui/icons/Adb";

const styles = () => ({
  button: {
    width: "100%",
    minWidth: "100%",
    margin: "auto"
  }
});

const fontSize = "250%";

const RobotButton = withStyles(styles)(({ color, selectRobot, classes }) => (
  <Grid item xs={3}>
    <Button
      className={classes.button}
      variant="contained"
      aria-label="add"
      onClick={() => selectRobot(color)}
    >
      <Adb style={{ fontSize, color }} />
    </Button>
  </Grid>
));

const Controls = ({ selectRobot }) => (
  <Hidden smUp>
    <Grid container spacing={8}>
      <RobotButton color="red" selectRobot={selectRobot} />
      <RobotButton color="green" selectRobot={selectRobot} />
      <RobotButton color="blue" selectRobot={selectRobot} />
      <RobotButton color="orange" selectRobot={selectRobot} />
    </Grid>
  </Hidden>
);

export default Controls;

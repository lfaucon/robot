import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
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

const DirectionIcons = {
  up: <ArrowUpward style={{ fontSize }} />,
  down: <ArrowDownward style={{ fontSize }} />,
  left: <ArrowBack style={{ fontSize }} />,
  right: <ArrowForward style={{ fontSize }} />
};

const ArrowButton = withStyles(styles)(({ direction, move, classes }) => (
  <Grid item xs={3}>
    <Button
      className={classes.button}
      variant="contained"
      aria-label="add"
      onClick={() => move(direction)}
    >
      {DirectionIcons[direction]}
    </Button>
  </Grid>
));

const Controls = ({ selectRobot, move, classes }) => (
  <Hidden smUp>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Grid container spacing={8}>
          <ArrowButton direction="right" move={move} />
          <ArrowButton direction="up" move={move} />
          <ArrowButton direction="left" move={move} />
          <ArrowButton direction="down" move={move} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={8}>
          <RobotButton color="red" selectRobot={selectRobot} />
          <RobotButton color="green" selectRobot={selectRobot} />
          <RobotButton color="blue" selectRobot={selectRobot} />
          <RobotButton color="orange" selectRobot={selectRobot} />
        </Grid>
      </Grid>
    </Grid>
  </Hidden>
);

export default Controls;

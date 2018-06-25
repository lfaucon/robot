import React, { Component } from "react";
import Game from "./Game";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  root: {
    height: "100%",
    width: "100%"
  },
  content: {
    marginTop: "64px"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Welcome to Robot
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Game />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

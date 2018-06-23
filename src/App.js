import React, { Component } from "react";
import "./App.css";
import Game from "./Game";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    height: "100%",
    width: "100%",
    zIndex: 1,
    display: "flex"
  },
  appBar: {
    position: "absolute",
    width: "100%"
  },
  drawer: {
    width: drawerWidth,
    marginTop: "64px"
  },
  content: {
    marginTop: "64px",
    marginLeft: drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Welcome to Robot
            </Typography>
          </Toolbar>
        </AppBar>
        <Game classes={classes} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

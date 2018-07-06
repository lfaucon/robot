import * as React from "react";
import Game from "./Game";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  root: {
    height: "100%",
    width: "100%"
  },
  appbar: {
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    marginTop: "42px"
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Typography variant="title" color="inherit" noWrap>
            Welcome to Robot
          </Typography>
        </AppBar>
        <div className={classes.content}>
          <Game />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

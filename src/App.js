import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import Game from "./Game";

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

const Home = () => "hello world";

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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/puzzle/:size/:robots/:blocks/:seed"
              component={Game}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

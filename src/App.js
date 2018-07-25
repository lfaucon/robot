import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import SidePanel from "./SidePanel";
import LoginDialog from "./LoginDialog";
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

const Home = ({ history }) => {
  const gameId = Math.floor(Math.random() * 0x1000000).toString(16);
  history.push(["", "robot", "puzzle", 6, 4, 4, gameId].join("/"));
  return <p>Welcome</p>;
};

class App extends React.Component {
  componentWillMount() {
    const login = localStorage.getItem("login");
    this.setState({ loggedIn: !!login });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <LoginDialog
          open={!this.state.loggedIn}
          loggedIn={() => this.setState({ loggedIn: true })}
        />
        <AppBar className={classes.appbar}>
          <Typography variant="title" color="inherit" noWrap>
            Welcome to Robot
          </Typography>
        </AppBar>
        <div className={classes.content}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4} md={3}>
              <SidePanel />
            </Grid>
            <Grid item xs={12} sm={7} md={6}>
              <Switch>
                <Route exact path="/robot/" component={Home} />
                <Route
                  path="/robot/puzzle/:size/:robots/:blocks/:seed"
                  component={Game}
                />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

import * as React from "react";

import { compose, withState } from "recompose";

import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Menu from "@material-ui/icons/Menu";
import Assignment from "@material-ui/icons/Assignment";
import Replay from "@material-ui/icons/Replay";
import Code from "@material-ui/icons/Code";
import Settings from "@material-ui/icons/Settings";
import BugReport from "@material-ui/icons/BugReport";
import Build from "@material-ui/icons/Build";
import Casino from "@material-ui/icons/Casino";

import RulesDialog from "./RulesDialog";
import SettingsDialog from "./SettingsDialog";
import GithubDialog from "./GithubDialog";
import LoadDialog from "./LoadDialog";

const LI = ({ Icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const SidePanel = ({
  openRules,
  openSettings,
  openGithub,
  openLoad,
  newGame,
  restartGame
}) => (
  <List component="div">
    <LI Icon={Assignment} text="How to play" onClick={() => openRules(true)} />
    <Divider />
    <LI Icon={Replay} text="Restart Puzzle" onClick={() => restartGame()} />
    <LI Icon={Casino} text="New Puzzle" onClick={() => newGame()} />
    <LI Icon={Code} text="Load Game" onClick={() => openLoad(true)} />
    <LI
      Icon={Settings}
      text="Game settings"
      onClick={() => openSettings(true)}
    />
    <Divider />
    <LI Icon={BugReport} text="Report a bug" onClick={() => openGithub(true)} />
    <LI Icon={Build} text="Contribute" onClick={() => openGithub(true)} />
  </List>
);

const MobilePanel = props => (
  <Paper>
    <IconButton onClick={() => props.setOpen(!props.open)}>
      <Menu />
    </IconButton>
    <IconButton onClick={() => props.openRules(true)}>
      <Assignment />
    </IconButton>
    <IconButton onClick={() => props.restartGame()}>
      <Replay />
    </IconButton>
    <IconButton onClick={() => props.newGame()}>
      <Casino />
    </IconButton>
    <IconButton onClick={() => props.openLoad(true)}>
      <Code />
    </IconButton>
  </Paper>
);

const ReactiveSidePanel = withState("open", "setOpen", false)(props => (
  <React.Fragment>
    <Hidden xsDown>
      <SidePanel {...props} />
    </Hidden>
    <Hidden smUp>
      <MobilePanel {...props} />
      <Collapse in={props.open}>
        <SidePanel {...props} />
      </Collapse>
    </Hidden>
  </React.Fragment>
));

const Dialogs = props => (
  <React.Fragment>
    <RulesDialog open={props.rules} onClose={() => props.openRules(false)} />
    <SettingsDialog
      open={props.settings}
      onClose={() => props.openSettings(false)}
    />
    <GithubDialog open={props.github} onClose={() => props.openGithub(false)} />
    <LoadDialog
      open={props.load}
      onClose={() => props.openLoad(false)}
      newGame={props.newGame}
    />
  </React.Fragment>
);

export default compose(
  withState("rules", "openRules", false),
  withState("settings", "openSettings", false),
  withState("github", "openGithub", false),
  withState("load", "openLoad", false)
)(props => (
  <React.Fragment>
    <ReactiveSidePanel {...props} />
    <Dialogs {...props} />
  </React.Fragment>
));

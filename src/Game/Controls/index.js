import * as React from "react";

import { compose, withState } from "recompose";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Assignment from "@material-ui/icons/Assignment";
import Replay from "@material-ui/icons/Replay";
import Settings from "@material-ui/icons/Settings";
import BugReport from "@material-ui/icons/BugReport";
import Build from "@material-ui/icons/Build";

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
  classes,
  openRules,
  openSettings,
  openGithub,
  openLoad,
  newGame,
  restartGame
}) => (
  <Drawer variant="permanent" anchor="left" classes={{ paper: classes.drawer }}>
    <List component="div">
      <LI
        Icon={Assignment}
        text="How to play"
        onClick={() => openRules(true)}
      />
      <Divider />
      <LI Icon={Replay} text="Restart Puzzle" onClick={() => restartGame()} />
      <LI Icon={Replay} text="New Puzzle" onClick={() => newGame()} />
      <LI Icon={Replay} text="Load Game" onClick={() => openLoad(true)} />
      <LI
        Icon={Settings}
        text="Game settings"
        onClick={() => openSettings(true)}
      />
      <Divider />
      <LI
        Icon={BugReport}
        text="Report a bug"
        onClick={() => openGithub(true)}
      />
      <LI Icon={Build} text="Contribute" onClick={() => openGithub(true)} />
    </List>
  </Drawer>
);

const Controls = props => (
  <React.Fragment>
    <SidePanel {...props} />
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
)(Controls);

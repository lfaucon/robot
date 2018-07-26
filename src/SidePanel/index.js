import * as React from "react";
import { compose, withState } from "recompose";
import { withRouter } from "react-router-dom";

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
import Share from "@material-ui/icons/Share";
import Settings from "@material-ui/icons/Settings";
import BugReport from "@material-ui/icons/BugReport";
import Build from "@material-ui/icons/Build";
import Casino from "@material-ui/icons/Casino";

import RulesDialog from "./RulesDialog";
import SettingsDialog from "./SettingsDialog";
import GithubDialog from "./GithubDialog";

const LI = ({ Icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const newGame = history => {
  history.push(Math.floor(Math.random() * 0x1000000).toString(16));
};

const restartGame = history => {
  history.push();
};

const share = () => {
  copyToClipboard(window.location.href);
  window.alert("URL copied to clipboard");
};

const SidePanel = ({
  openRules,
  openSettings,
  openGithub,
  openLoad,
  history
}) => (
  <List component="div">
    <LI Icon={Assignment} text="How to play" onClick={() => openRules(true)} />
    <Divider />
    <LI
      Icon={Replay}
      text="Restart Puzzle"
      onClick={() => restartGame(history)}
    />
    <LI Icon={Casino} text="New Puzzle" onClick={() => newGame(history)} />
    <LI
      Icon={Settings}
      text="Game settings"
      onClick={() => openSettings(true)}
    />
    <Divider />
    <LI Icon={Share} text="Share puzzle" onClick={share} />
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
    <IconButton onClick={() => restartGame(props.history)}>
      <Replay />
    </IconButton>
    <IconButton onClick={() => newGame(props.history)}>
      <Casino />
    </IconButton>
    <IconButton onClick={share}>
      <Share />
    </IconButton>
    <IconButton onClick={() => props.openSettings(true)}>
      <Settings />
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
      config={props.config}
      onClose={() => props.openSettings(false)}
      history={props.history}
    />
    <GithubDialog open={props.github} onClose={() => props.openGithub(false)} />
  </React.Fragment>
);

export default compose(
  withState("rules", "openRules", false),
  withState("settings", "openSettings", false),
  withState("github", "openGithub", false),
  withRouter
)(props => (
  <React.Fragment>
    <ReactiveSidePanel {...props} />
    <Dialogs {...props} />
  </React.Fragment>
));

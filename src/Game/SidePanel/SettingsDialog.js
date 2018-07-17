import * as React from "react";
import { compose, withState } from "recompose";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const SettingsDialog = ({
  open,
  onClose,
  setConfig,
  blocks,
  size,
  robots,
  setBlocks,
  setSize,
  setRobots,
  newGame
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Settings</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Be careful while changing the configuration. Because the games are
        generated randomly, certain configurations will generate impossible
        games.
      </DialogContentText>
      <TextField
        margin="dense"
        label="Game Size"
        type="number"
        fullWidth
        value={size > -1 ? size : ""}
        onChange={e => setSize(parseInt(e.target.value))}
      />
      <TextField
        margin="dense"
        label="Number of Robots"
        type="number"
        fullWidth
        value={robots > -1 ? robots : ""}
        onChange={e => setRobots(parseInt(e.target.value))}
      />
      <TextField
        margin="dense"
        label="Number of Blocks"
        type="number"
        fullWidth
        value={blocks > -1 ? blocks : ""}
        onChange={e => setBlocks(parseInt(e.target.value))}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          const s = Math.max(4, Math.min(256, size));
          const r = Math.max(1, Math.min(4, robots));
          const b = Math.max(0, Math.min(Math.floor((s * s) / 3), blocks));
          setSize(s);
          setRobots(r);
          setBlocks(b);
          setConfig({ size: s, robots: r, blocks: b });
          newGame();
          onClose();
        }}
        color="primary"
      >
        APPLY
      </Button>
    </DialogActions>
  </Dialog>
);

export default compose(
  withState("size", "setSize", 12),
  withState("robots", "setRobots", 4),
  withState("blocks", "setBlocks", 12)
)(SettingsDialog);

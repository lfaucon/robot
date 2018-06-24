import * as React from "react";
import { withState } from "recompose";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const SettingsDialog = ({ id, setId, newGame, open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Settings</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Game ID"
        fullWidth
        onChange={e => setId(e.target.value)}
        onSubmit={() => {
          newGame(id);
          onClose();
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            newGame(id);
            onClose();
          }
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          newGame(id);
          onClose();
        }}
        color="primary"
      >
        Load Game
      </Button>
    </DialogActions>
  </Dialog>
);

export default withState("id", "setId", undefined)(SettingsDialog);

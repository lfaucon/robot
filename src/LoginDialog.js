import * as React from "react";
import { compose, withState } from "recompose";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const SettingsDialog = ({ open, setName, name, loggedIn }) => (
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Choose a name to play</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        label="Name"
        type="string"
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          if (name.length > 2) {
            window.localStorage.setItem("login", name);
            loggedIn();
          } else {
            alert("Your name should be at least three letters");
          }
        }}
        color="primary"
      >
        LOG IN
      </Button>
    </DialogActions>
  </Dialog>
);

export default withState("name", "setName", "")(SettingsDialog);

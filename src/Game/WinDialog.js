import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const WinDialog = ({ open, onClose, newGame, restartGame }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Congratulation</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You solved the puzzle. Did you use the minimum number of moves?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => restartGame()} color="primary">
        Try Again
      </Button>
      <Button onClick={() => newGame()} color="primary">
        New Puzzle
      </Button>
    </DialogActions>
  </Dialog>
);

export default WinDialog;

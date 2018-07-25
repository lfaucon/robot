import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const newGame = history => {
  history.push(Math.floor(Math.random() * 0x1000000).toString(16));
};

const restartGame = history => {
  history.push();
};

const WinDialog = ({ open, onClose, moves, history }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Congratulation</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You solved the puzzle with <b>{moves} moves</b>. Can you do it with
        less?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => restartGame(history)} color="primary">
        Try Again
      </Button>
      <Button onClick={() => newGame(history)} color="primary">
        New Puzzle
      </Button>
    </DialogActions>
  </Dialog>
);

export default WinDialog;

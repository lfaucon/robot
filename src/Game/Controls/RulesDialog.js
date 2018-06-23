import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const RulesDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Rules</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You must move the robots in order to bring the robot of the
        corresponding color to the target cell marked with a cross. When a robot
        moves, it goes as far as possible in the selected direction until
        reaching a block, another robot or the border of the game.
      </DialogContentText>
    </DialogContent>
    <DialogTitle id="alert-dialog-title">Controls</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Arrows - move the selected robot
      </DialogContentText>
      <DialogContentText id="alert-dialog-description">
        R,G,B,Y - Respectively select Red, Green, Blue or Yellow robot
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Got it!
      </Button>
    </DialogActions>
  </Dialog>
);

export default RulesDialog;

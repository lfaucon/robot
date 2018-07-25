import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const RulesDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Rules</DialogTitle>
    <DialogContent>
      <DialogContentText>
        You must move the robots in order to bring the robot of the
        corresponding color to the target cell marked with a cross. When a robot
        moves, it goes as far as possible in the selected direction until
        reaching a block, another robot or the border of the game.
      </DialogContentText>
    </DialogContent>
    <DialogTitle>Controls (Computer)</DialogTitle>
    <DialogContent>
      <DialogContentText>Arrows - Move the selected robot</DialogContentText>
      <DialogContentText>
        R,G,B,Y - Select Red, Green, Blue or Yellow robot
      </DialogContentText>
    </DialogContent>
    <DialogTitle>Controls (Mobile)</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Tap robots to select them and swipe in any direction to move the
        selected robot.
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

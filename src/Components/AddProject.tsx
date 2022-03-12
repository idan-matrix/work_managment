import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { supabase } from "Api";
import { IProject } from "./Projects";

export default function AddProject(props: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const [projectName, setProjectName] = React.useState<string>("");
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectName(e.target.value);
  };

  const handleAgree = async () => {
    const { data, error } = await supabase.from<IProject>("Projects").insert({
      name: projectName,
    });
    if (!error) {
    }
  };
  return (
    <Dialog
      open={props.isOpen}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add project</DialogTitle>
      <DialogContent>
        <TextField
          label="Project name"
          value={projectName}
          onChange={onChangeHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Disagree</Button>
        <Button onClick={handleAgree}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { IEmployee, supabase } from "Api";

export function AddEmployee(props: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const [employeesName, setEmployeesName] = React.useState<string>("");
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmployeesName(e.target.value);
  };

  const handleAgree = async () => {
    const { data, error } = await supabase.from<IEmployee>("Employees").insert({
      name: employeesName,
    });
    if (!error) {
      props.handleClose();
    }
  };
  return (
    <Dialog
      open={props.isOpen}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add employee</DialogTitle>
      <DialogContent>
        <TextField
          label="Employee name"
          value={employeesName}
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

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { SchedulerContext } from "Components/SchedulerContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Loader } from "Components/Loader";
interface ISettingsDialog {
  isOpen: boolean;
  handleClose: () => void;
}
export const SettingsDialog = (props: ISettingsDialog) => {
  const [employeesName, setEmployeesName] = useState<string>("");
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmployeesName(e.target.value);
  };

  const {
    employees,
    removeEmployee,
    addEmployee,
    addEmployeeLoading,
    removeEmployeeLoading,
  } = useContext(SchedulerContext);

  const addEmployeeHandler = async () => {
    if (!addEmployeeLoading && !removeEmployeeLoading && employeesName) {
      await addEmployee({
        name: employeesName,
      });
      setEmployeesName("");
    }
  };

  const pressingEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      addEmployeeHandler();
    }
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.isOpen}
      onClose={props.handleClose}
    >
      <DialogTitle>
        Settings
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ position: "relative" }}>
        {(addEmployeeLoading || removeEmployeeLoading) && <Loader />}
        <Grid mt={2} container alignItems="center">
          <TextField
            onKeyPress={pressingEnter}
            label="Add employee"
            placeholder="employee's name"
            onChange={onChangeHandler}
            value={employeesName}
          />
          <IconButton onClick={addEmployeeHandler}>
            <AddIcon />
          </IconButton>
        </Grid>
        <List>
          {employees.map((employee, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  onClick={() => removeEmployee(employee)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={employee.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

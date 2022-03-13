import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { SchedulerContext } from "Components/SchedulerContext";
import DeleteIcon from "@mui/icons-material/Delete";
interface ISettingsDialog {
  isOpen: boolean;
  handleClose: () => void;
}
export const SettingsDialog = (props: ISettingsDialog) => {
  const { employees, removeEmployee } = useContext(SchedulerContext);
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.isOpen}
      onClose={props.handleClose}
    >
      <DialogTitle>
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
      <DialogContent>
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

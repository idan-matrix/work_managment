import { Button, Grid, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import {
  BusinessDays,
  EmployeesComponent,
  SchedulerContext,
  AddEmployee,
  SettingsDialog,
} from "Components";
import SettingsIcon from "@mui/icons-material/Settings";
export const Scheduler = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [settingsDialog, setSettingsDialog] = useState<boolean>(false);
  const { weekType, setWeekType, employees } = useContext(SchedulerContext);
  const weekStateHandler = () => {
    if (weekType === "curr") {
      setWeekType("next");
    } else {
      setWeekType("curr");
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleSettingsClose = () => {
    setSettingsDialog(false);
  };

  const openSettingsDialog = () => {
    setSettingsDialog(true);
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <AddEmployee isOpen={isOpen} handleClose={handleClose} />
      <SettingsDialog
        isOpen={settingsDialog}
        handleClose={handleSettingsClose}
      />
      <Grid container>
        <Button onClick={weekStateHandler} variant="contained">
          {weekType === "curr" ? "next week" : "curr week"}
        </Button>
        <IconButton onClick={openSettingsDialog}>
          <SettingsIcon />
        </IconButton>
        <Button onClick={handleOpen} variant="contained">
          Add employee
        </Button>
      </Grid>
      <BusinessDays />
      <EmployeesComponent />
    </div>
  );
};

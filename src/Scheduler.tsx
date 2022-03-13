import { Avatar, AvatarGroup, Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import {
  BusinessDays,
  EmployeesComponent,
  SchedulerContext,
  AddEmployee,
} from "Components";
export const Scheduler = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <AddEmployee isOpen={isOpen} handleClose={handleClose} />
      <Grid container>
        <Button onClick={weekStateHandler} variant="contained">
          {weekType === "curr" ? "next week" : "curr week"}
        </Button>
        <AvatarGroup max={4} total={employees.length}>
          {employees.map((employee) => (
            <Avatar alt={employee.name}>{employee.name[0]}</Avatar>
          ))}
        </AvatarGroup>
        <Button onClick={handleOpen} variant="contained">
          Add employee
        </Button>
      </Grid>
      <BusinessDays />
      <EmployeesComponent />
    </div>
  );
};

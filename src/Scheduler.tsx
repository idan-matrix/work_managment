import { Avatar, AvatarGroup, Button, Grid } from "@mui/material";
import { useContext } from "react";
import { BusinessDays, EmployeesComponent, SchedulerContext } from "Components";

export const Scheduler = () => {
  const { weekType, setWeekType, employees } = useContext(SchedulerContext);
  const weekStateHandler = () => {
    if (weekType === "curr") {
      setWeekType("next");
    } else {
      setWeekType("curr");
    }
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Grid container>
        <Button onClick={weekStateHandler} variant="contained">
          {weekType === "curr" ? "next week" : "curr week"}
        </Button>
        <AvatarGroup max={4} total={employees.length}>
          {employees.map((employee) => (
            <Avatar alt={employee.name}>{employee.name[0]}</Avatar>
          ))}
        </AvatarGroup>
        <Button variant="contained">Add employee</Button>
      </Grid>
      <BusinessDays />
      <EmployeesComponent />
    </div>
  );
};

import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { dateId } from "Utils/dateId";
import { Cell } from "./Cell";
import { SchedulerContext } from "./SchedulerContext";

export const EmployeesComponent = () => {
  const { employees, weekDays } = useContext(SchedulerContext);
  return (
    <>
      {employees.map((employee, index) => (
        <Grid container key={index}>
          <Grid
            xs={2}
            item
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: "bold" }}>{employee.name}</Typography>
          </Grid>

          {weekDays.map((date) => (
            <Grid key={dateId(date)} xs={2}>
              <Cell employeeName={employee.name} dateId={dateId(date)} />
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
};

import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { dateId } from "Utils/dateId";
import { Cell } from "./Cell";
import { SchedulerContext } from "./SchedulerContext";

export const EmployeesComponent = () => {
  const { employees, tasks, weekDays } = useContext(SchedulerContext);
  return (
    <>
      {employees.map((data, index) => (
        <Grid container key={index}>
          <Grid
            xs={2}
            item
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: "bold" }}>{data.name}</Typography>
          </Grid>

          {weekDays.map((date) => (
            <Grid key={dateId(date)} xs={2}>
              <Cell
                dateId={dateId(date)}
                label={tasks.find((task) => dateId(date) === task.date)?.name}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
};

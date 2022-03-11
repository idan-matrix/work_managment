import { Grid, Typography } from "@mui/material";
import { Cell } from "./Cell";

interface IEmployee {
  employees: string[];
  tasks: Date[];
}
export const Employees = ({ employees, tasks }: IEmployee) => {
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
            <Typography sx={{ fontWeight: "bold" }}>{data}</Typography>
          </Grid>

          {tasks.map((date, index) => (
            <Grid key={index} xs={2}>
              <Cell>{index}</Cell>
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
};

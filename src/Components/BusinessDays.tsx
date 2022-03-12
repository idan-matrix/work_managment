import { Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { useContext } from "react";
import { SchedulerContext } from "./SchedulerContext";

export const BusinessDays = () => {
  const { weekDays } = useContext(SchedulerContext);
  return (
    <Grid container>
      <Grid item xs={2}></Grid>
      {weekDays.map((date, index) => (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item
          key={index}
          xs={2}
          sx={{
            padding: "8px",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {format(date, "dd/MM")}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

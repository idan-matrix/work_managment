import { Grid, Paper, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import { TYPES } from "./Types";

export const Project = (props: { label: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: TYPES.TASK,
    item: {
      label: props.label,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging }),
  }));
  return (
    <Paper ref={drag} sx={{ minWidth: "90px", minHeight: "90px" }}>
      <Grid
        sx={{ height: "100%" }}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Typography>{props.label}</Typography>
      </Grid>
    </Paper>
  );
};

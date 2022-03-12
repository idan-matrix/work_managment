import { Grid, Paper, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import { TYPES } from "../Types";

export const Project = (props: { label: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: TYPES.TASK,
    item: {
      label: props.label,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging }),
  }));
  return (
    <Paper
      elevation={5}
      ref={drag}
      sx={{
        minWidth: "90px",
        minHeight: "90px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{props.label}</Typography>
    </Paper>
  );
};

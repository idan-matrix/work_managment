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
      ref={drag}
      sx={{
        width: "70px",
        minHeight: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Typography>{props.label}</Typography>
    </Paper>
  );
};

import { Grid, Typography } from "@mui/material";
import { supabase } from "Api";
import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import { TYPES } from "../Types";
import { SchedulerContext } from "./SchedulerContext";
interface ICell {
  dateId: string;
  employeeName: string;
}
export const Cell: FC<ICell> = (props) => {
  const { addTask, tasks, removeTask } = useContext(SchedulerContext);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: TYPES.TASK,
    drop: (item: { label: string }, monitor) => {
      addTask({
        date: props.dateId,
        employee: props.employeeName,
        name: item.label,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getCellData = () => {
    const task = tasks.find(
      (task) =>
        props.dateId === task.date && task.employee === props.employeeName
    );
    if (task) {
      return task.name;
    }
    return "";
  };
  const deleteHandler = async () => {
    const task = tasks.find(
      (task) =>
        props.dateId === task.date && task.employee === props.employeeName
    );
    if (task) {
      await removeTask(task);
    }
  };
  return (
    <Grid
      onClick={deleteHandler}
      ref={drop}
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "relative",
        border: "1px solid black",
        minHeight: "100px",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{getCellData()}</Typography>
      {getCellData() && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "green",
          }}
        />
      )}
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </Grid>
  );
};

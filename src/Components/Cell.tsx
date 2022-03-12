import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { TYPES } from "../Types";
interface ICell {
  dateId: string;
  label?: string;
}
export const Cell: FC<ICell> = (props) => {
  const [cell, setCell] = useState("");
  const [{ isOver }, drop] = useDrop(() => ({
    accept: TYPES.TASK,
    drop: (item: { label: string }, monitor) => {
      setCell(item.label);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    setCell(props.label || "");
  }, [props.label]);

  return (
    <Grid
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
      {props.children}
      {cell}
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

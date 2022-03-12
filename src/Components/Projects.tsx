import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Project } from "./Project";

export const Projects = () => {
  const [search, setSearch] = useState<string>("");
  const projects = [
    "asd1",
    "asd2",
    "asd3",
    "asd",
    "asd",
    "asd",
    "asd",
    "asd",
    "asd",
  ];
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <TextField
        onChange={onChangeHandler}
        label="search"
        sx={{ position: "sticky" }}
      />

      <Stack
        spacing={1}
        sx={{
          width: "100%",
          maxHeight: "90vh",
          overflowY: "scroll",
          margin: "0 8px",
        }}
      >
        {projects
          .filter((data) => data.includes(search))
          .map((data, index) => (
            <Project key={index} label={data} />
          ))}
      </Stack>
    </>
  );
};

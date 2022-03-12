import { Button, Stack, TextField } from "@mui/material";
import { supabase } from "Api";
import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import { Project } from "./Project";
export interface IProject {
  name: string;
}
export const Projects = () => {
  const [search, setSearch] = useState<string>("");
  const [projects, setProjects] = useState<IProject[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };
  const initProjects = async () => {
    const { data, error } = await supabase
      .from<IProject>("Projects")
      .select("*");
    if (!error) {
      setProjects(data);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };
  useEffect(() => {
    initProjects();
  }, []);
  return (
    <>
      <AddProject handleClose={handleClose} isOpen={open} />
      <TextField
        onChange={onChangeHandler}
        label="search"
        sx={{ position: "sticky" }}
      />
      <Button variant="contained" onClick={openDialog}>
        Add project
      </Button>
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
          .filter((project) => project.name.includes(search))
          .map((project, index) => (
            <Project key={index} label={project.name} />
          ))}
      </Stack>
    </>
  );
};

import { Button, Stack, TextField } from "@mui/material";
import { supabase } from "Api";
import { useEffect, useState } from "react";
import { Project } from "./Project";
export interface IProject {
  id: number;
  name: string;
}
export const Projects = () => {
  const [search, setSearch] = useState<string>("");
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };
  const initProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from<IProject>("Projects")
      .select("*");
    if (!error) {
      setProjects(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    initProjects();
  }, []);

  const renderProjects = () => {
    return projects
      .filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((project, index) => <Project key={index} label={project.name} />);
  };
  const addProject = async () => {
    const { data, error } = await supabase.from<IProject>("Projects").insert({
      name: search,
    });
    if (!error) {
      setProjects((prevProjects) => {
        const clonePrevProjects = [...prevProjects];
        clonePrevProjects.push(data[0]);
        return clonePrevProjects;
      });
    }
  };
  const renderedProjects = renderProjects();

  const pressingEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      if (!renderedProjects.length && search) {
        await addProject();
      }
    }
  };
  return (
    <>
      <TextField
        onChange={onChangeHandler}
        label="search"
        onKeyPress={pressingEnter}
        sx={{ position: "sticky" }}
      />
      <Stack
        alignItems="center"
        spacing={1}
        sx={{
          width: "100%",
          maxHeight: "90vh",
          overflowY: "scroll",
          margin: "0 8px",
        }}
      >
        {renderedProjects.length ? (
          renderedProjects
        ) : (
          <Button onClick={addProject}>Add project</Button>
        )}
      </Stack>
    </>
  );
};

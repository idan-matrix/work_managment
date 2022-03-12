import { Container, Grid } from "@mui/material";
import { DndProvider } from "react-dnd";
import { Projects } from "./Projects";
import { ITask, Scheduler } from "./Scheduler";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SchedulerProvider } from "Components";

function App() {
  const workers = [
    { name: "Idan" },
    { name: "Erez" },
    { name: "Shay" },
    { name: "Lizi" },
  ];
  const tasks: ITask[] = [
    {
      name: "Task1",
      employee: "Idan",
      date: "08/03",
    },
  ];
  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <Grid container>
          <Grid item xs={2}>
            <Projects />
          </Grid>
          <Grid item xs={10}>
            <SchedulerProvider
              tasks={tasks}
              employees={workers}
              weekType="curr"
            >
              <Scheduler />
            </SchedulerProvider>
          </Grid>
        </Grid>
      </DndProvider>
    </Container>
  );
}

export default App;

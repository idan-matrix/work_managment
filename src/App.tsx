import { Container, Grid } from "@mui/material";
import { DndProvider } from "react-dnd";
import { Projects } from "./Components/Projects";
import { Scheduler } from "./Scheduler";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SchedulerProvider } from "Components";

function App() {
  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <Grid container>
          <Grid item xs={2}>
            <Projects />
          </Grid>
          <Grid item xs={10}>
            <SchedulerProvider weekType="curr">
              <Scheduler />
            </SchedulerProvider>
          </Grid>
        </Grid>
      </DndProvider>
    </Container>
  );
}

export default App;

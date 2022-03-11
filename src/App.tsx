import { Container, Grid } from "@mui/material";
import { DndProvider } from "react-dnd";
import { Projects } from "./Projects";
import { Scheduler } from "./Scheduler";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <Grid container>
          <Grid item xs={2}>
            <Projects />
          </Grid>
          <Grid item xs={10}>
            <Scheduler />
          </Grid>
        </Grid>
      </DndProvider>
    </Container>
  );
}

export default App;

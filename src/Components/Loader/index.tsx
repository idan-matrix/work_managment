import { CircularProgress, Grid } from "@mui/material";
export const Loader = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

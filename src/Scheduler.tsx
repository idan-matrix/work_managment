import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BusinessDays, EmployeesComponent, SchedulerContext } from "Components";

export const Scheduler = () => {
  const { weekType, setWeekType } = useContext(SchedulerContext);
  const weekStateHandler = () => {
    if (weekType === "curr") {
      setWeekType("next");
    } else {
      setWeekType("curr");
    }
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Button onClick={weekStateHandler} variant="contained">
        {weekType === "curr" ? "next week" : "curr week"}
      </Button>

      <BusinessDays />
      <EmployeesComponent />
    </div>
  );
};

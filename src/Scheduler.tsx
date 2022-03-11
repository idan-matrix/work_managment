import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getWeekDays, WeekType } from "Utils";
import { BusinessDays, Employees } from "Components";
export const Scheduler = () => {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [weekType, setWeekType] = useState<WeekType>("curr");
  useEffect(() => {
    const businessDays = getWeekDays(weekType);
    setWeekDays(businessDays);
  }, [weekType]);

  const weekStateHandler = () => {
    setWeekType((prevState) => {
      if (prevState === "curr") {
        return "next";
      }
      return "curr";
    });
  };
  const workers = ["Idan", "Erez", "Shay", "Lizi"];
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Button onClick={weekStateHandler} variant="contained">
        {weekType === "curr" ? "next week" : "curr week"}
      </Button>
      <BusinessDays weekDays={weekDays} />
      <Employees employees={workers} tasks={weekDays} />
    </div>
  );
};

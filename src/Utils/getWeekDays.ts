import {
  startOfWeek,
  endOfWeek,
  subDays,
  eachDayOfInterval,
  addWeeks,
} from "date-fns";
export type WeekType = "curr" | "next";
export const getWeekDays = (type: WeekType) => {
  let date = new Date();
  if (type === "next") {
    date = addWeeks(date, 1);
  }
  const startDayOfWeek = startOfWeek(date);
  const endDayOfWeek = endOfWeek(date);
  const lastWeekDayOfWork = subDays(endDayOfWeek, 2);
  return eachDayOfInterval({
    start: startDayOfWeek,
    end: lastWeekDayOfWork,
  });
};

import { format } from "date-fns";

export const dateId = (date: Date) => {
  return format(date, "dd/MM");
};

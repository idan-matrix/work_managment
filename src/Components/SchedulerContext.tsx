import { IEmployee, ITask, supabase } from "Api";
import { createContext, FC, useEffect, useState } from "react";
import { getWeekDays, WeekType } from "Utils";

interface ISchedulerContext {
  tasks: ITask[];
  employees: IEmployee[];
  weekType: WeekType;
  weekDays: Date[];
  setWeekType: (type: WeekType) => void;
  addEmployee: (employee: IEmployee) => void;
  removeEmployee: (employee: IEmployee) => void;
  addTask: (task: ITask) => void;
  removeTask: (task: ITask) => void;
}
export const SchedulerContext = createContext<ISchedulerContext>({
  employees: [],
  tasks: [],
  weekType: "curr",
  weekDays: [],
  setWeekType: () => {},
  addEmployee: () => {},
  addTask: () => {},
  removeEmployee: () => {},
  removeTask: () => {},
});

interface ISchedulerProvider {
  weekType: WeekType;
}
export const SchedulerProvider: FC<ISchedulerProvider> = (props) => {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [weekType, setWeekType] = useState<WeekType>(props.weekType || "curr");
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const initDays = () => {
    const businessDays = getWeekDays(weekType);
    setWeekDays(businessDays);
  };
  useEffect(() => {
    initDays();
  }, [weekType, props.weekType]);
  const initEmployees = async () => {
    const { data: Employees, error } = await supabase
      .from<IEmployee>("Employees")
      .select("*");
    if (!error) {
      setEmployees(Employees);
    }
  };
  const initTasks = async () => {
    const { data: Tasks, error } = await supabase
      .from<ITask>("Tasks")
      .select("*");
    if (!error) {
      setTasks(Tasks);
    }
  };
  useEffect(() => {
    initEmployees();
    initTasks();
  }, []);

  const addEmployee = async (employee: IEmployee) => {
    const { data, error } = await supabase
      .from<IEmployee>("Employees")
      .insert(employee);
    if (!error) {
      const cloneEmployee = [...employees];
      cloneEmployee.push(employee);
      setEmployees(cloneEmployee);
    }
  };

  const removeEmployee = (removeEmployee: IEmployee) => {
    const cloneEmployee = [...employees];
    cloneEmployee.filter((employee) => employee.name !== removeEmployee.name);
    setEmployees(cloneEmployee);
  };
  const addTask = (task: ITask) => {
    setTasks((prevTasks) => {
      const clonePrevTasks = [...prevTasks];
      clonePrevTasks.push(task);
      return clonePrevTasks;
    });
  };

  const removeTask = (removeTask: ITask) => {
    const cloneTasks = [...tasks];
    cloneTasks.filter((task) => task.date !== removeTask.date);
    setTasks(cloneTasks);
  };

  return (
    <SchedulerContext.Provider
      value={{
        weekDays,
        weekType,
        employees,
        tasks,
        setWeekType,
        addEmployee,
        removeEmployee,
        addTask,
        removeTask,
      }}
    >
      {props.children}
    </SchedulerContext.Provider>
  );
};

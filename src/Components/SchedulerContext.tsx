import { IEmployee, ITask, supabase } from "Api";
import { createContext, FC, useEffect, useState } from "react";
import { getWeekDays, WeekType } from "Utils";

interface ISchedulerContext {
  tasks: ITask[];
  employees: IEmployee[];
  weekType: WeekType;
  weekDays: Date[];
  setWeekType: (type: WeekType) => void;
  addEmployee: (employee: Omit<IEmployee, "id">) => void;
  removeEmployee: (employee: IEmployee) => void;
  addTask: (task: Omit<ITask, "id">) => void;
  removeTask: (task: ITask) => void;
  addEmployeeLoading: boolean;
  removeEmployeeLoading: boolean;
  addTaskLoading: boolean;
  removeTaskLoading: boolean;
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
  addEmployeeLoading: false,
  removeEmployeeLoading: false,
  addTaskLoading: false,
  removeTaskLoading: false,
});

interface ISchedulerProvider {
  weekType: WeekType;
}
export const SchedulerProvider: FC<ISchedulerProvider> = (props) => {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [weekType, setWeekType] = useState<WeekType>(props.weekType || "curr");
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [addEmployeeLoading, setAddEmployeeLoading] = useState<boolean>(false);
  const [removeEmployeeLoading, setRemoveEmployeeLoading] =
    useState<boolean>(false);
  const [addTaskLoading, setAddTaskLoading] = useState<boolean>(false);
  const [removeTaskLoading, setRemoveTaskLoading] = useState<boolean>(false);
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

  const addEmployee = async (employee: Omit<IEmployee, "id">) => {
    setAddEmployeeLoading(true);
    const { data, error } = await supabase
      .from<IEmployee>("Employees")
      .insert(employee);
    if (!error) {
      const cloneEmployee = [...employees];
      cloneEmployee.push(data[0]);
      setEmployees(cloneEmployee);
    }
    setAddEmployeeLoading(false);
  };

  const removeEmployee = async (removeEmployee: IEmployee) => {
    setRemoveEmployeeLoading(true);
    const { data, error } = await supabase
      .from<IEmployee>("Employees")
      .delete()
      .eq("id", removeEmployee.id);
    if (!error) {
      setEmployees((prevEmployees) => {
        const clonePrevEmployees = [...prevEmployees];
        return clonePrevEmployees.filter(
          (prevEmployee) => prevEmployee.id !== removeEmployee.id
        );
      });
    }
    setRemoveEmployeeLoading(false);
  };
  const addTask = async (task: Omit<ITask, "id">) => {
    setAddTaskLoading(true);
    const { data, error } = await supabase.from<ITask>("Tasks").insert(task);
    if (!error) {
      setTasks((prevTasks) => {
        const clonePrevTasks = [...prevTasks];
        clonePrevTasks.push(data[0]);
        return clonePrevTasks;
      });
    }
    setAddTaskLoading(false);
  };

  const removeTask = async (removeTask: ITask) => {
    setRemoveTaskLoading(true);
    const { data, error } = await supabase
      .from("Tasks")
      .delete()
      .eq("id", removeTask.id);
    if (!error) {
      setTasks((prevTasks) => {
        const clonePrevTasks = [...prevTasks];
        return clonePrevTasks.filter(
          (prevTask) => prevTask.id !== removeTask.id
        );
      });
    }
    setRemoveTaskLoading(false);
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
        addEmployeeLoading,
        addTaskLoading,
        removeEmployeeLoading,
        removeTaskLoading,
      }}
    >
      {props.children}
    </SchedulerContext.Provider>
  );
};

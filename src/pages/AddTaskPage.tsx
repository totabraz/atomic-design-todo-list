import React, { useState } from "react";
import { CheckCardContentProps } from "../components/molecules/CheckCard";
import TAddTask from "../components/templates/TAddTask";

export default function AddTaskPage() {
  const [tasks, setTasks] = useState<Array<CheckCardContentProps>>([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = (newTask?: string) => {
    const position = tasks.length + 1;
    if (newTask) {
      setTasks((prev) => [
        ...prev,
        { title: newTask, isDone: false, position },
      ]);
      setInputValue("");
    }
  };

  const toggleTaskStatus = (taskPosition?: number, isDone?: boolean) => {
    if (taskPosition) {
      const index = Number(taskPosition) - 1;
      setTasks((prev) => {
        const updState = [...prev];
        const checkIsDone =
          isDone === undefined ? !updState[index].isDone : isDone;
        updState[index] = { ...updState[index], isDone: checkIsDone };
        return updState;
      });
    }
  };

  return (
    <TAddTask
      inputValue={inputValue}
      data={tasks}
      setInputValue={setInputValue}
      addTask={addTask}
      toggleTaskStatus={toggleTaskStatus}
    />
  );
}

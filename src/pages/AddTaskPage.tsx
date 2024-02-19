import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TAddTask from "../components/templates/TAddTask";
import { CardContentProps } from "../components/molecules/Card";

export default function AddTaskPage() {
  const [tasks, setTasks] = useState<Array<CardContentProps>>([]);
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

  const toggleTaskStatus = (taskPosition?: number) => {
    if (taskPosition) {
      const index = Number(taskPosition) - 1;
      const updState = [...tasks];
      updState[index] = { ...updState[index], isDone: !updState[index].isDone };
      setTasks(updState);
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

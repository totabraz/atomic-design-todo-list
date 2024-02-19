import React from "react";
import { StyleSheet, View } from "react-native";
import { SPACES } from "../../constants/sizes";
import { CardContentProps } from "../molecules/Card";
import InputTask from "../molecules/InputTask";
import TaskList from "../organisms/TaskList";

type TAddTaskProps = {
  data: Array<CardContentProps>;
  inputValue: string | undefined;
  setInputValue: (t: string) => void;
  addTask: (t?: string) => void;
  toggleTaskStatus: (i?: number) => void;
};

export default function TAddTask({
  data,
  inputValue,
  setInputValue,
  addTask,
  toggleTaskStatus,
}: TAddTaskProps) {
  const activeTasks: Array<CardContentProps> = [];
  const completedTasks: Array<CardContentProps> = [];

  data?.forEach((item) => {
    item?.isDone ? completedTasks.push(item) : activeTasks.push(item);
  });
  return (
    <View style={styles.container}>
      <InputTask
        value={inputValue}
        onChangeText={setInputValue}
        addTask={addTask}
      />
      <View style={{ marginBottom: SPACES.MD, maxHeight: 500 }}>
        <TaskList data={data} toggleTaskStatus={toggleTaskStatus} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

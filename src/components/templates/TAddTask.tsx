import React from "react";
import { StyleSheet, View } from "react-native";
import { SPACES } from "../../constants/sizes";
import { CheckCardContentProps } from "../molecules/CheckCard";
import InputTask from "../molecules/InputTask";
import TaskList from "../organisms/TaskList";

type TAddTaskProps = {
  data: Array<CheckCardContentProps>;
  inputValue: string | undefined;
  setInputValue: (t: string) => void;
  addTask: (t?: string) => void;
  toggleTaskStatus: (i?: number, isDone?: boolean) => void;
};

export default function TAddTask({
  data,
  inputValue,
  setInputValue,
  addTask,
  toggleTaskStatus,
}: TAddTaskProps) {

  return (
    <View style={styles.container}>
      <InputTask
        value={inputValue}
        onChangeText={setInputValue}
        addTask={addTask}
      />
      <View style={{ marginBottom: SPACES.MD }}>
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

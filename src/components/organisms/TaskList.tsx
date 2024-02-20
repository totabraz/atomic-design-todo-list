import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card, { CheckCardContentProps } from "../molecules/CheckCard";

type TaskListProps = {
  data: Array<CheckCardContentProps>;
  toggleTaskStatus: (i?: number, isDone?: boolean) => void;
};

export default function TaskList({ data, toggleTaskStatus }: TaskListProps) {
  const [isScrollEnabled, setScrollEnable] = useState(true);

  const helperToggleStatus = (position?: number, isDone?: boolean) => {
    if (isDone === undefined) toggleTaskStatus(position);
    else toggleTaskStatus(position, isDone);
  };

  const handleScrollStatus = () => {
    setScrollEnable((isEnable) => !isEnable);
  };

  return (
    <View>
      <FlatList
        data={data}
        scrollEventThrottle={1}
        scrollEnabled={isScrollEnabled}
        renderItem={({ item }) => {
          const { title, isDone, position } = item;
          return (
            <Card
              title={title}
              isDone={isDone}
              position={position}
              handleScrollStatus={() => handleScrollStatus()}
              toggleTaskStatus={() => helperToggleStatus(position)}
              onSwipeLeft={() => helperToggleStatus(position, false)}
              onSwipeRight={() => helperToggleStatus(position, true)}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

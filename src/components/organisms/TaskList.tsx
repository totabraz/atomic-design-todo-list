import { FlatList, FlatListProps, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card, { CardContentProps } from "../molecules/Card";
import TouchableButton from "../atoms/TouchableButton";
import AnimationSwipe from "../atoms/AnimationSwipe";

type TaskListProps = {
  data: Array<CardContentProps>;
  toggleTaskStatus: (i?: number) => void;
};

export default function TaskList({ data, toggleTaskStatus }: TaskListProps) {
  const helperToggleStatus = (position?: number) => {
    toggleTaskStatus(position);
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const { title, isDone, position } = item;
          return (
            <AnimationSwipe
              onCompleteFunction={() => helperToggleStatus(position)}
            >
              <Card
                title={title}
                isDone={isDone}
                position={position}
                toggleTaskStatus={() => helperToggleStatus(position)}
              />
            </AnimationSwipe>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

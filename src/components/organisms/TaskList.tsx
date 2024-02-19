import { FlatList, FlatListProps, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card, { CardContentProps } from "../molecules/Card";
import TouchableButton from "../atoms/TouchableButton";

type TaskListProps = {
  data: Array<CardContentProps>;
  toggleTaskStatus: (i?: number) => void;
};

export default function TaskList({ data, toggleTaskStatus }: TaskListProps) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const { title, isDone, position } = item;
          return (
            <Card
              title={title}
              isDone={isDone}
              position={position}
              toggleTaskStatus={toggleTaskStatus}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

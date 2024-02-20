import { FlatList, FlatListProps, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card, { CardContentProps } from "../molecules/Card";
import TouchableButton from "../atoms/TouchableButton";
import AnimationSwipe from "../atoms/AnimationSwipe";

type TaskListProps = {
  data: Array<CardContentProps>;
  toggleTaskStatus: (i?: number, isDone?: boolean) => void;
};

export default function TaskList({ data, toggleTaskStatus }: TaskListProps) {
  const [isScrollEnabled, setScrollEnable] = useState(true);

  const helperToggleStatus = (position?: number, isDone?: boolean) => {
    toggleTaskStatus(position, isDone);
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
            <AnimationSwipe
              key={position}
              toggleOnAnimation={handleScrollStatus}
              onSwipeLeft={() => {
                helperToggleStatus(position, true);
              }}
              onSwipeRight={() => {
                helperToggleStatus(position, false);
              }}
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

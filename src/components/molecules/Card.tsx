import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../atoms/Text";
import { SPACES } from "../../constants/sizes";
import Checkbox from "expo-checkbox";


export type CardContentProps = {
  position?: number;
  title?: string;
  isDone?: boolean;
};
export type CardProps = CardContentProps & { toggleTaskStatus: (i?: number) => void };

export default function Card({
  title,
  isDone,
  position,
  toggleTaskStatus,
}: CardProps) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={isDone}
        onValueChange={() => toggleTaskStatus()}
      />
      <Text text={title} style={[styles.title, isDone ? styles.isDone : {}]} />
      <Text text={`#${position}`} style={styles.position} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SPACES.SM,
    paddingVertical: SPACES.XS,
    marginBottom: SPACES.XL,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d5d5d5",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  position: {
    fontSize: 16,
    paddingHorizontal: 5,
    color: "#555555",
  },
  title: {
    flex: 1,
    paddingHorizontal: SPACES.SM,
    paddingVertical: SPACES.XS,
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    color: "#d5d5d5",
  },
  isDone: {
    color: "#a3a3a3",
    textDecorationColor: "#000",
    textDecorationLine: "line-through",
  },
});

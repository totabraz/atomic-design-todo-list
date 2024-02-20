import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "../atoms/Text";
import { SPACES } from "../../constants/sizes";
import Checkbox from "expo-checkbox";
import AnimationSwipe from "../atoms/AnimationSwipe";

export type CheckCardContentProps = {
  position?: number;
  title?: string;
  isDone?: boolean;
};

type CheckCardProps = CheckCardContentProps & {
  handleScrollStatus?: () => void;
  toggleTaskStatus: (i?: number) => void;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
};

export default function Card({
  title,
  isDone,
  position,
  toggleTaskStatus,
  handleScrollStatus,
  onSwipeRight,
  onSwipeLeft,
}: CheckCardProps) {
  const [directionToRight, setDirectionToRight] = useState(false);
  return (
    <View style={styles.container}>
      <View style={[styles.behind]}>
        <Checkbox value={true} />
        <Checkbox value={false} />
      </View>
      <View style={[]}>
        <AnimationSwipe
          key={position}
          handleScrollStatus={handleScrollStatus}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        >
          <View style={styles.cardContainer}>
            <Checkbox value={isDone} onValueChange={() => toggleTaskStatus()} />
            <Text
              text={title}
              style={[styles.title, isDone ? styles.isDone : {}]}
            />
            <Text text={`#${position}`} style={styles.position} />
          </View>
        </AnimationSwipe>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: { color: "#d5d5d5" },
  isDone: {
    color: "#a3a3a3",
    textDecorationColor: "#000",
    textDecorationLine: "line-through",
  },
  title: {
    flex: 1,
    paddingHorizontal: SPACES.SM,
    paddingVertical: SPACES.XS,
    fontSize: 16,
    fontWeight: "bold",
  },
  position: { fontSize: 16, paddingHorizontal: 5, color: "#555555" },
  cardContainer: {
    paddingHorizontal: SPACES.SM,
    paddingVertical: SPACES.XS,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d5d5d5",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    zIndex: 2,
    backgroundColor: "white",
  },
  behind: {
    opacity: 0.2,
    borderColor: "transparent",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: SPACES.SM + 5,
    paddingVertical: SPACES.XS + 5,
    top: 0,
    zIndex: -1,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    position: "absolute",
  },
  container: {
    position: "relative",
    marginBottom: SPACES.XL,
  },
});

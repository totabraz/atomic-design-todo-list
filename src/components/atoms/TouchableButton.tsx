import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";
import Text from "./Text";
import { SPACES } from "../../constants/sizes";

type TouchableButtonProps = TouchableHighlightProps & {
  text?: string;
  textStyle?: TextStyle;
};

export default function TouchableButton({
  text,
  textStyle,
  ...props
}: TouchableButtonProps) {
  return (
    <TouchableHighlight {...props}>
      <Text text={text} style={[textStyle, styles.textButton]} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  textButton: {
    textTransform: "uppercase",
    textAlign: "center",
    paddingHorizontal: SPACES.XS,
  },
});

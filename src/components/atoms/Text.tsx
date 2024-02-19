import React from "react";
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from "react-native";

type TextProps = RNTextProps & {
  text: string | undefined;
  bold?: boolean;
};

export default function Text({ style, text, bold, ...props }: TextProps) {
  return text ? (
    <RNText
      style={[styles.text, style, bold ? styles.bold : undefined]}
      {...props}
    >
      {text}
    </RNText>
  ) : null;
}

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
  bold: {
    fontWeight: "bold",
  },
});

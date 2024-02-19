import React from "react";
import { Button as RNButton, ButtonProps, StyleSheet } from "react-native";
import Text from "./Text";
import { SPACES } from "../../constants/sizes";

export default function Button(props: ButtonProps) {
    return <RNButton {...props} />;
}

const styles = StyleSheet.create({
  textButton: {
    paddingHorizontal: SPACES.XS,
  },
});

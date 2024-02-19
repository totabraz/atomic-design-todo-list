import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps

export default function Input({style,...props}: InputProps) {
  return <TextInput {...props} style={[styles.TextInput, style]}  />;
}

const styles = StyleSheet.create({
  TextInput: {
    textAlign: "left",
  },
});

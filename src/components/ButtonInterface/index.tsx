import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";

export interface IBInterface extends TouchableOpacityProps {
  onPressI: () => void;
  title: string;
  type: "primary" | "secondary" | "black" | "white";
}
export function ButtonInterface({
  onPressI,
  title,
  type,
  ...rest
}: IBInterface) {
  return (
    <TouchableOpacity
      style={
        type == "primary"
          ? styles.buttonPrimary
          : type == "secondary"
          ? styles.buttonSecondary
          : type == "black"
          ? styles.buttonBlack
          : styles.buttonWhite
      }
      onPress={onPressI}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

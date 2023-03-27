import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export interface ITextMarker {
    text: string
}
export function ListMarker({ text }: ITextMarker) {
    return (
        <View>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}
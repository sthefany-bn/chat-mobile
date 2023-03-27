import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export interface ITextMarker {
    textMarker: string
}
export function ListMarker({ textMarker }: ITextMarker) {
    return (
        <View>
            <Text style={styles.textMarker}>{textMarker}</Text>
        </View>
    )
}
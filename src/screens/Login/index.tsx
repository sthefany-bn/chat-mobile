import React from "react"
import { View, KeyboardAvoidingView,Text, TextInput } from "react-native"
import {MaterialIcons } from "@expo/vector-icons"
import { styles } from "./styles"
import { colors } from "../../styles/colors"

export function Login() {
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}>Entrar</Text>
                <Text style={styles.textp}>E-mail</Text>
                <View style={styles.formRow}>
                    <TextInput
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
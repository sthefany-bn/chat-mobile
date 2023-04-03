import React from "react"
import { View, KeyboardAvoidingView,Text, TextInput } from "react-native"
import { styles } from "./styles"

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
                <Text style={styles.textp}>Senha</Text>
                <View style={styles.formRow}>
                    <TextInput
                        keyboardType="visible-password"
                        style={styles.input}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
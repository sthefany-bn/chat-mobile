import React from "react"
import { View, KeyboardAvoidingView,Text, TextInput } from "react-native"
import { styles } from "./styles"
import { ComponentButtonInterface } from "../../components"
import { LoginTypes } from "../../navigations/login.navigation"

export function Login({ navigation }: LoginTypes) {
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
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </View>
                <ComponentButtonInterface title="Entrar" type="primary" onPressI={() => { navigation.navigate('Tab') } }/>
                <ComponentButtonInterface title="Cadastrar" type="primary" onPressI={() => { navigation.navigate('Cadastrar') }}/>
            </KeyboardAvoidingView>
        </View>
    )
}
import React from "react"
import { View, KeyboardAvoidingView,Text, TextInput } from "react-native"
import { styles } from "./styles"
import { ComponentButtonInterface } from "../../components"
import { LoginTypes } from "../../navigations/login.navigation"

export function Cadastrar({ navigation }: LoginTypes) {
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}>Cadastro</Text>
                <Text style={styles.textp}>Nome completo</Text>
                <View style={styles.formRow}>
                    <TextInput
                        style={styles.input}
                    />
                </View>
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
                <ComponentButtonInterface title="Cadastrar" type="primary" onPressI={() => {console.log('Entrar')} }/>
                <ComponentButtonInterface title="Voltar" type="primary" onPressI={() => { navigation.navigate('Login') }}/>
            </KeyboardAvoidingView>
        </View>
    )
}
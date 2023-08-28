import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Text, TextInput, Alert } from "react-native";
import { styles } from "./styles";
import { ComponentButtonInterface, ComponentLoading } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation";
import { IRegister } from "../../services/data/User";
import { apiUser } from "../../services/data";
import { AxiosError } from "axios";

export interface IErrorApi {
    errors: {
        rule: string;
        field: string;
        message: string;
    }[];
}

export function Cadastrar({ navigation }: LoginTypes) {
    const [data, setData] = useState<IRegister>();
    const [isLoading, setIsLoading] = useState(true);
    function handleChange(item: IRegister) {
        setData({ ...data, ...item });
    }

    async function handleRegister() {
        try {
            setIsLoading(true)
            if (data?.name && data.email && data.password) {
                const response = await apiUser.register(data)
                Alert.alert(`${response.data.name} cadastrsdo!`)
                navigation.navigate('Login')
            } else {
                Alert.alert("Prencha todos os campos!")
            }
        } catch (error) { 
            const err = error as AxiosError
            const errorData = err.response?.data as IErrorApi
            let message = ""
            if(errorData) {
                for (const iterator of errorData.errors) {
                    message = `${message} ${iterator.message} \n`
                }
            }
            Alert.alert(message)
        } finally {
            setIsLoading
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);
    return (
        <>
            {isLoading ? (
                <ComponentLoading />
            ) : (
                <View style={styles.container}>
                    <KeyboardAvoidingView>
                        <Text style={styles.title}>Cadastro</Text>
                        <Text style={styles.textp}>Nome completo</Text>
                        <View style={styles.formRow}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(i) => handleChange({ name: i })}
                            />
                        </View>
                        <Text style={styles.textp}>E-mail</Text>
                        <View style={styles.formRow}>
                            <TextInput
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                                onChangeText={(i) => handleChange({ email: i })}
                            />
                        </View>
                        <Text style={styles.textp}>Senha</Text>
                        <View style={styles.formRow}>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={(i) => handleChange({ password: i })}
                            />
                        </View>
                        <ComponentButtonInterface
                            title="Cadastrar"
                            type="primary"
                            onPressI={handleRegister}
                        />
                        <ComponentButtonInterface
                            title="Voltar"
                            type="primary"
                            onPressI={() => {
                                navigation.navigate("Login");
                            }}
                        />
                    </KeyboardAvoidingView>
                </View>
            )}
        </>
    );
}

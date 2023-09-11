import React, {useEffect,useState} from "react";
import { View, KeyboardAvoidingView,Text, TextInput, Alert } from "react-native"
import { styles } from "./styles"
import { ComponentButtonInterface } from "../../components"
import { LoginTypes } from "../../navigations/login.navigation"
import { useAuth } from "../../hooks/auth"
import { IAuthenticate } from "../../services/data/User"
import { AxiosError } from "axios"

export interface IErrorApi{
    errors: {
        rule: string
        field: string
        message: string
    }[]
}

export function Login({ navigation }: LoginTypes) {
    const { signIn } = useAuth();
    const [data,  setData] = useState<IAuthenticate>();
    const[isLoading, setIsLoading] = useState(true);
    async function handleSignIn() {
        try {
            setIsLoading(true);
            if (data?.email && data.password) {
                await signIn(data);
            } else {
                Alert.alert("Preencha todos os campos!");
                setIsLoading(false);
            }
        } catch (error) {
            const err = error as AxiosError;
            const message = err.response?.data as string
            Alert.alert(message)
            setIsLoading(false);
        }
    }

    function handleChange(item: IAuthenticate){
        setData({...data, ...item})
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },2000)
    },[])


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
                        onChangeText={(i) => handleChange({email: i})}
                    />
                </View>
                <Text style={styles.textp}>Senha</Text>
                <View style={styles.formRow}>
                    <TextInput
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={(i) => handleChange({password: i})}
                    />
                </View>
                <ComponentButtonInterface title="Entrar" type="primary" onPressI={() => { navigation.navigate('Tab') } }/>
                <ComponentButtonInterface title="Cadastrar" type="primary" onPressI={() => { navigation.navigate('Cadastrar') }}/>
            </KeyboardAvoidingView>
        </View>
    )
}
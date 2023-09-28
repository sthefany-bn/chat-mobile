import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./styles";
import { registerForPushNotificationsAsync } from "../../services/data/Push"
import { ComponentButtonInterface } from "../../components";
import { TabTypes } from "../../navigations/tab.navigation";
import { useAuth } from "../../hooks/auth";
import { AxiosError } from "axios"
import * as Notifications from "expo-notifications"
import { ComponentLoading } from "../../components"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,

    }),
});

export function Perfil({ navigation }: TabTypes) {
    const { user } = useAuth();
    const { signOut } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    async function handleSignOut() {
        try {
            setIsLoading(true);
            await signOut();
        } catch (error) {
            const err = error as AxiosError;
            const message = err.response?.data as string
            Alert.alert(message)
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);
    useEffect(() => {
        async function fetchToken() {
            const token = await registerForPushNotificationsAsync()
            console.log(token)
        }
        fetchToken()
    }, []);

    return (
        <>
            {isLoading ? (
                <ComponentLoading />
            ) : (
                <View style={styles.container}>
                    <Text>Perfil</Text>
                    <ComponentButtonInterface title="Log out" type="alert" onPressI={handleSignOut} />
                </View>
            )}
        </>
    )
}
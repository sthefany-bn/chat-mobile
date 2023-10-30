import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Alert, Platform } from 'react-native'
import Constants from "expo-constants"
import { apiUser } from '../';
import { AxiosError } from 'axios';

export interface IExtra {
    eas: {
        projectId: string
    }
}
export async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
           name: 'default',
           importance: Notifications.AndroidImportance.MAX,
           vibrationPattern: [0, 250, 250, 250],
           lightColor: '#FF231F7C',
        })
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        const extra = Constants.expoConfig?.extra as IExtra
        token = (await Notifications.getExpoPushTokenAsync({
            projectId: extra.eas.projectId,
        }));
        try {
            await apiUser.updateToken(token.data)
        } catch (error) {
            const err = error as AxiosError
            console.log(err.response?.data)
        }
    } else {
        Alert.alert('Você deve usar um dispositivo físico para receber notificações Push')
    }
    return token;
}
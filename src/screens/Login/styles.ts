import { BottomSheetAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import { StyleSheet } from 'react-native';
import { colors  } from '../../styles/colors';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black,
            marginTop: "-50%",
        marginBottom: 15
    },
    textp: {
        fontSize: 20,
        flexDirection: "row",
        alignItems: "center",
        margin: 12,
        marginBottom: 4,
        marginTop: 10
    },
    formRow: {
        borderBottomWidth: 3,
        backgroundColor: colors.gray,
        borderBottomColor: colors.primary,
        borderRadius: 3,
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
        marginTop: 4
    },
    input:{
        fontSize: 18,
        padding: 5,
        width: "85%"
    },
    bottom: {
        backgroundColor: colors.primary
    }
});
import { StyleSheet } from 'react-native';
import { colors  } from '../../styles/colors';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize:50,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black
    },
    textp: {
        fontSize: 20,
        flexDirection: "row",
        alignItems: "center",
        margin: 30,
        marginBottom: 2
    },
    formRow: {
        backgroundColor: colors.gray,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        margin: 30,
        marginTop: 2,
    },
    icon: {
        fontSize: 28,
        color: colors.primary,
        padding: 5
    },
    input:{
        fontSize: 18,
        padding:6,
        width: "70%"
    }
});
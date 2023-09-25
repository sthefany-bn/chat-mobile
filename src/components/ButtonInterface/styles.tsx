import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 5,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    margin: 5,
  },
  buttonBlack: {
    backgroundColor: colors.black,
    borderRadius: 5,
    margin: 5,
  },
  buttonWhite: {
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: 5,
  },
  buttonAlert: {
    backgroundColor: colors.alert,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    color: colors.white,
    padding:10, 
    fontSize: 18,
    textAlign: "center"
  },
  buttonOutro: {
    color: colors.link
  }
});

import { Dimensions, StyleSheet } from 'react-native';
import { colors } from "./../../styles/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
      justifyContent: 'flex-end',
      height: Dimensions.get('window').width,
      width: Dimensions.get('window').width,      
      marginTop: 40,
      marginBottom: 40
    },
    showphoto: {
      flex: 1,
      justifyContent: 'flex-start'
    },
    img: {
      height: Dimensions.get('window').width,
      width: Dimensions.get('window').width,
      marginTop: 5,
      marginBottom: 5
    },
    icons: {
      flexDirection: "row",
      marginBottom: "10%",
      justifyContent: "space-around"
    },
    voltar: {
      marginTop: 8,
      marginBottom: 5
    }
  });
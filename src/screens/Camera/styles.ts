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
    },
    showphoto: {
      flex: 1,
      justifyContent: 'flex-start'
    },
    img: {
      height: Dimensions.get('window').width,
      width: Dimensions.get('window').width
    },
    lado: {
      flexDirection: "row",
      marginBottom: "10%",
      justifyContent: "space-around"
    }
  });
import { TouchableOpacity } from "react-native";
import { styles } from './styles';

export interface IBSlider {
    onPressI: () => void
    page: boolean
}
export function ButtonSlider({ onPressI, page }: IBSlider) {
    return (
        <TouchableOpacity style={page? styles.cor: styles.ball} onPress={onPressI} />
    )
}
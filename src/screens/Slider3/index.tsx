import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App';
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider3({ setPageI }: IPage) {
    const slide3 = require("../../assets/slide3.png")
    const slide3Texts = [
        { id: '1', text: 'O secret chat leva as pessoas a se concentrarem em suas ideias e não em julgamentos baseados em aparências ou preconceitos pessoais. Isso ajuda a criar uma interação mais positiva e construtiva entre os usuários.'},
    ]
    return (
        <ImageBackground source={slide3} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Interação' />
                <FlatList
                    data={slide3Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} textMarker={item.text} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} />
                <ComponentButtonSlider onPressI={() => setPageI(2)} />
                <ComponentButtonSlider onPressI={() => setPageI(3)} />
                <ComponentButtonSlider onPressI={() => setPageI(4)} />
            </View>
        </ImageBackground>
    );
}
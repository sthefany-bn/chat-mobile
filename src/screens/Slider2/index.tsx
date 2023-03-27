import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App';
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider2({ setPageI }: IPage) {
    const slide2 = require("../../assets/slide2.png")
    const slide2Texts = [
        { id: '1', text: 'O aplicativo permite que as pessoas discutam assuntos sem revelar suas identidades, permitindo que elas se sintam mais confortáveis ​​para expressar seus pensamentos e opiniões livremente.'},
    ]
    return (
        <ImageBackground source={slide2} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Anonimato' />
                <FlatList
                    data={slide2Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} text={item.text} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(2)} page={true}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} page={false}/>
            </View>
        </ImageBackground>
    );
}
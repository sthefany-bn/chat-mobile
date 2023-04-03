import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App';
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider1({ setPageI }: IPage) {
    const slide1 = require("../../assets/slide1.png")
    const slide1Texts = [
        { id: '1', text: 'O aplicativo cria uma comunidade onde usuários que compartilham interesses e preocupações semelhantes se conectam e se apoiam para lidar com desafios e problemas em comum.'},
    ]
    return (
        <ImageBackground source={slide1} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Suporte' />
                <FlatList
                    data={slide1Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} text={item.text} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} page={true}/>
                <ComponentButtonSlider onPressI={() => setPageI(2)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(5)} page={false}/>
            </View>
        </ImageBackground>
    );
}
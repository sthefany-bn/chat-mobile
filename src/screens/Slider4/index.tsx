import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App';
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider4({ setPageI }: IPage) {
    const slide4 = require("../../assets/slide4.png")
    const slide4Texts = [
        { id: '1', text: 'Recurso para evitar comportamentos inadequados e garantir que as conversas sejam respeitosas e construtivas.'},
    ]
    return (
        <ImageBackground source={slide4} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Moderação' />
                <FlatList
                    data={slide4Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} text={item.text} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(2)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} page={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} page={true}/>
            </View>
        </ImageBackground>
    );
}
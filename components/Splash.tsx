import { Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../RootStackParamList";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Splash'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

export default function Splash({ navigation }: Props) {

    return (
        <>
            <TouchableOpacity
                style={{ backgroundColor: 'cornflowerblue', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={ () => navigation.navigate('Galery') }
            >
                <Text style={{ color: 'white', fontSize: 72, textAlign: 'center' }}>Camera app</Text>
                <Text style={{ color: 'white', fontSize: 32, textAlign: 'center' }}>desc</Text>
            </TouchableOpacity>
        </>
    )
}
import { Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as MediaLibrary from "expo-media-library";

import { RootStackParamList } from "../RootStackParamList";
import { useEffect } from "react";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Splash'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

export default function Splash({ navigation }: Props) {

    const test = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();

        const aa = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo',
        })

        console.log(JSON.stringify(aa))
    }

    useEffect(() => {
        test();
    }, [])

    return (
        <>
            <TouchableOpacity
                style={{ backgroundColor: 'cornflowerblue', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={ () => navigation.navigate('Camera') }
            >
                <Text style={{ color: 'white', fontSize: 72, textAlign: 'center' }}>Camera app</Text>
                <Text style={{ color: 'white', fontSize: 32, textAlign: 'center' }}>desc</Text>
            </TouchableOpacity>
        </>
    )
}
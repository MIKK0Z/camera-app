import { View, Text, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as MediaLibabry from "expo-media-library";
import * as Sharing from 'expo-sharing';
import { useState, useEffect } from 'react';

import MyButton from "./MyButton";

import { RootStackParamList } from "../RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, 'BigPhoto'>

export default function BigPhoto({ route: { params: { uri, id } }, navigation }: Props) {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const deletePhoto = async () => {
        await MediaLibabry.deleteAssetsAsync([id]);
        navigation.navigate('Gallery');
    }

    const sharePhoto = async () => {
        await Sharing.shareAsync(uri);
    }

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            setWidth(_ => width);
            setHeight(_ => height);
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'grey', padding: 12, display: 'flex' }}>
            <Image
                resizeMode="cover"
                style={{ borderRadius: 12, minHeight: '75%' }}
                source={{ uri }}
            />

            <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 36 }}>{width} x {height}</Text>
            </View>

            <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <MyButton
                    onPress={sharePhoto}
                    color="white"
                    backgroundColor="cornflowerblue"
                    fontSize={20}
                    fontWeight={600}
                >
                    SHARE
                </MyButton>
                <MyButton
                    onPress={deletePhoto}
                    color="white"
                    backgroundColor="cornflowerblue"
                    fontSize={20}
                    fontWeight={600}
                >
                    DELETE
                </MyButton>
            </View>
        </View>
    )
}

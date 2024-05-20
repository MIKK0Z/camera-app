import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";
import MyButton from "./MyButton";
import FotoItem from "./FotoItem";
import { RootStackParamList } from "../RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Splash'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

type Photo = {
    id: string,
    uri: string,
}

export default function Galery({ navigation }: Props) {
    const [photos, setPhotos] = useState(Array<Photo>);
    const [permissionStatus, setPermissionStatus] = useState('');
    const [numColumns, setNumColumns] = useState(5);
    const [selectedPhotos, setSelectedPhotos] = useState(Array<string>);

    const isFocused = useIsFocused()

    const loadPhotos = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setPermissionStatus(_ => status);

        if (status !== 'granted') {
            return;
        }

        const fetchedPhotos = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo',
        })

        setPhotos(_ => fetchedPhotos.assets);
    }

    const selectPhoto = (photo: string) => {
        setSelectedPhotos(photos => [...photos, photo]);
    }

    const unSelectPhoto = (photo: string) => {
        setSelectedPhotos(photos => photos.filter((photoID) => photoID !== photo));
    }

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        loadPhotos();
    }, [isFocused])

    return (
        <>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'grey' }}>                
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 6 }}>
                    <MyButton onPress={() => setNumColumns(prevNum => prevNum === 1 ? 5 : 1)} color="white" fontSize={20} fontWeight={600} backgroundColor="cornflowerblue">
                        <Text>LAYOUT</Text>
                    </MyButton>
                    <MyButton onPress={() => navigation.navigate('CameraScreen')} color="white" fontSize={20} fontWeight={600} backgroundColor="cornflowerblue">
                        <Text>CAMERA</Text>
                    </MyButton>
                    <MyButton onPress={() => {}} color="white" fontSize={20} fontWeight={600} backgroundColor="cornflowerblue">
                        <Text>DELETE</Text>
                    </MyButton>
                </View>
                
                {
                    permissionStatus === 'granted' ?
                        <FlatList
                            numColumns={numColumns}
                            key={numColumns}
                            data={photos}
                            keyExtractor={photo => photo.id}
                            renderItem={photo => 
                                <FotoItem width={`${100 / numColumns}%`} uri={photo.item.uri} id={photo.item.id} numColumns={numColumns} selectPhoto={selectPhoto} unSelectPhoto={unSelectPhoto} selectedPhotos={selectedPhotos} />
                            }
                            style={{ width: '100%'}}
                        />
                    :
                        <Text style={{ fontSize: 32 }}>No permission to use DCIM</Text>
                }
                
            </View>
        </>
    )
}
import { View, Text } from "react-native";
import { CameraView, Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

import CircleButton from "./CircleButton";
import Settings from "./Settings";

export default function CameraScreen() {
    const [permissionStatus, setPermissionStatus] = useState('');
    const [nieMaFolderu, setNieMaFolderu] = useState(false);
    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraRef, setCameraRef] = useState<CameraView | null>();
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const [sizes, setSizes] = useState<Array<string>>([]);
    const [size, setSize] = useState('');

    const isFocused = useIsFocused()





    const cameraLoad = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermissionStatus(_ => status);
    }

    const takePhoto = async () => {
        try {
            if (!cameraRef) {
                return;
            }
            const photo = await cameraRef.takePictureAsync();

            if (!photo) {
                return;
            }

            let album = await MediaLibrary.getAlbumAsync('expo');
            if (!album) {
                setNieMaFolderu(_ => true);
                return;
            }

            const asset = await MediaLibrary.createAssetAsync(photo.uri);

            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        } catch (_error) {
            console.log('xd');
        }
    }

    const toggleSettings = () => {
        setSettingsOpen(prev => !prev);
    }

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        cameraLoad();
    }, [isFocused])

    useEffect(() => {
        if (size === '') {
            setSize(_ => sizes[0])
        }
    }, [sizes])

    return (
        <>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    permissionStatus === 'granted' && !nieMaFolderu ?
                        <CameraView
                            style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'flex-end' }}
                            facing={facing}
                            ref={ref => setCameraRef(ref)}
                            flash='off'
                            pictureSize={size}
                            onCameraReady={async () => {
                                console.log(); // bez tego sie odpala po zamknieciu aparatu
                                const availibleSizes = await cameraRef?.getAvailablePictureSizesAsync();
                                setSizes(_ => availibleSizes ?? []);
                            }}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16, alignItems: 'center' }}>
                                <Text>{size}</Text>
                                <CircleButton size={24} icon="cameraswitch" onPress={() => setFacing(prev => prev === 'back' ? 'front' : 'back')} />
                                <CircleButton size={48} icon="photo_camera" onPress={takePhoto} />
                                <CircleButton size={24} icon="settings" onPress={toggleSettings} />
                            </View>
                        </CameraView>
                        :
                        nieMaFolderu ?
                            <Text>Nie ma folderu</Text>
                            :
                            <Text>No camera permission</Text>
                }

            </View>
            <Settings isOpen={isSettingsOpen} sizes={sizes} size={size} setSize={setSize} />
        </>
    )
}

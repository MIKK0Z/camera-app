import { View, Text } from "react-native";
import { CameraView, Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

import CircleButton from "./CircleButton";
import Settings from "./Settings";

export default function CameraScreen() {
    const [permissionStatus, setPermissionStatus] = useState('');
    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraRef, setCameraRef] = useState<CameraView | null>();
    const [isSettingsOpen, setSettingsOpen] = useState(false);

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

    return (
        <>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    permissionStatus === 'granted' ?
                        <CameraView
                            style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'flex-end' }}
                            facing={facing}
                            ref={ref => setCameraRef(ref)}
                            flash='off'
                            zoom={0.9}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16, alignItems: 'center' }}>
                                <CircleButton size={24} icon="cameraswitch" onPress={() => setFacing(prev => prev === 'back' ? 'front' : 'back')} />
                                <CircleButton size={48} icon="photo_camera" onPress={takePhoto} />
                                <CircleButton size={24} icon="settings" onPress={toggleSettings} />
                            </View>
                        </CameraView>
                        :
                        <Text>No camera permission</Text>
                }

            </View>
            <Settings isOpen={isSettingsOpen} />
        </>
    )
}

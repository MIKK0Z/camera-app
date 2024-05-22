import { View, Text } from "react-native";
import { CameraView, Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

import CircleButton from "./CircleButton";

export default function CameraScreen() {
    const [permissionStatus, setPermissionStatus] = useState('');
    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraRef, setCameraRef] = useState<CameraView | null>()

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

            await MediaLibrary.createAssetAsync(photo.uri);
        } catch (_error) {
            console.log('xd');   
        }
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
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16 }}>
                                <CircleButton size={48} icon="photo_camera" onPress={takePhoto} />
                                <CircleButton size={48} icon="cameraswitch" onPress={() => setFacing(prev => prev === 'back' ? 'front' : 'back')} />
                            </View>
                        </CameraView>
                    :
                        <Text>No camera permission</Text>
                }
                
            </View>
        </>
    )
}
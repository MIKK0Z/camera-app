import { View, Text } from "react-native";
import { CameraView, Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
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
                                <CircleButton size={32} icon="asdasd" onPress={() => 0} />
                                <CircleButton size={32} icon="asdasd" onPress={() => 0} />
                            </View>
                        </CameraView>
                    :
                        <Text>No camera permission</Text>
                }
                
            </View>
        </>
    )
}
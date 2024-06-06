import { View, Text } from "react-native";
import { Camera, CameraType, WhiteBalance, FlashMode } from "expo-camera/legacy";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

import CircleButton from "./CircleButton";
import Settings from "./Settings";

export default function CameraScreen() {
    const [permissionStatus, setPermissionStatus] = useState('');
    const [nieMaFolderu, setNieMaFolderu] = useState(false);
    const [facing, setFacing] = useState(CameraType.back);
    const [cameraRef, setCameraRef] = useState<Camera | null>();
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const [availableWhiteBalances, setAvailableWhiteBalances] = useState<Array<string>>([]);
    const [whiteBalance, setWhiteBalance] = useState<string>(WhiteBalance.auto)

    const [availableFlashModes, setAvailableFlashModes] = useState<Array<string>>([]);
    const [flashMode, setFlashMode] = useState<string>(FlashMode.off)

    const [availableRatios, setAvailableRatios] = useState<Array<string>>([]);
    const [ratio, setRatio] = useState<string>('');

    const [availablePictureSizes, setAvailablePictureSizes] = useState<Array<string>>([]);
    const [pictureSize, setPictureSize] = useState<string>('');

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

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

    const getAndSetAvailablePictureSizes = async () => {
        const loadedPictureSizes = await cameraRef?.getAvailablePictureSizesAsync(ratio);
        setAvailablePictureSizes(_ => loadedPictureSizes ?? ['1080x1080', '3472x3472']);
    }

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        cameraLoad();
    }, [isFocused])

    useEffect(() => {
        setRatio(_ => availableRatios[0] ?? '1:1');
    }, [availableRatios])

    useEffect(() => {
        getAndSetAvailablePictureSizes();
    }, [ratio])

    useEffect(() => {
        setPictureSize(_ => availablePictureSizes[0] ?? '1080x1080');
    }, [availablePictureSizes])

    return (
        <>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    permissionStatus === 'granted' && !nieMaFolderu ?
                        <Camera
                            style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'flex-end' }}
                            type={facing}
                            ref={ref => setCameraRef(ref)}

                            whiteBalance={whiteBalance as WhiteBalance}
                            flashMode={flashMode as FlashMode}
                            ratio={ratio}
                            pictureSize={pictureSize}

                            onCameraReady={async () => {
                                console.log('ready'); // bez tego sie odpala po zamknieciu aparatu

                                setAvailableWhiteBalances(_ => Object.keys(Camera.Constants.WhiteBalance))
                                setAvailableFlashModes(_ => Object.keys(Camera.Constants.FlashMode))

                                const loadedRatios = await cameraRef?.getSupportedRatiosAsync();
                                setAvailableRatios(_ => loadedRatios ?? ['16:9', '4:3']);
                            }}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16, alignItems: 'center' }}>
                                <CircleButton size={24} icon="cameraswitch" onPress={() => setFacing(prev => prev === CameraType.back ? CameraType.front : CameraType.back)} />
                                <CircleButton size={48} icon="photo_camera" onPress={takePhoto} />
                                <CircleButton size={24} icon="settings" onPress={toggleSettings} />
                            </View>
                        </Camera>
                        :
                        nieMaFolderu ?
                            <Text>Nie ma folderu</Text>
                            :
                            <Text>No camera permission</Text>
                }

            </View>
            <Settings
                isOpen={isSettingsOpen}
                options={[
                    {
                        groupTitle: 'White balance',
                        availableOptions: availableWhiteBalances,
                        selectedOption: whiteBalance,
                        setOption: setWhiteBalance,
                    }, {
                        groupTitle: 'Flash mode',
                        availableOptions: availableFlashModes,
                        selectedOption: flashMode,
                        setOption: setFlashMode,
                    }, {
                        groupTitle: 'Ratio',
                        availableOptions: availableRatios,
                        selectedOption: ratio,
                        setOption: setRatio,
                    }, {
                        groupTitle: 'Picture size',
                        availableOptions: availablePictureSizes,
                        selectedOption: pictureSize,
                        setOption: setPictureSize,
                    }
                ]}
            />
        </>
    )
}

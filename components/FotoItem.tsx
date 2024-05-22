import { TouchableOpacity, Text, DimensionValue, Image, View } from "react-native"

type Props = {
    width: DimensionValue,
    uri: string,
    id: string,
    numColumns: number,
    selectPhoto: (Photo: string) => void,
    unSelectPhoto: (Photo: string) => void,
    selectedPhotos: Array<string>,
    navigate: (uri: string, id: string) => void,
}

export default function FotoItem({ width, uri, id, numColumns, selectPhoto, unSelectPhoto, selectedPhotos, navigate }: Props) {
    return (
        <TouchableOpacity
            style={{ width, padding: 4 }}
            onLongPress={() => {
                if (!selectedPhotos.includes(id)) {
                    selectPhoto(id);
                } else {
                    unSelectPhoto(id);
                }
            }}
            onPress={() => navigate(uri, id)}
        >
            <Image
                resizeMode="cover"
                style={{ aspectRatio: numColumns === 5 ? 1 : 2, borderRadius: 12 }}
                source={{ uri }}
            />
            <Text style={{ position: 'absolute', bottom: 12, right: 12, fontWeight: 'bold', color: 'white' }}>{id}</Text>
            {
                selectedPhotos.includes(id) ?
                    <View style={{ position: 'absolute', zIndex: 10, backgroundColor: 'rgba(0, 0, 0, .5)', top: 4, bottom: 4, left: 4, right: 4, borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 48 }}>+</Text>
                    </View>
                :
                    <></>
            }
        </TouchableOpacity>
    )
}
import { TouchableOpacity, Text, DimensionValue, Image } from "react-native"

type Props = {
    width: DimensionValue,
    uri: string,
    id: string,
    numColumns: number,
}

export default function FotoItem({ width, uri, id }: Props) {
    return (
        <TouchableOpacity style={{ width, padding: 4 }}>
            <Image
                resizeMode="cover"
                style={{ aspectRatio: 1, borderRadius: 12 }}
                source={{ uri }}
            />
            <Text style={{ position: 'absolute', bottom: 12, right: 12, fontWeight: 'bold' }}>{id}</Text>
        </TouchableOpacity>
    )
}
import { TouchableOpacity, Text } from "react-native";

type Props = {
    size: number,
    icon: string,
    onPress: () => void,
}

export default function CircleButton({ size, icon, onPress }: Props) {

    return (
        <>
            <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, .5)', padding: 32, borderRadius: 9999 }}>
                <Text style={{ fontFamily: 'Material-Icons', fontSize: size }}>{icon}</Text>
            </TouchableOpacity>
        </>
    )
}
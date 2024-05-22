import { View, Text } from "react-native";

type Props = {
    size: number,
    icon: string,
    onPress: () => {},
}

export default function CircleButton({ size, icon, onPress }: Props) {

    return (
        <>
            <View>
                <Text style={{ fontFamily: 'Material Icons' }}>search</Text>
            </View>
        </>
    )
}
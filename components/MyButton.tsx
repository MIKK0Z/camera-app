import { TouchableOpacity, Text } from "react-native"

type Props = {
    children: any,
    onPress: () => any,
    color: string,
    fontSize: number,
    fontWeight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "ultralight" | "thin" | "light" | "medium" ,
    backgroundColor: string,
}

export default function MyButton({ children, onPress, color='#FFF', fontSize=16, fontWeight=600, backgroundColor }: Props) {
    return (
        <TouchableOpacity
            style={{ display: 'flex', alignItems: 'center', backgroundColor, borderRadius: 12, padding: 8 }}
            onPress={onPress}
        >
            <Text style={{ color, fontSize, fontWeight }}>{children}</Text>
        </TouchableOpacity>
    )
}
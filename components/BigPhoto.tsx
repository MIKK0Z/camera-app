import { View, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, 'BigPhoto'>


export default function BigPhoto({ route: { params: { uri, id } } }: Props) {

    return (
        <View style={{ flex: 1, backgroundColor: 'grey' }}>
            <Text>{uri}, {id}</Text>
        </View>
    )
}